require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ============================================
// EMAIL SETUP (GMAIL)
// ============================================
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

let transporter = null;

async function setupEmail() {
    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
        console.log('⚠️ Gmail not configured. Create a .env file with GMAIL_USER and GMAIL_APP_PASSWORD');
        console.log('📧 Contact form will not work without email setup.');
        return;
    }
    
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_APP_PASSWORD
            }
        });
        
        await transporter.verify();
        console.log(`✅ Gmail ready — emails will be sent to ${GMAIL_USER}`);
    } catch (error) {
        console.error('❌ Gmail connection failed:', error.message);
    }
}

setupEmail();

// ============================================
// SERVE HTML FILES
// ============================================
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// ============================================
// CONTACT FORM API
// ============================================
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (!transporter) {
        return res.status(500).json({ error: 'Email service not configured. Please contact us directly.' });
    }
    
    try {
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: GMAIL_USER,
            replyTo: email,
            subject: `📬 New Café Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px;">
                    <h2 style="color: #2d4a3e;">📬 New Café Contact Form</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <hr>
                    <small style="color: #888;">Sent from your café website</small>
                </div>
            `
        });
        
        console.log(`📧 Email sent from ${email} to ${GMAIL_USER}`);
        res.json({ success: true });
        
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`✅ Café website running at http://localhost:${PORT}`);
    console.log(`📧 Contact form will send emails to: ${GMAIL_USER || 'not configured'}`);
});