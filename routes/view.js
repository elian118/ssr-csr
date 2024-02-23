import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();
const API_URL = process.env.API_URL;

router.get('/template', async (req, res) => {
    const randomNumber = Math.floor(Math.random() * (20 + 1));
    const response = await axios.get(`${API_URL}`);
    const data = await response.data[randomNumber];
    console.log('서버에서 데이터 패칭을 진행합니다.')

    res.render('index', {
        title: '템플릿 엔진',
        engine: '넌적스(Nunjucks)',
        data: data,
    });
});

export default router;