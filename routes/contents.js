const express = require('express');
const router = express.Router();
const models = require("../models");

// 작성글 전체 조회
router.get('/', (req, res, next) => {
    models.Contents.findAll()
        .then((data) => {
            res.status(200).json({
                result: true,
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

// 유저 이미지, 제목, 위도, 경도만 조회
router.get('/summary', async (req, res, next) => {
    await models.Contents.findAll({
        attributes: [
            'title',
            'user_image',
            'lng',
            'lat',
            'uuid',
        ]
    })
        .then((data) => {
            res.status(200).json({
                result: true,
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
});

// 마커 클릭시 본문 내용
router.post('/main', (req, res, next) => {
    models.Contents.findOne({
        where : {uuid : req.body.uuid}
    })
        .then((data) => {
            res.status(200).json({
                result: true,
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send({
                result: false,
                message: "메인 문을 발생하였습니다.",
              });
        })
});

// 글등록
router.post("/write", async (req, res) => {

  const writeInfo = {
    user_id: req.body.user_id,
    title : req.body.title,
    text : req.body.text,
    text_image : req.body.text_image,
    create_time : "0000-00-00 00:00:00",
    like : 0,
    lng : req.body.lng,
    lat : req.body.lat,
    check : 0,

  };

  models.Contents.create(writeInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        result: false,
        message: "글 등록오류가 발생하였습니다.",
      });
    });
});




module.exports = router;

