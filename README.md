# Sari Send

Sari Send is a QR-based payment system built on the Aptos blockchain, designed for fast, secure, and low-cost transactions. It's perfect for small businesses, like sari-sari stores, to easily accept digital payments.

## Features

*   **QR Code Payments:** Generate and scan QR codes for quick and easy payments.
*   **Transaction History:** View a complete history of your transactions.
*   **Wallet Management:** Securely manage your funds on the Aptos blockchain.
*   **Decentralized:** Built on the Aptos blockchain for security and transparency.

## Tech Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Aptos (Move)

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Aptos CLI](https://aptos.dev/cli-tools/aptos-cli/install-aptos-cli)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sarisend.git
    cd sarisend
    ```

2.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Install backend dependencies:**
    ```bash
    cd ../backend
    aptos move compile
    ```

### Running the Application

1.  **Start the frontend development server:**
    ```bash
    cd frontend
    npm run dev
    ```

2.  **Deploy the backend contract:**
    ```bash
    cd backend
    aptos move publish --named-addresses sarisend=<your_account_address>
    ```

## Project Structure

```
sarisend/
├── backend/        # Aptos blockchain (Move)
│   ├── sources/    # Move source code
│   └── ...
├── frontend/       # React application
│   ├── src/
│   └── ...
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m '''Add some AmazingFeature'''''`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
