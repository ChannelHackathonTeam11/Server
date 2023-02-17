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
                room_id: result.dataValues.room_id,
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

// 자신의 채팅방 리스트 요청
router.post('/list', async(req, res) => {

    const user_to = await models.Chat.findAll({
        where: { 
            to: req.body.user_id,
        },
    });

    const user_from = await models.Chat.findAll({
        where: { 
            from: req.body.user_id,
        },
    });

    console.log(user_to);
    console.log(user_from);
    // const user_to_image = await models.User.findOne({
    //     where: { 
    //         to: req.body.user_id,
    //     },
    // });
    

});

//  조인할때 채팅저장 
router.post("/test", async (req, res) => {

    let result = await models.Chat.findOne({
        where: { room_id: req.body.room_id },
    });

    let data = {
        user_id: req.body.user_id,
        contents: req.body.contents
    }
    
    let messageInfo = result.dataValues.message;

    messageInfo = messageInfo?messageInfo:[]

    // data.push(messageInfo);
    messageInfo = [...messageInfo,data]

    const combined = {message : messageInfo}

    result.update(combined)
        .then((result) => {
            console.log(result)
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log("여기서 에러");
        })
});





module.exports = router;