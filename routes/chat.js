const express = require('express');
const router = express.Router();
const models = require("../models");


// 채팅방 등록
router.post("/create", async (req, res) => {

    const roomInfo = {
        from: req.body.from,
        to: req.body.to,
    };
    models.Chat.create(roomInfo)
        .then((result) => { 
            res.status(200).send({
                result: true,
                room_id : result.dataValues.room_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({
                result: false,
                message: "방생성에 실패했습니다",
            });
        });
});


module.exports = router;