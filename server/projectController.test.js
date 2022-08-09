const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('./dist/server/model/user.model.js');
const router = require('./dist/server/router.js');
const session = require('express-session');

const testDatabase = 'buildi_test';

const PORT = 3005;

const testUser = {
	profilePic: '',
	email: 'testio.testales@tmail.com',
	password: 'test_password',
	userType: 'contractor',
	firstName: 'Testio',
	lastName: 'Testales',
	location: 'San Diego',
	specialties: ['plumbing', 'electrical'],
};

// const setCookies = (res) => {
// 	console.log('headers', res.headers);
// };

describe('Register and login', () => {
	const app = express();
	const agent = request(app);
	let cookies;

	beforeAll(async () => {
		const url = `mongodb://127.0.0.1/${testDatabase}`;
		await mongoose.connect(url, { useNewUrlParser: true });
		app.use(cors());
		app.use(express.json());
		app.use(
			session({
				// the store property, if not specified, defaults to the in-memory store
				name: 'sid',
				saveUninitialized: false,
				resave: false,
				secret: 'secret',
				cookie: {
					maxAge: 1000 * 60 * 60, // 1hr
					sameSite: true,
					httpOnly: false,
					// we would want to set secure=true in a production environment
					secure: false,
				},
			})
		);
		app.use(router);
		app.listen(PORT, () => console.log('test server'));
	});

	afterAll(async () => {
		await User.deleteMany();
	});

	it('should save a user in the database', (done) => {
		agent
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
		agent
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
		agent
			.post('/login')
			.set('Accept', 'application/json')
			.send(({ email, password } = testUser))
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				cookies = res.headers['set-cookie'].pop().split(';')[0];
				console.log(cookies);
				return done();
			});
	});

	it('should delete the session on logout', (done) => {
		agent
			.post('/logout')
			.set('Cookie', [cookies])
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				// console.log(res.cookies.sid);
				expect(res.headers['set-cookie'].pop().split(';')[0].length).toBe(4);
				return done();
			});
	});
});
