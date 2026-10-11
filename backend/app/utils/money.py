from typing import Union

CURRENCY_INR = "INR"

def rupees_to_paise(rupees: Union[float, int]) -> int:
    """
    Converts amount in Rupees to integer Paise (e.g. ₹1,200.50 -> 120050 paise).
    Uses standard integer rounding to avoid float imprecision.
    """
    return int(round(float(rupees) * 100))

def paise_to_rupees(paise: int) -> float:
    """
    Converts integer Paise to Rupees float (e.g. 120050 paise -> ₹1,200.50).
    """
    return round(float(paise) / 100.0, 2)
