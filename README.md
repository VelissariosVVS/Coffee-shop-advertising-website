---

# ☕ My Local Café

A warm, cozy café website with a working contact form that sends emails to the owner via Gmail.

---

## Features

* Responsive design (mobile + desktop)
* Smooth scrolling navigation
* Menu display with prices
* Contact form with email integration
* Google Maps embed
* Fade-in animations on scroll

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (ES6)
* **Backend:** Node.js, Express
* **Email:** Nodemailer with Gmail SMTP
* **Security:** dotenv for environment variables

---

## Project Structure

```bash id="k3f8qp"
Coffeshop/
├── public/
│   ├── css/styles.css
│   └── js/script.js
├── views/index.html
├── server.js
├── package.json
├── .env (gitignored)
└── .gitignore
```

---

## Installation

```bash id="n1z7sd"
git clone https://github.com/VelissariosVVS/Coffee-shop-advertising-website.git
cd Coffee-shop-advertising-website
npm install
```

---

## Email Setup (Required for contact form)

Create `.env` file:

```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

**How to get Gmail App Password:**

1. Enable 2-Step Verification on your Google Account
2. Go to Security → App Passwords
3. Generate password for "Mail" on "Windows Computer"

---

## Run the Server

```bash id="y7m2lx"
node server.js
```

Open `http://localhost:3000`

---

## Contact Form

Messages go directly to your Gmail inbox with the customer's email as reply-to address.

---

## Development

This project was built with AI assistance (ChatGPT) using prompt engineering for code generation, debugging, and documentation. All code was reviewed, tested, and customized by me.

---

## License

MIT
