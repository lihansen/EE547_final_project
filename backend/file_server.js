const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const pathToFfmpeg = require('ffmpeg-static');
const ffprobe = require('ffprobe-static');
const {user_model, video_model} = require('./schema');


ffmpeg.setFfmpegPath('./');
var app = express()
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})


let config_json = {
    host: "localhost",
    port: "27017",
    db: "ee547_hw",
    opts: {
        useUnifiedTopology: true
    }
}

const mongo_url = 'mongodb://' + config_json.host + ':' + config_json.port;

const uploadFile = (fileName) => {
    const fileContent = fs.readFileSync(fileName);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileContent
    };
    s3.upload(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
        return data.Location
    });
};

var router = express.Router();

var upload = multer({dest: './'});

router.post('/video', upload.any(), function(req, res, next) {
    // console.log(req.files[0]);  

    var des_file = "./" + req.files[0].originalname; //req.params.tag
    // var tag = req.params.tag
    // console.log("??", req.params.title)
    fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
                res.writeHead(200);
                res.write(err);
                res.end();
            }else{
                response = {
                    message:'File uploaded successfully',
                    // filename:req.files[0].originalname
                };
                console.log( response );
                res.end( JSON.stringify( response ));
                
                var filename; 
                video_model.create({name:req.params.tag}, function (err, result) { 
                    if (err){ 
                        console.log(err) 
                    }else{ 
                        filename = result
                    } 
                });
                cutVideo(des_file, filename, 0, 30)
                
                var url = uploadFile(des_file);
                if (url){

                }else{

                }
            }
        });
    });

});


app.use('/', router)
app.listen(4000)
console.log('file server start!')

// const filename = 'test.mp4'




const cutVideo = async (sourcePath, outputPath, startTime, duration) => {
  console.log('start cut video');

  await new Promise((resolve, reject) => {
    ffmpeg(sourcePath)
      .setFfmpegPath(pathToFfmpeg)
      .setFfprobePath(ffprobe.path)
      .output(outputPath)
      .setStartTime(startTime)
      .setDuration(duration)
      .withVideoCodec('copy')
      .withAudioCodec('copy')
      .on('end', function (err) {
        if (!err) {
          console.log('conversion Done');
          resolve();
        }
      })
      .on('error', function (err) {
        console.log('error: ', err);
        reject(err);
      })
      .run();
  });
};

// ffmpeg -i fftest.mp4 -ss 00:00:00 -to 00:00:10 -c copy result.mp4



// uploadFile(filename)

