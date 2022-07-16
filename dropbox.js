require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require("https");
const tmpFolder = './tmp';

fs.readdir(tmpFolder, (err, files) => {
    fs.readFile(path.join('tmp', files[0]), function (err, data) {
        const req = https.request('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.DROPBOX_TOKEN}`,
                'Dropbox-API-Arg': JSON.stringify({
                    'path': `/${files[0]}`,
                    'mode': 'overwrite',
                    'autorename': true, 
                    'mute': false,
                    'strict_conflict': false
                }),
                'Content-Type': 'application/octet-stream',
            }
        }, (res) => {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            res.on('data', function(d) {
                process.stdout.write(d);
            });
        });

        req.write(data);
        req.end();
    });
});