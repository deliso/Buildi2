const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('./dist/server/model/user.model.js');
const router = require('./dist/server/router.js');

const databaseName = 'buildi_test';

const PORT = 3005;

const testUser = {
	profilePic: '',
	email: 'test9@gmail.com',
	password: 'test_password',
	userType: 'contractor',
	firstName: 'Testio3',
	lastName: 'Testales3',
	location: 'San Diego',
	specialties: ['plumbing', 'electrical'],
};

describe('Integration tests', () => {
	const app = express();
	// const request = supertest(app);

	beforeAll(async () => {
		const url = `mongodb://127.0.0.1/${databaseName}`;
		await mongoose.connect(url, { useNewUrlParser: true });
		app.use(cors());
		app.use(express.json());
		app.use(router);
		app.listen(PORT, () => console.log('test server'));
	});

	it('should save a user in the database', (done) => {
		try {
			request(app)
				.post('/register')
				.set('Accept', 'application/json')
				.send(testUser)
				.expect(201)
				.end((err, res) => {
					if (err) return done(err);
					return done();
				});
			// const resUser = await User.find({});
			// console.log(resUser);
		} catch (e) {
			console.log(e);
		}
		// const user = await User.findOne({ firstName: testUser.firstName });
		// expect(user.firstName).toBe(testUser.firstName);
		// done();
	});

	// afterEach(async () => {
	// 	await User.deleteMany();
	// });
});
