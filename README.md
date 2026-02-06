🩺 Health Monitoring Agent

An interactive, AI-inspired health monitoring dashboard that analyzes patient vitals, visualizes trends, and provides personalized health recommendations — all in the browser.

This project is built with HTML, CSS, JavaScript, and a lightweight Python HTTP server for local development.

✨ Features

📋 Patient profile management (ID, name, age)

❤️ Real-time health data input:

Heart rate

Blood pressure

Temperature

Steps

Sleep

Water intake

📊 Interactive charts powered by Chart.js

🧠 Simulated AI health analysis with:

Overall health status

Metric-by-metric evaluation

💡 Personalized recommendations

🚨 Smart health alerts (info, warning, critical)

📦 Simulated data compression indicator

📄 One-click health report export (TXT)

⌨️ Keyboard shortcut: Ctrl + S to export report

🛠 Tech Stack

Frontend

HTML5

CSS3 (modern layout, responsive design)

Vanilla JavaScript

Font Awesome Icons

Google Fonts (Poppins & Roboto)

Chart.js (data visualization)

Backend (Local Dev Only)

Python http.server

📁 Project Structure
.
├── index.html      # Main UI layout and structure
├── style.css       # Styling, layout, and responsive design
├── script.js       # App logic, analysis, charts, alerts
├── server.py       # Local development server
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/your-username/health-monitoring-agent.git
cd health-monitoring-agent

2️⃣ Start the Local Server

Make sure Python 3 is installed, then run:

python server.py


The app will automatically open in your browser at:

http://localhost:8000


The server setup and auto-launch behavior come from server.py 

server

🧪 How It Works

Enter or adjust patient health metrics in the dashboard UI 

index

Click Analyze Health Data

The app:

Evaluates each metric

Calculates overall health status

Generates recommendations

Triggers alerts if thresholds are exceeded

Updates charts in real time

Export a health report anytime as a .txt file

All analysis logic and simulations live in script.js 

script

📊 Visualization

Line charts show heart rate and daily steps

Switch between Daily / Weekly / Monthly views

Data updates dynamically during analysis and simulation

Chart configuration and updates are handled entirely client-side 

script

🎨 UI & Design

Responsive layout (desktop, tablet, mobile)

Card-based dashboard

Color-coded alerts and statuses

Smooth animations and transitions

All styling is defined in style.css 

style

⚠️ Disclaimer

This project is a demo / educational application.
It does NOT provide medical advice and should not be used for real clinical decision-making.

📌 Future Improvements

Backend API integration

User authentication

Persistent data storage

Real AI/ML health models

PDF report export

Wearable device integration.


🧠 Rewrite it with a more “AI product” vibe

Just say the word.
