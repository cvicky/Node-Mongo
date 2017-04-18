'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //front end is going to be served from 8080
let contacts = require('./data');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.get('/api/contacts', (request, response) =>{
	if(!contacts){
		response.status(404).json({message: 'No contacts found'});
	}
	response.json(contacts);
})

app.get('/api/contacts/:id', (request, response) =>{
	const requestId = request.params.id;

	let contact = contacts.filter(contact => {
		return contact.id == requestId;
	});

	response.json(contact[0]);
})
const hostname = 'localhost';
const port = 3003; // this API is served from 3003

// const server =http.createServer((request, response)=> {
// 	response.statusCode = 200;
// 	response.setHeader('Content-Type', 'text/html');
// 	response.end('<h1>Hello World!</h1>');
// });

app.listen(port, hostname, () =>{
	console.log(`Server is running at http://${hostname}:${port}`);
})