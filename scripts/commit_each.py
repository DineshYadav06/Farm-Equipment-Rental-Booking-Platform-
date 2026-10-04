import subprocess
import os

COMMIT_MAP = {
    ".gitignore": "Gitignore",
    "start_project.bat": "Launcher",
    "docker-compose.yml": "Docker",
    "README.md": "Documentation",
    "backend/requirements.txt": "Dependencies",
    "backend/Dockerfile": "BackendDocker",
    "backend/app/main.py": "MainApp",
    "backend/app/core/config.py": "Config",
    "backend/app/core/database.py": "Database",
    "backend/app/core/security.py": "Security",
    "backend/app/core/logging.py": "Logging",
    "backend/app/core/exceptions.py": "Exceptions",
    "backend/app/models/user.py": "UserModel",
    "backend/app/models/equipment.py": "EquipmentModel",
    "backend/app/models/booking.py": "BookingModel",
    "backend/app/models/payment.py": "PaymentModel",
    "backend/app/models/review.py": "ReviewModel",
    "backend/app/models/notification.py": "NotificationModel",
    "backend/app/schemas/auth.py": "AuthSchema",
    "backend/app/schemas/user.py": "UserSchema",
    "backend/app/schemas/equipment.py": "EquipmentSchema",
    "backend/app/schemas/booking.py": "BookingSchema",
    "backend/app/schemas/payment.py": "PaymentSchema",
    "backend/app/schemas/review.py": "ReviewSchema",
    "backend/app/repositories/equipment_repository.py": "EquipmentRepo",
    "backend/app/repositories/user_repository.py": "UserRepo",
    "backend/app/repositories/booking_repository.py": "BookingRepo",
    "backend/app/repositories/payment_repository.py": "PaymentRepo",
    "backend/app/repositories/review_repository.py": "ReviewRepo",
    "backend/app/api/v1/router.py": "Router",
    "backend/app/api/v1/auth/router.py": "AuthAPI",
    "backend/app/api/v1/equipment/router.py": "EquipmentAPI",
    "backend/app/api/v1/bookings/router.py": "BookingsAPI",
    "backend/app/api/v1/payments/router.py": "PaymentsAPI",
    "backend/app/api/v1/reviews/router.py": "ReviewsAPI",
    "backend/app/api/v1/recommendations/router.py": "RecommendationsAPI",
    "backend/app/api/v1/users/router.py": "UsersAPI",
    "backend/app/services/equipment/equipment_service.py": "EquipmentService",
    "backend/app/middleware/error_handler.py": "ErrorHandler",
    "backend/app/utils/distance.py": "Haversine",
    "backend/app/utils/helpers.py": "Helpers",
    "backend/app/utils/pagination.py": "Pagination",
    "frontend/.gitignore": "ClientGitignore",
    "frontend/Dockerfile": "ClientDocker",
    "frontend/README.md": "ClientReadme",
    "frontend/package.json": "Packages",
    "frontend/package-lock.json": "PackageLock",
    "frontend/tsconfig.json": "TSConfig",
    "frontend/next.config.ts": "NextConfig",
    "frontend/eslint.config.mjs": "ESLint",
    "frontend/postcss.config.mjs": "PostCSS",
    "frontend/AGENTS.md": "AgentRules",
    "frontend/CLAUDE.md": "ProjectGuide",
    "frontend/src/types/index.ts": "Types",
    "frontend/src/constants/data.ts": "AgriData",
    "frontend/src/services/api.ts": "APIClient",
    "frontend/src/app/globals.css": "ThemeStyles",
    "frontend/src/app/layout.tsx": "RootLayout",
    "frontend/src/app/page.tsx": "Marketplace",
    "frontend/src/app/favicon.ico": "Favicon",
    "frontend/public/file.svg": "FileIcon",
    "frontend/public/globe.svg": "GlobeIcon",
    "frontend/public/next.svg": "NextLogo",
    "frontend/public/vercel.svg": "VercelLogo",
    "frontend/public/window.svg": "WindowIcon",
    "frontend/src/components/ui/Logo.tsx": "Logo",
    "frontend/src/components/ui/NotificationDrawer.tsx": "Notifications",
    "frontend/src/components/layout/Navbar.tsx": "Navbar",
    "frontend/src/components/layout/Footer.tsx": "Footer",
    "frontend/src/components/equipment/EquipmentCard.tsx": "EquipmentCard",
    "frontend/src/components/equipment/CategoryCard.tsx": "CategoryCard",
    "frontend/src/components/booking/BookingModal.tsx": "BookingFlow",
    "frontend/src/components/booking/EquipmentDetailsModal.tsx": "EquipmentDetails",
    "frontend/src/components/map/MapDiscovery.tsx": "GPSMap",
    "frontend/src/components/owner/ListEquipmentModal.tsx": "ListEquipment",
    "frontend/src/components/dashboard/FarmerDashboardView.tsx": "FarmerDashboard",
    "frontend/src/components/dashboard/OwnerDashboardView.tsx": "OwnerDashboard",
    "frontend/src/app/(auth)/login/page.tsx": "LoginPage",
    "frontend/src/app/(auth)/register/page.tsx": "RegisterPage",
    "frontend/src/app/equipment/page.tsx": "CatalogPage",
    "frontend/src/app/equipment/[id]/page.tsx": "DetailPage",
    "frontend/src/app/farmer/dashboard/page.tsx": "FarmerDashboardPage",
    "frontend/src/app/owner/dashboard/page.tsx": "OwnerDashboardPage"
}

def get_all_target_files():
    # Use git ls-files for untracked and modified
    proc = subprocess.run(["git", "ls-files", "--others", "--modified", "--exclude-standard"], capture_output=True, text=True, check=True)
    files = [f.strip().replace("\\", "/") for f in proc.stdout.strip().split("\n") if f.strip()]
    return files

def main():
    files = get_all_target_files()
    print(f"Total individual files to commit: {len(files)}")
    count = 0
    for f in files:
        if not os.path.exists(f):
            continue
        msg = COMMIT_MAP.get(f)
        if not msg:
            # Generate clean 1-word message from filename
            base = os.path.basename(f)
            name = os.path.splitext(base)[0]
            # remove punctuation
            word = "".join(c for c in name.title() if c.isalnum())
            msg = word or "Update"

        subprocess.run(["git", "add", f], check=True)
        res = subprocess.run(["git", "commit", "-m", msg], capture_output=True, text=True)
        if res.returncode == 0:
            count += 1
            print(f"[{count}/{len(files)}] Committed {f} -> '{msg}'")
        else:
            print(f"Skipped {f}: {res.stdout.strip()}")

    print(f"All done! Total commits: {count}")

if __name__ == "__main__":
    main()
