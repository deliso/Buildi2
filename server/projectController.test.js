const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('./dist/server/model/user.model.js');
const router = require('./dist/server/router.js');

const testDatabase = 'buildi_test';

const PORT = 3005;

const testUser = {
	profilePic: '',
	email: 'test13@gmail.com',
	password: 'test_password',
	userType: 'contractor',
	firstName: 'Testio3',
	lastName: 'Testales3',
	location: 'San Diego',
	specialties: ['plumbing', 'electrical'],
};

describe('Register and login', () => {
	const app = express();

	beforeAll(async () => {
		const url = `mongodb://127.0.0.1/${testDatabase}`;
		await mongoose.connect(url, { useNewUrlParser: true });
		app.use(cors());
		app.use(express.json());
		app.use(router);
		app.listen(PORT, () => console.log('test server'));
	});

	afterAll(async () => {
		await User.deleteMany();
	});

	it('should save a user in the database', (done) => {
		request(app)
			.post('/register')
			.set('Accept', 'application/json')
			.send(testUser)
			.expect(201)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	it('should return error if the user email already exists', (done) => {
		request(app)
			.post('/register')
			.set('Accept', 'application/json')
			.send(testUser)
			.expect(409)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	it('should login with the newly created user', (done) => {
		request(app)
			.post('/login')
			.set('Accept', 'application/json')
			.send(({ email, password } = testUser))
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});
});
