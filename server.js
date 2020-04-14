const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const server = express();
const fs = require('fs');
const jwt = require('jsonwebtoken');
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: false }))
const port = 4000;

server.get("/", (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

server.get("/dashboard.html", (req, res) => {
	res.sendFile(__dirname + '/dashboard.html');
 });

server.get('/funciones.js',function(req,res){
    res.sendFile(path.join(__dirname + '/funciones.js')); 
});

server.post('/login/',function(req, res){
	// Cookies that have not been signed
	console.log('Cookies: ', req.cookies)
	// Cookies that have been signed
	// console.log('Signed Cookies: ', req.signedCookies)

	if(req.body.user === 'admin@admin.com' && req.body.pass === 'admin') {

		let privateKey = fs.readFileSync('private.key');
		let token = jwt.sign({ user: req.body.user, role: 'ADMIN' }, privateKey, { algorithm: 'RS256', expiresIn: 60 * 30 });

		let tokenParts = token.split('.')
		let payload = tokenParts[0] + '.' + tokenParts[1]
		let signature = tokenParts[2]

		const expires = new Date(Date.now() + 1800000)
		// const maxAge = new Date().getTime() * 1800000
		
		res.cookie('payload', payload, {/*secure: true,*/ expires})
		.cookie('signature', signature, {/*secure: true,*/ httpOnly: true})
		
		.json({user: req.body.user, role: 'ADMIN'})
		res.sendStatus(204)
	} else {
		res.sendStatus(401)
	}
});

server.get('/userData',function(req,res){
    let payload = req.cookies.payload 
	let signature = req.cookies.signature
	let token = payload + '.' + signature
	let publicKey = fs.readFileSync('public.key');

	try {
		let decoded = jwt.verify(token, publicKey);
		if(decoded){
			res.json({
						labels: ["<15.0s","<17.5s","<20.0s","<22.5s","<25.0s","<27.5s","<30.0s","<40.0s"],
						datasets:[{
							label: "Histogramas",
							backgroundColor: "#2E6C99",
							data : [36,62,75,82,87,91,92,196]
							}]}
						);
		} else {
			res.sendStatus(401)	
		}
	} catch(err) {
	  console.log(err)
		res.sendStatus(401)
	}
	
});


server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
