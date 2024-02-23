const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');
const axios = require('axios');

dotenv.config();
const API_URL = process.env.API_URL;
const app = express();

app.set('port', process.env.PORT || 5000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/static-page.html'));
});

app.get('/link', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/link-page.html'));
});

app.get('/ajax', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/ajax-page.html'));
});

app.get('/dynamic', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/dynamic-page.html'));
});

app.get('/spa', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/spa-index.html'));
});

app.get('/csr-ssr', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/csr-ssr.html'));
});

app.get('/template', async (req, res) => {
    const randomNumber = Math.floor(Math.random() * (20 + 1));
    const response = await axios.get(`${API_URL}`);
    const data = await response.data[randomNumber];
    console.log('서버에서 데이터 패칭을 진행합니다.')

    res.render('index', {
        title: '템플릿 엔진',
        engine: '넌적스(Nunjucks)',
        data: data,
    });
})

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 응답 대기 중`)
});