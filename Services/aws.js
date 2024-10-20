const AWS = require('aws-sdk');
require('dotenv').config();

// AWS S3 setup
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Upload images/videos to AWS S3
const uploadToS3 = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    
  };
  return s3.upload(params).promise();
};

module.exports = { uploadToS3 };
