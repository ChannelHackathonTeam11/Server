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
    let list = await models.Contents.findAll();

    console.log(list);

    const arr = []

    const hong = false
    for (const key in list) {

        const user_lng = list[key].dataValues.lng
        const user_lat = list[key].dataValues.lat
        
        const a = (user_lng - req.body.lng) * (user_lng - req.body.lng)
        const b = (user_lat - req.body.lat) * (user_lat - req.body.lat)
        const c = Math.sqrt(a + b)
        // arr.push({ user_id, user_image, room_id });
        // console.log(c);

        const result =   getDistance(user_lat, user_lng, req.body.lat,req.body.lng);

        if (result/1000 >  1)
        {
            hong = true
            break
        }
    }

    if (hong === false)
    {
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
    }
    else
    {
        res.status(500).json({
            result: false,
        });
    }
    
    
});

// 마커 클릭시 본문 내용
router.post('/main', (req, res, next) => {
    models.Contents.findOne({
        where: { uuid: req.body.uuid }
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

function getDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2))
        return 0;

    var radLat1 = Math.PI * lat1 / 180;
    var radLat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radTheta = Math.PI * theta / 180;
    var dist = Math.sin(radLat1) * Math.sin(radLat2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1)
        dist = 1;

    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist;
}

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

// 좋아요 누르기
router.post('/like', async (req, res, next) => {

    let like = await models.Contents.findOne({
        where: { uuid: req.body.uuid },
    });

    await models.Contents.update({
        like: like.like + 1,
    },
        {
            where: { uuid: req.body.uuid },
        })
        .then((result) => {
            res.status(200).json({
                result: true,
                data: result,
            }
            );
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});



module.exports = router;

