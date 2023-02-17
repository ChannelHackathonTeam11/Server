const express = require('express');
const router = express.Router();
const models = require("../models");

// 유저 전체 조회
router.get('/', (req, res, next) => {
  models.User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    })
});

//회원 id로 회원정보 조회
router.post("/exist", (req, res, next) => {
  models.User.findOne({
    where: { user_id: req.body.user_id },
  })
    .then((users) => {
      if (users) {
        res.status(200).send({
          message: "이미 존재하는 id입니다",
          exist: true
        });
      }
      else {
        res.status(200).send({
          message: "사용가능한 id입니다",
          exist: false
        });
      }

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "id확인 api 오류"

      });
    });
});

// 회원가입 
router.post("/register", async (req, res) => {

  const userInfo = {
    user_id: req.body.user_id,
    password: req.body.password,
    name: req.body.name,
    user_image: req.body.user_image,
  };
  models.User.create(userInfo)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        result: false,
        message: "회원가입하는데 오류가 발생하였습니다.",
      });
    });
});

// 로그인
router.post("/login", async (req, res, next) => {
  var inputId = req.body.user_id;
  var inputPassword = req.body.password;

  models.User.findOne({
    where: { user_id: inputId },
  })
    .then((data) => {
      if (data) {
        let dbPassword = data.get("password");

        if (dbPassword === inputPassword) {
          return res.status(200).json({
            message: "로그인 성공",
            status: true,
          });

        } else {
          return res.status(400).json({
            message: "비밀번호가 틀립니다",
            status: false
          });
        }
      }
      else {
        return res.status(401).json({
          message: "존재하지 않은 회원입니다",
          status: false
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "로그인 서버 오류",
        status: false
      });
    });
});


//회원 삭제
router.delete("/:user_id", async (req, res, next) => {
  models.User.destroy({
    where: { user_id: req.params.user_id },
  })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

// 회원정보 수정
router.put("/:user_id", async (req, res, next) => {

  models.User.update({
    user_id: req.body.user_id,
    password: req.body.password,
    name: req.body.name,
  },
    {
      where: { user_id: req.params.user_id },
    })
    .then((result) => {
      res.status(200).json({
       result : true,
      }
      );
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});


module.exports = router;
