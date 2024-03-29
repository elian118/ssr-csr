import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import nunjucks from 'nunjucks';
import indexRouter from './routes/index.cjs';
import viewRouter from './routes/view.cjs';
import opn from "opn";

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// '/ajax' 요청이 아니면, 쿠키를 지운다.
app.use((req, res, next) => {
    const url = req.url;
    url !== '/ajax' && res.clearCookie('apiUrl');
    next();
});

app.use('/', indexRouter);
app.use('/view', viewRouter);

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

app.listen(app.get('port'), async () => {
    console.log(`${app.get('port')}번 포트에서 응답 대기 중`);
    await opn(`http://localhost:${app.get('port')}`);
});