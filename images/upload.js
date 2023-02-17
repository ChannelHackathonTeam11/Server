const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// AWS.config.update({
//     region : 'ap-northeast-2',
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
// });

// const s3 = new AWS.S3();

const s3 = new AWS.S3({
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage : multerS3({
        s3 : s3,
        bucket : process.env.AWS_S3_BUCKET_NAME,
        contentType : multerS3.AUTO_CONTENT_TYPE,
        acl : 'public-read',
        key : (req, file, callback) => {
            callback(null,`${Date.now()}_${file.originalname}`);
        },
    }),
});

exports.upload = multer(upload);