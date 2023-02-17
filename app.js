const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const { sequelize } = require("./models");

const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');



const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin : '*',
    // methods : ["GET","POST", "PUT"],
  },
});


require('dotenv').config();  //.env 파일에서 환경변수 가져오기

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));

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
app.use("/images", require("./routes/images")); // 이미지

app.use(express.static('public'))
app.use(express.static('./public/css'))
app.use(express.static('./public/js'))

// test chat

io.on('connection', (socket) => {

  console.log(`유저가 들어왔습니다 : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`유저의 아이디 : ${socket.id} 가 ${data}방에 들어옴`);
  });

  socket.on("send_message" , (data) => {
    socket.to(data.room).emit("receive_message", data);
  })

  // 퇴장
  socket.on('disconnect', () => {
    console.log("유저가 퇴장했습니다 ", socket.id)

  });
})


// test front
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "test.html"));
// });

server.listen(3000, () => {
  console.log("소켓서버 실행 중..");
})

// app.listen(3000, () => {
//   console.log("Express App on port 3000!");
// });