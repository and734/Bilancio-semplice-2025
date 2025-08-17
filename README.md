# Bilancio semplice 2025 - Financial Insights Dashboard

A Next.js application for analyzing financial data and gaining insights, potentially powered by AI.

## Tech Stack

*   [Next.js](https://nextjs.org/) - React framework for building performant web applications
*   [React](https://reactjs.org/) - JavaScript library for building user interfaces
*   [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development
*   [Firebase](https://firebase.google.com/) - Backend-as-a-service (BaaS) platform
*   [Genkit](https://genkit.dev/) - For AI integration and workflows

## Setup and Installation

Follow these steps to get the project up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/and734/Bilancio-semplice-2025.git
    cd Bilancio-semplice-2025
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  **Configure Firebase:**

    *   Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    *   Enable the necessary Firebase services (e.g., Firestore, Authentication).
    *   Obtain your Firebase configuration object.
    *   Create a `.env.local` file in the project root and add your Firebase configuration:

        ```
        NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
        NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
        ```

4.  **Run the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Usage

The application provides a financial insights dashboard. You can use it to:

*   Analyze income and expenses
*   Visualize financial data with charts and graphs
*   Potentially leverage AI-powered insights (if Genkit is configured)

## Contributing

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
Explanation of changes:

The "License" section now specifies that the project is licensed under the MIT License.
It also includes a link to a LICENSE file, which you'll need to create in the root of your repository.
To complete the process, you should create a file named LICENSE in the root directory of your project and add the following content:

MIT License

Copyright (c) 2025 Andrea Lamberti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
