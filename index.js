'use strict';

console.log('Hello world!');
console.log('I will eventually talk to the Marvel Comics Database');
console.log('http://developer.marvel.com/documentation/getting_started');

let crypto = require('crypto');
let fs = require('fs');

const publicKey = 'b958258344feb4298d7a2da3af4007eb';

getPrivateKey()
  .then(
    privateKey => {
      getHash(getTimeStamp(), privateKey, publicKey).then(
        hash => {
          console.log(hash);
        }
      );
    },
    err => {
      console.log('some error happened');
    }
);

function getTimeStamp(){
  return Date.now();
}

function getHash(timeStamp, privateKey, publicKey) {
  return new Promise((resolve,reject) => {
    resolve(crypto.createHash('md5').update(timeStamp + privateKey + publicKey).digest('hex'));
  });
}

function getPrivateKey(){
  return new Promise((resolve, reject) => {
    fs.readFile('private.txt', 'utf8', (err, data) => {
      if(!err && data)
        resolve(data);
      else
        reject(err);
    });
  });
}
