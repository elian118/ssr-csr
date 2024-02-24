const express = require('express');
const path = require("path");

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static-page.html'));
});

router.get('/link', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/link-page.html'));
});

router.get('/ajax', (req, res) => {
    const API_URI = process.env.API_URL;
    res.setHeader('Set-Cookie', `apiUrl=${API_URI}`);
    res.sendFile(path.join(__dirname, '../pages/ajax-page.html'));
});

router.get('/dynamic', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/dynamic-page.html'));
});

router.get('/spa', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/spa-index.html'));
});

router.get('/csr-ssr', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/csr-ssr.html'));
});

module.exports = router;