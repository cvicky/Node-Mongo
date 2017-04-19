'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); //front end is going to be served from localhost 8080
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri')
let contacts = require('./data');

const mongodbURI = 'mongodb://cvicky:password@ds163340.mlab.com:63340/test-labeldb';
const mongooseURI =  uriUtil.formatMongoose(mongodbURI); //mongoose can now understand the MongodbURI
const dbOptions = {}; //the mongoose connection will expect some option, but if none, then leave empty

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));
app.use('/api/contacts', require('./api/contacts/routes/put_contact'));

// app.get('/api/contacts', (request, response) =>{
// 	if(!contacts){
// 		response.status(404).json({message: 'No contacts found'});
// 	}
// 	response.json(contacts);
// })

// app.get('/api/contacts/:id', (request, response) =>{
// 	const requestId = request.params.id;

// 	let contact = contacts.filter(contact => {
// 		return contact.id == requestId;
// 	});

// 	response.json(contact[0]);
// });

// app.post('/api/contacts', (request, response) => {
// 	const contact = {
// 		id: contacts.length +1,
// 		first_name: request.body.first_name,
// 		last_name: request.body.last_name,
// 		email: request.body.email,
// 		website: request.body.website
// 	}
// 	contacts.push(contact);
// 	response.json(contact); //send back the contact in json format
// }); 


// app.put('/api/contacts/:id', (request, response) => {
// 	const requestId = request.params.id;

// 	let contact  = contacts.filter(contact => {
// 		return contact.id == requestId;
// 	}) [0];

// 	const index = contact.indexOf(contact);
// 	const keys = Object.keys(request.body);
// 	key.forEach(key => {
// 		contact[key] = request.body[key];
// 	})

// 	contacts[index] = contact;
// 	response.json(contacts[index]);
// });

// app.delete('/api/contacts/:id', (request, response) => {
// 	const requestId = request.params.id;

// 	let contact = contacts.filter(contact => {
// 		return contact.id == requestId
// 	})[0];

// 	const index = contacts.indexOf(contact);
// 	contacts.splice(index,1);

// 	response.json({message: `User ${requestId} deleted.`})
// });


const hostname = 'localhost';
const port = 3003; // this API is served from localhost 3003

// const server =http.createServer((request, response)=> {
// 	response.statusCode = 200;
// 	response.setHeader('Content-Type', 'text/html');
// 	response.end('<h1>Hello World!</h1>');
// });

app.listen(port, hostname, () =>{
	mongoose.connect(mongooseURI, dbOptions, (err) =>{
		if (err) {
			console.log(err);
		}
		console.log(`Server is running at http://${hostname}:${port}`);
	}); //mongoose connected
}); 