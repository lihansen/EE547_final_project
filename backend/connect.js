const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const filename = 'waves.mp4'

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);

  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: fileContent, 
  };

//   console.log(params)

  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
  });
};
// ffmpeg -i fftest.mp4 -ss 00:00:00 -to 00:00:10 -c copy result.mp4



uploadFile(filename)

