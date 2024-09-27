# 🎰 Casino Slot Game

This is a **casino slot game** built with Node.js, React, TypeScript, and Docker. The backend handles the game logic and balance calculations, while the frontend provides a responsive, interactive user interface. The project is styled using **Tailwind CSS** and containerized using Docker for easy deployment.

## 🚀 Features

- Simple and intuitive slot game.
- Game logic powered by a Node.js backend.
- Frontend built with React and TypeScript.
- Styled with Tailwind CSS for modern, responsive UI.
- Containerized with Docker for easy deployment and development.
- API to manage player balance, simulate plays, and handle deposits/withdrawals.

## 🛠️ Technologies Used

- **Node.js**: Backend logic and API.
- **React + TypeScript**: Frontend development and type-safe coding.
- **Docker**: Containerization for easy development and deployment.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

## 📦 Project Structure

```bash
├── backend/            # Node.js backend
│   ├── src/            # Source code
│   ├── package.json    # Backend dependencies and scripts
│   └── Dockerfile      # Dockerfile for backend
├── frontend/           # React frontend
│   ├── src/            # Source code
│   ├── package.json    # Frontend dependencies and scripts
│   └── Dockerfile      # Dockerfile for frontend
├── docker-compose.yml  # Docker Compose file for container orchestration
└── README.md           # Project documentation



🏗️ Setup and Installation
To run this project locally, you'll need to have Docker and Docker Compose installed.

Clone the Repository

git clone https://github.com/vmakksimov/casino_slot.git
cd casino_slot
docker-compose up --build

API Endpoints
Base URL
http://localhost:2000

Wallet
GET /wallet/balance: Get the user's current balance.
POST /wallet/deposit: Deposit money into the wallet. Requires amount and mode parameters.
POST /wallet/withdraw: Withdraw money from the wallet. Requires amount and mode parameters.
Game
POST /play: Play the slot game. Requires bet parameter.
POST /sim: Simulate multiple plays. Requires count and bet parameters.
GET /rtp: Get the RTP (Return to Player) percentage.
