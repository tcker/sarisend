<div align="center">

![Logo](./assets/logo.png)

</div>

# [SariSend: QR-Based Payments on Aptos](https://sarisend.vercel.app)

> 📱 **Mobile-first, but fully usable on desktop as well.**

[GitBook SariSend](https://sarisend.gitbook.io/)

SariSend is a user-friendly payment system that uses QR codes for fast, secure, and affordable transactions. It's built on the Aptos blockchain and is perfect for small businesses, like sari-sari stores, to easily accept digital payments without the high fees of traditional payment methods.

## For Everyone: What is SariSend?

Imagine paying for your groceries at a local sari-sari store simply by scanning a QR code with your phone. That's SariSend! It's a digital wallet that makes payments easy and safe for both customers and store owners.

*   **Easy to Use:** Just scan a QR code to pay.
*   **Low Fees:** Transactions are much cheaper than traditional banking or payment services.
*   **Secure:** Your money is protected on the Aptos blockchain.

You can try out SariSend by visiting our website: [Link to your live application]

## For Developers: Getting Started

This project is a monorepo containing both the frontend and backend of the SariSend application.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Aptos CLI](https://aptos.dev/cli-tools/aptos-cli/install-aptos-cli)

### How to Run the Application

There are two ways to run the SariSend application:

1.  **Visit the Live Website:**

    *   The easiest way to see SariSend in action is to visit our live demo: [Link to your live application]

2.  **Run Locally:**

    *   If you want to run the application on your own computer, follow these steps:

        1.  **Clone the repository:**
            ```bash
            git clone https://github.com/your-username/sarisend.git
            cd sarisend
            ```

        2.  **Navigate to the frontend directory:**
            ```bash
            cd frontend
            ```

        3.  **Install the necessary packages:**
            ```bash
            npm install
            ```

        4.  **Start the development server:**
            ```bash
            npm run dev
            ```

        5.  Open your browser and go to `http://localhost:5173` (or the address shown in your terminal).

### Project Structure

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

### Contributing

We welcome contributions! If you'd like to contribute, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request