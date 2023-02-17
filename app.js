const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");

const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');

const models = require("./models");


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
    // methods : ["GET","POST", "PUT"],
  },
});


require('dotenv').config();  //.env 파일에서 환경변수 가져오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
  credentials: 'true'
}));

// db연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

// 라우터
app.use("/users", require("./routes/users")); // 유저
app.use("/chat", require("./routes/chat")); // 채팅
app.use("/contents", require("./routes/contents")); // 유저
app.use("/images", require("./routes/images")); // 이미지


app.use(express.static('public'))
app.use(express.static('./public/css'))
app.use(express.static('./public/js'))

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });


// test chat

io.on('connection', (socket) => {

  console.log(`유저가 들어왔습니다 : ${socket.id}`);

  socket.on("join_room", async (data) => {
    console.log(`조인할때 : ${data.room_id} `);
    socket.join(data.room_id);

    let result = await models.Chat.findOne({
      where: { room_id: data.room_id },
    });

    socket.to(data).emit("join_room", result.dataValues);

    console.log(result.dataValues);
    console.log(`유저의 아이디 : ${socket.id} 가 ${data}방에 들어옴`);

  });

  socket.on("send_message", async (data) => {

    console.log(`메세지보낼때 : ${data} `);
    socket.to(data.room_id).emit("receive_message", data);

    let result = await models.Chat.findOne({
      where: { room_id: data.room_id },
    });

    let text = {
      user_id: data.user_id,
      contents: data.contents
    }

    let messageInfo = result.dataValues.message;
    messageInfo = messageInfo ? messageInfo : []

    // data.push(messageInfo);
    messageInfo = [...messageInfo, data]

    const combined = { message: messageInfo }
    result.update(combined)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log("여기서 에러");
      })
  })

  // 퇴장
  socket.on('disconnect', () => {
    console.log("유저가 퇴장했습니다 ", socket.id)

  });
})


// test front
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});

server.listen(3000, () => {
  console.log("소켓서버 실행 중..");
})

// app.listen(3000, () => {
//   console.log("Express App on port 3000!");
// });