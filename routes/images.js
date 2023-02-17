const express = require("express");
const router = express.Router();
const models = require("../models");


// 이미지 조회
router.get('/:id', (req, res, next) => {

    models.User.findOne({
        where: { id : req.params.id },
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        })
})

module.exports = router;
