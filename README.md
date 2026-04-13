# MCAET AgroLink: Smart Agricultural Equipment Rental Platform

![MCAET AgroLink Banner](https://img.shields.io/badge/Project-AgroLink-brightgreen?style=for-the-badge)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React_19-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge)

MCAET AgroLink is an advanced, full-stack web application developed to bridge the gap between agricultural equipment owners and farmers who need access to high-quality machinery. By democratizing access to expensive farming equipment, the platform aims to empower the agricultural community, enhance productivity, and promote sustainable resource sharing.

---

## 📖 About The Project

### The Problem
Small-scale and marginal farmers often struggle to afford modern, expensive agricultural machinery like tractors, harvesters, or specialized plows. On the other hand, equipment owners often have machinery sitting idle when not in use on their own farms. There has traditionally been no centralized, trustworthy platform for these two parties to connect efficiently.

### The Solution: MCAET AgroLink
MCAET AgroLink acts as a centralized marketplace. Equipment owners can list their machinery, setting availability dates and pricing. Farmers can search for equipment based on location, type, and availability, and book them seamlessly. This model reduces capital expenditure for farmers, generates additional income for equipment owners, and optimizes the use of agricultural resources.

---

## 🌟 Core Features in Detail

1. **Robust User Authentication & Authorization:**
   - Secure Login/Signup with robust password hashing (Bcrypt).
   - JWT (JSON Web Token) implementation for secure, stateless user sessions.
   - Role-based access (Farmers vs. Equipment Owners/Admins).

2. **Advanced Equipment Marketplace:**
   - **Listings:** View rich details of available equipment including images, specifications, hourly/daily rates, and owner terms.
   - **Search & Filter:** Advanced search algorithms to find equipment by category, location, or price boundaries.
   
3. **Interactive Geo-Location Services:**
   - Integration with `react-leaflet` allows users to view the exact locations of available equipment on an interactive map.
   - Helps farmers find the nearest available machinery to reduce transportation costs.

4. **Multi-Lingual Support (i18next):**
   - Agriculture is deeply local. Our platform supports multiple geographic languages out of the box using `i18next`, ensuring that the UI is accessible to farmers in their native tongue.

5. **Cloud Integrated Architecture:**
   - Integration with `google-spreadsheet` and `google-auth-library` allows administrators and users to maintain structured backup records and export analytical data easily.

6. **Modern, Responsive UI/UX:**
   - Designed using Tailwind CSS, ensuring the platform looks and functions flawlessly across all devices—from desktop monitors down to mobile phones used primarily in the field.

---

## 🏗️ Architecture & Technology Stack

The application is built using the industry-standard **MERN Stack** with modern, high-performance libraries.

### Frontend (Client-side)
- **Core Library:** React.js (v19) powered by Vite for lightning-fast Hot Module Replacement (HMR).
- **Styling & UI:** Tailwind CSS for a utility-first, fully responsive design system.
- **Routing:** React Router DOM (v7) for seamless Single Page Application (SPA) navigation.
- **Mapping:** Leaflet and React-Leaflet for interactive map rendering.
- **Network Requests:** Axios for efficient, Promise-based HTTP requests to the backend API.
- **State & Translations:** React Context API and `react-i18next`.

### Backend (Server-side)
- **Runtime Environment:** Node.js.
- **Web Framework:** Express.js for handling RESTful API routing and custom middleware.
- **Database:** MongoDB, utilizing Mongoose as the Object Data Modeling (ODM) library for strict schema enforcement.
- **Security:** `bcrypt` for password encryption and `jsonwebtoken` for secure API token verification. CORS middleware to restrict cross-origin requests.

---

## 📁 Detailed Directory Structure

```text
MCAET-AgroLink/
├── client/                      # ⚛️ Frontend React Application
│   ├── public/                  # Raw static assets (images, icons)
│   ├── src/                     # Core React logic
│   │   ├── components/          # Reusable UI components (Navbar, Footer, Cards)
│   │   ├── pages/               # Main route pages (Home, About, Dashboard)
│   │   ├── assets/              # Processed assets
│   │   ├── App.jsx              # Root component & Route definitions
│   │   └── index.css            # Global Tailwind imports & custom CSS
│   ├── package.json             # Client dependencies and scripts
│   ├── tailwind.config.js       # Tailwind theme and plugin configuration
│   └── vite.config.js           # Vite bundler configurations
│
├── server/                      # ⚙️ Backend API Node.js Application
│   ├── src/                     # Core Backend logic
│   │   ├── controllers/         # Handles business logic (Booking, Auth, etc.)
│   │   ├── models/              # Mongoose DB Schemas (User, Equipment, etc.)
│   │   ├── routes/              # Express API endpoints definition
│   │   ├── middleware/          # JWT Verification, Error Handling
│   │   └── server.js            # Express application entry point
│   ├── .env                     # Environment variables (Ignored by Git)
│   └── package.json             # Server dependencies and run scripts
│
├── .gitignore                   # Standard Git ignore file
├── render.yaml                  # Configuration for deploying backend to Render 
├── vercel.json                  # Configuration for deploying frontend to Vercel
└── start_project.bat            # 1-Click developer startup script for Windows
```

---

## 🚀 Getting Started (Installation Guide)

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16.x or higher recommended)
- npm (Comes installed with Node.js)
- A local MongoDB instance OR a free [MongoDB Atlas Database URI](https://www.mongodb.com/cloud/atlas).

### Step-by-step Setup

1. **Clone the Source Code**
   ```bash
   git clone https://github.com/your-username/MCAET-AgroLink.git
   cd MCAET-AgroLink
   ```

2. **Configure Environment Variables**
   Navigate to the `server/` directory and create a file named `.env`. Provide the necessary configuration keys:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_cluster_connection_uri_here
   JWT_SECRET=a_very_secure_randomly_generated_string
   ```

3. **Launch the Application**
   For Windows users, we have created an automated startup script. Double-click the file named `start_project.bat` in the root folder, or run it through the terminal:
   ```bash
   .\start_project.bat
   ```
   *This script automatically installs all dependencies in both the `client/` and `server/` directories and launches two terminals running standard development servers concurrently.*

   **Manual Execution (Mac/Linux/Windows):**
   - *Backend:* `cd server && npm install && npm run dev`
   - *Frontend:* `cd client && npm install && npm run dev`

---

## 🔮 Future Goals & Roadmap

MCAET AgroLink is continuously evolving. Our roadmap outlines the major architectural and functional upgrades planned for future releases.

### 1. Payment Gateway Integration
- **Objective:** Enable end-to-end financial transactions directly within the platform.
- **Tech Details:** Integration with Razorpay or Stripe APIs to allow farmers to pay equipment security deposits and rental fees securely. Includes automated invoicing and payment receipt generation.

### 2. AI-Powered Recommendations & Demand Forecasting
- **Objective:** Utilize Machine Learning to make the platform smarter.
- **Tech Details:** Implement predictive models using Python/Flask microservices to suggest equipment based on seasonal crop cycles and weather data. Predict surges in equipment demand to notify owners in advance.

### 3. Dedicated Mobile Applications
- **Objective:** Reach farmers directly in the field where laptops/desktops are unavailable.
- **Tech Details:** Migrate the core logic to build native mobile applications for Android and iOS utilizing **React Native**, ensuring complete sync with the existing Node.js backend.

### 4. Advanced Telematics & IoT Tracking
- **Objective:** Provide real-time tracking and health monitoring of rented machinery.
- **Tech Details:** Interface with IoT-enabled GPS trackers on the physical hardware. Owners will have a dashboard displaying live machine coordinates, engine temperature, and usage hours directly transmitted via MQTT protocols to the platform.

### 5. Review & Reputation System
- **Objective:** Build trust among the community.
- **Tech Details:** Implement a robust dual-rating system where farmers can review equipment quality, and owners can review the farmers regarding how the machinery was handled during the rental period.

---

## ☁️ Deployment Architecture

The application is built keeping modern Serverless and PaaS deployments in mind:
- **Frontend Hosting:** Configured for Vercel. Push changes to GitHub, and Vercel automatically deploys the frontend utilizing the instructions in `vercel.json`.
- **Backend Hosting:** Configured for Render. The `render.yaml` file dictates the environment setup, automatically starting the Node/Express server and connecting to external databases.

---

## 🤝 Contribution Guidelines
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📚 Acknowledgments
This real-time project implementation draws inspiration from the architecture mentioned in the research methodology PDFs attached in the repository regarding "Smart Agricultural Equipment Rental Systems."
