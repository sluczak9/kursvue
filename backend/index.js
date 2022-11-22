const express = require('express');
const httpServer = express();
const dialer = require('dialer').Dialer;
const cors = require('cors');
const bodyParser = require('body-parser');

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
 next();
});


const config = {
    url: process.env.url,
    login: process.env.login,
    password: process.env.password
 };
   dialer.configure(null);
   // Serwer nasłuchuje na porcie 3000
   httpServer.listen(3000, function () {
    console.log('Example app listening on port 3000!')
   // adres url możemy wygenerować za pomocą komendy
   // gp url 3000
   })

httpServer.post('/call/', async (req, res) => {
const number1 = req.body.number;
const number2 = '555555555' // tutaj dejemy swój numer
 console.log('Dzwonie', number1, number2)
 bridge = await dialer.call(number1, number2);
let interval = setInterval(async () => {
 let status = await bridge.getStatus();
 console.log(status)
 if (
 status === "ANSWERED" ||
 status === "FAILED" ||
 status === "BUSY" ||
 status === "NO ANSWER"
 ) {
 console.log("stop");
 clearInterval(interval);
 }
 }, 2000);
 res.json({ success: true });
})

