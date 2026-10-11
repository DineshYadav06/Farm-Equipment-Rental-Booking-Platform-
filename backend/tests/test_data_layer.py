import unittest
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException

from app.utils.money import rupees_to_paise, paise_to_rupees
from app.utils.geo import compute_public_point
from app.models.base import validate_no_aadhaar
from app.repositories.counters_repository import counters_repo
from app.repositories.booking_repository import booking_repo
from app.repositories.equipment_repository import equipment_repo

class TestDataLayer(unittest.IsolatedAsyncioTestCase):
    def test_money_helpers(self):
        self.assertEqual(rupees_to_paise(1200), 120000)
        self.assertEqual(rupees_to_paise(1200.50), 120050)
        self.assertEqual(paise_to_rupees(120000), 1200.0)
        self.assertEqual(paise_to_rupees(120050), 1200.50)

    def test_aadhaar_validation(self):
        self.assertEqual(validate_no_aadhaar("Plot #14, Village Samrala"), "Plot #14, Village Samrala")
        with self.assertRaises(HTTPException) as cm:
            validate_no_aadhaar("My ID is 1234 5678 9012")
        self.assertEqual(cm.exception.status_code, 422)

    def test_geo_privacy_jitter(self):
        lat, lon = 30.9010, 75.8573
        pub1 = compute_public_point(lat, lon, seed_key="eq_01")
        pub2 = compute_public_point(lat, lon, seed_key="eq_01")
        self.assertEqual(pub1["coordinates"], pub2["coordinates"])
        self.assertLess(abs(pub1["coordinates"][1] - lat), 0.015)
        self.assertLess(abs(pub1["coordinates"][0] - lon), 0.015)

    async def test_sequential_booking_no(self):
        b1 = await counters_repo.generate_booking_no()
        b2 = await counters_repo.generate_booking_no()
        self.assertTrue(b1.startswith("FRH-"))
        self.assertTrue(b2.startswith("FRH-"))
        self.assertNotEqual(b1, b2)

    async def test_synonym_search(self):
        results_hi = await equipment_repo.get_all(search_query="ट्रैक्टर")
        results_pa = await equipment_repo.get_all(search_query="ਟਰੈਕਟਰ")
        results_en = await equipment_repo.get_all(search_query="tractor")
        self.assertGreater(len(results_hi), 0)
        self.assertGreater(len(results_pa), 0)
        self.assertGreater(len(results_en), 0)
        for r in results_hi:
            self.assertTrue("tractor" in r["category"].lower() or "tractor" in r["title"].lower())

    async def test_booking_state_machine_and_conflict(self):
        now = datetime.now(timezone.utc)
        bk = await booking_repo.create({
            "equipment_id": "eq_test_01",
            "start": now + timedelta(days=10),
            "end": now + timedelta(days=12),
            "rental_type": "daily"
        })
        
        updated = await booking_repo.update_status(bk["id"], "accepted")
        self.assertEqual(updated["status"], "accepted")

        # Invalid transition: accepted -> in_progress (requires confirmed first)
        with self.assertRaises(HTTPException) as cm:
            await booking_repo.update_status(bk["id"], "in_progress")
        self.assertEqual(cm.exception.status_code, 409)

        # Overlapping conflict raises 409
        with self.assertRaises(HTTPException) as cm2:
            await booking_repo.create({
                "equipment_id": "eq_test_01",
                "start": now + timedelta(days=11),
                "end": now + timedelta(days=13),
                "rental_type": "daily"
            })
        self.assertEqual(cm2.exception.status_code, 409)

if __name__ == "__main__":
    unittest.main()
