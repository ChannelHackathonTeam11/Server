const SequelizeAuto = require('sequelize-auto');

require('dotenv').config();  //.env 파일에서 환경변수 가져오기

const auto = new SequelizeAuto(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME,  process.env.DATABASE_PASSWORD, {
      host: process.env.DATABASE_HOST,
      port: "3306",
      dialect: "mysql",
      directory :"./models"
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})