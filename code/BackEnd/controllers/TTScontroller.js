require('dotenv').config();
const _ = require('lodash');
const fs = require('fs');
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();
  

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
var audioconcat = require('audioconcat');
    exports.getAudio = (req,res)=>{
      const promise = new Promise((resolve,reject) => {
      let count = 0;
      let list_file_mp3 = [];
      req.body.forEach(request => {
        client.synthesizeSpeech(request)
        .then(async (response) => {
        const audioContent = _.get(response[0], 'audioContent');
    
        if (audioContent) {
            count++;
            let outputFileName = './public/sub_file/' + 'output_' + count + '_' + Date.now() + '_' + Math.floor(Math.random() * 100000) + '.mp3';
            fs.writeFileSync(outputFileName, audioContent, 'binary');
            list_file_mp3.push(outputFileName);
            if(count === req.body.length)
            {
              resolve(list_file_mp3);
            }
            console.log(`Audio content successfully written to file: ${outputFileName}`);
        } else {
            reject('err');
            console.log('Failed to get audio content');
        }
        })
        .catch((err) => {
        console.error('ERROR:', err);
        });
      });
      });

      promise.then((songs) => {
          let file_name = './public/merged_file/tts_' + Date.now() + '_' + Math.floor(Math.random() * 100000) + '.mp3';
          audioconcat(songs)
                .concat(file_name)
                .on('start', function (command) {
                  console.log('ffmpeg process started:', command)
                })
                .on('error', function (err, stdout, stderr) {
                  console.error('Error:', err)
                  console.error('ffmpeg stderr:', stderr)
                  res.status(500).json({
                    "message":"error",
                  });
                })
                .on('end', function (output) {
                  console.error('Audio created in:', file_name);
                  songs.forEach(song => {
                    fs.unlinkSync(song);
                  });
                  res.status(200).json({
                    "message":"file is ready to use",
                    "url": "http://localhost:3000/mp3/" + file_name.replace('./public/merged_file/','')
                  });
                });
      }).catch(err => console.log(err));
    }