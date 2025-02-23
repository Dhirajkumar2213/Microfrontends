/microfrontends-project
  ├── /host-app         # Main container (Hosts all microfrontends)
  ├── /chat-app         # Chat microfrontend
  ├── /email-app        # Dummy email microfrontend
  ├── /shared-hooks     # Custom hooks for state management
  ├── package.json
  ├── README.md
  └── ...
  
## Tech Stack

Frontend: React, Vite, Tailwind CSS
Microfrontend Management: Vite Module Federation
State Management: React useState + Custom Hooks
Form Handling: React Hook Form + EmailJS
Validations: Yup (for form validation)

## Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/your-username/microfrontends-project.git
cd microfrontends-project
2️⃣ Install Dependencies

npm install
3️⃣ Run Microfrontends
Start the Host App

cd host-app
npm run dev
Start the Chat App

cd chat-app
npm run dev
Start the Email App

cd email-app
npm run dev

## How It Works

The host app loads microfrontends dynamically using Vite's Module Federation plugin.
A custom hook allows state sharing between the host app and chat app.
The form component (in the host app) sends an email via EmailJS when submitted.
Proper form validations prevent incorrect submissions.

## Contact
For any issues or queries, reach out via:
📧 Email: dhirajkumar2may2002@gmail.com
📍 Location: Nangal, India
