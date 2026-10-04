# FarmRentHub: Agricultural Equipment Rental & Booking Platform

> **"Rent the Right Equipment. Grow with Ease."**

FarmRentHub is a modern, production-grade agricultural equipment rental platform built to empower Indian farmers by connecting them directly with nearby agricultural machinery owners. The platform simplifies machinery discovery, live availability tracking, price comparison, escrow-backed online booking, and fleet management.

---

## 🏗️ Architecture & Technology Stack

```text
                    FARMRENTHUB
                         │
             ┌───────────┴───────────┐
             │                       │
          FARMER                  OWNER
             │                       │
      Find Equipment            List Equipment
             │                       │
      Nearby Search             Availability
             │                       │
       Compare Price            Booking Request
             │                       │
        Book Equipment ←────── Accept Booking
             │                       │
          Payment                  Earnings
             │                       │
             └───────────┬───────────┘
                         │
                    FASTAPI BACKEND
                         │
              ┌──────────┼──────────┐
              │          │          │
           MongoDB    Payments    Maps/GPS
```

### Frontend
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS 4 with custom Agri-Tech design system (Emerald green `#16a34a`, wheat/amber `#d97706`, clean whites)
- **Icons:** Lucide React
- **Internationalization:** Dual English + Hindi support
- **Components:** Interactive GPS map discovery, 5-step booking flow, transparent price calculator, equipment detail modals, role switcher (Farmer vs. Owner view).

### Backend
- **Framework:** FastAPI (Python 3.10+)
- **Database:** MongoDB with Motor (AsyncIO driver) and resilient in-memory fallback
- **Authentication:** JWT (JSON Web Tokens), Password Hashing (Bcrypt), OTP verification
- **Location & Search:** Haversine formula distance calculation for accurate radius searching
- **Documentation:** Interactive OpenAPI Swagger UI (`/api/docs`) and ReDoc (`/api/redoc`)

---

## 📁 Repository Directory Structure

```text
FarmRentHub/
├── frontend/                         # Next.js + TypeScript + Tailwind
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/page.tsx
│   │   │   │   └── register/page.tsx
│   │   │   ├── farmer/dashboard/page.tsx
│   │   │   ├── owner/dashboard/page.tsx
│   │   │   ├── equipment/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── ui/ (Logo.tsx, NotificationDrawer.tsx)
│   │   │   ├── layout/ (Navbar.tsx, Footer.tsx)
│   │   │   ├── equipment/ (EquipmentCard.tsx, CategoryCard.tsx)
│   │   │   ├── booking/ (BookingModal.tsx, EquipmentDetailsModal.tsx)
│   │   │   ├── map/ (MapDiscovery.tsx)
│   │   │   ├── owner/ (ListEquipmentModal.tsx)
│   │   │   └── dashboard/ (FarmerDashboardView.tsx, OwnerDashboardView.tsx)
│   │   ├── services/ (api.ts)
│   │   ├── constants/ (data.ts)
│   │   └── types/ (index.ts)
│   ├── package.json
│   └── .env.local
│
├── backend/                          # FastAPI + Python
│   ├── app/
│   │   ├── main.py
│   │   ├── core/ (config.py, database.py, security.py, logging.py, exceptions.py)
│   │   ├── models/ (user.py, equipment.py, booking.py, payment.py, review.py)
│   │   ├── schemas/ (auth.py, equipment.py, booking.py, payment.py, review.py, user.py)
│   │   ├── repositories/ (equipment_repository.py, user_repository.py, booking_repository.py, payment_repository.py, review_repository.py)
│   │   ├── services/ (equipment_service.py)
│   │   ├── api/v1/ (router.py, auth, equipment, bookings, payments, reviews, recommendations, users)
│   │   ├── middleware/ (error_handler.py)
│   │   └── utils/ (distance.py, pagination.py, helpers.py)
│   ├── requirements.txt
│   └── .env
│
├── docker-compose.yml
├── start_project.bat
└── README.md
```

---

## 🚀 Quick Start Guide

### Option 1: Automatic 1-Click Launch (Windows)
Double-click `start_project.bat` in the root folder, or run in terminal:
```bash
.\start_project.bat
```

### Option 2: Manual Setup

#### 1. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- API Docs: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
- Health Check: [http://localhost:8000/health](http://localhost:8000/health)

#### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- Open [http://localhost:3000](http://localhost:3000)

---

## 🌟 Core MVP Features Implemented

1. **Original Brand Identity:**
   - Custom tractor & sprout leaf logo emblem.
   - Professional, trustworthy Indian Agri-tech theme (green/wheat palette).
   - Bilingual support with on-the-fly English ⇄ Hindi toggle.

2. **Marketplace & GPS Discovery:**
   - 8 major machinery categories (Tractor, Harvester, Rotavator, Seed Drill, Sprayer, Irrigation, Thresher, Cultivator).
   - Location cluster filtering (Ludhiana, Karnal, Meerut, Nashik, Patiala).
   - Real-time GPS distance calculation and interactive agricultural radar map.

3. **Transparent 5-Step Booking Flow:**
   - Daily vs. Hourly rental selection with driver option.
   - Live availability checking.
   - Transparent price summary with rental fee, ₹99 platform fee, and refundable security deposit.
   - Escrow payment simulation and instant printable booking receipt.

4. **Dedicated Dashboards:**
   - **Farmer Dashboard:** Active machine arrival tracker, upcoming rentals, payment history, and invoices.
   - **Owner Dashboard:** Fleet availability toggles, incoming booking request approval, and monthly earnings tracker.
   - **Earnings Estimator:** Interactive monthly calculator for prospective machine owners.
