const express = require('express');
const router = express.Router();
const models = require("../models");

// 작성글 전체 조회
router.get('/', (req, res, next) => {
    models.Contents.findAll()
        .then((data) => {
            res.status(200).json({
                result : true,
                data : data,
            });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

// 유저 이미지, 제목, 위도, 경도만 조회
router.get('/summary', async(req, res, next) => {
    await models.Contents.findAll({
        attributes: [
            'title',
            'user_image',
            'longitude',
            'latitude',
        ]
    })
        .then((data) => {
            res.status(200).json({
                result : true,
                data : data,
            });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});


module.exports = router;

