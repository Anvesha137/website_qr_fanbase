require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 80;

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Serve built frontend assets statically
app.use(express.static(path.join(__dirname, '../dist')));

// ─── Google Sheets Auth Helper ──────────────────────────────────────────────
async function getSheetsClient() {
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  await auth.authorize();
  return google.sheets({ version: 'v4', auth });
}

// 1. Collab Application Endpoint
app.post('/api/collab', async (req, res) => {
  console.log('[COLLAB] New application received:', req.body);
  try {
    const {
      email,
      name,
      instagram,
      location,
      phone,
      language,
      niche,
      usedDmTool,
      followers,
      affiliateInterest,
    } = req.body;

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const timestamp = new Date().toISOString();
    const values = [[
      timestamp,
      email,
      name,
      instagram ? `@${instagram.replace(/^@/, '')}` : '',
      location,
      phone,
      language,
      niche,
      usedDmTool,
      String(followers),
      affiliateInterest,
    ]];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:K',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values },
    });

    console.log('[COLLAB] Row appended to Google Sheet successfully.');
    res.json({ success: true });
  } catch (error) {
    console.error('[COLLAB] Error appending to Google Sheet:', error.message);
    res.status(500).json({ success: false, message: 'Failed to submit application.' });
  }
});

// 2. Contact Support Endpoint
app.post('/api/contact', async (req, res) => {
  console.log('[CONTACT] New contact submission received:', req.body);
  try {
    const { name, email, handle, message } = req.body;

    const sheets = await getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const timestamp = new Date().toISOString();
    const values = [[
      timestamp,
      name,
      email,
      handle ? `@${handle.replace(/^@/, '')}` : '',
      message
    ]];

    // Try writing to the Contact sheet tab first, fallback to Sheet1
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Contact!A:E',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values },
      });
    } catch (e) {
      console.warn('[CONTACT] Tab "Contact" not found, falling back to "Sheet1".');
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:E',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values },
      });
    }

    console.log('[CONTACT] Row appended to Google Sheet successfully.');
    res.json({ success: true });
  } catch (error) {
    console.error('[CONTACT] Error appending to Google Sheet:', error.message);
    res.status(500).json({ success: false, message: 'Failed to submit contact.' });
  }
});

// Fallback to React Router client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
