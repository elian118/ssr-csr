import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/static-page.html'));
});

router.get('/link', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/link-page.html'));
});

router.get('/ajax', (req, res) => {
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

export default router;