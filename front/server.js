const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const request = require('request')
const server = express();
server.use(bodyParser.json())
server.use(cookieParser())
const port = 5000;

const host = process.env.HOST_BACK


server.get("/", (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

server.get("/dashboard.html", (req, res) => {
	res.sendFile(__dirname + '/dashboard.html');
});

server.get('/funciones.js',function(req,res){
	res.sendFile(path.join(__dirname + '/funciones.js')); 
});

server.post('/login', function(req, response) {
	console.log('body', req.body)
	request({
		url: host+'/login',
		method: "POST",
		headers: { "Content-Type": "application/json" },
		json: true,
		body: req.body,
		time: true
	}, function (err, res, body) {
		console.log('responseType', typeof res)
		if (!err && res.statusCode == 200) {
			let cookieHeaders = res.headers["set-cookie"]
			cookieHeaders.forEach( item => {
				response.append('Set-Cookie', item)
			})
			response.json({user: body.user, role: 'ADMIN'})
		} else {
			response.sendStatus(res.statusCode)
		}
	});
});

server.get('/userData',function(req,response){
	console.log('entra en server front')
	console.log('req.cookies', req.cookies)

	let cookieHeader = `payload=${req.cookies.payload}; signature=${req.cookies.signature}` 
	
    request({
		url: host+'/userData',
		method: "GET",
		headers: { "Content-Type": "application/json", "Cookie": cookieHeader},
		json: true,
		body: req.body,
		time: true
	}, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			response.json(body)
		} else {
			response.sendStatus(res.statusCode)
		}
	});
	
});


server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
