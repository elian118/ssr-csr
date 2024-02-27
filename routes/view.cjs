const express = require('express');
const axios = require("axios");
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();
const API_URL = process.env.API_URL;

router.get('/template', async (req, res) => {
    console.log('서버에서 데이터 패칭을 진행합니다.');
    const { page } = req.query;
    const response = await axios.get(`${API_URL}`);
    const data = await response.data[page ?? 0];
    // 렌더링을 1초 뒤에 진행하도록 딜레이 추가
    // await new Promise((res) => setTimeout(res, 1000));
    res.render('index', {
        title: '템플릿 엔진',
        engine: '넌적스(Nunjucks)',
        data: data,
    });
    console.log('랜더링 완료');
});

module.exports = router;