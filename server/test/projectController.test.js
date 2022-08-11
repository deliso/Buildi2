const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../dist/server/model/user.model.js');
const Project = require('../dist/server/model/project.model.js');
const router = require('../dist/server/router.js');
const session = require('express-session');

const testDatabase = 'buildi_test';

const PORT = 3006;

let testServer;
let testUserId = '';
let testProjectId = '';

const testUser = {
	profilePic: '',
	email: 'testio.testales@tmail.com',
	password: 'test_password',
	userType: 'client',
	firstName: 'Testio',
	lastName: 'Testales',
	location: 'San Diego',
	specialties: ['', ''],
};

const testProject = {
	projectImage: '',
	name: 'Test Project',
	description: 'Test Project description',
	userId: '',
	specialties: [],
	lifeCycle: 'open',
	bids: [],
	rfis: [],
};

describe('Create and retrieve projects', () => {
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
		testServer = app.listen(PORT);
		agent.post('/register').set('Accept', 'application/json').send(testUser);
		agent
			.post('/login')
			.set('Accept', 'application/json')
			.send(({ email, password } = testUser), (err, res) => {
				if (err) return done(err);
				cookies = res.headers['set-cookie'].pop().split(';')[0];
				testUserId = res.body._id;
				console.log(testUserId);
			});
	});

	afterAll(async () => {
		await Project.deleteMany();
		await User.deleteMany();
		testServer.close();
		mongoose.connection.close();
	});

	it('should save project in the database', (done) => {
		agent
			.post('/create')
			.set('Accept', 'application/json')
			.send({ ...testProject, userId: testUserId })
			.expect(202)
			.end((err, res) => {
				if (err) return done(err);
				testProjectId = res.body._id;
				return done();
			});
	});

	it('should retrieve the newly created project from the database', (done) => {
		agent
			.get('/oneProject')
			.query({ id: testProjectId })
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.name).toBe('Test Project');
				return done();
			});
	});
	it('should return an array with all the saved projects', (done) => {
		agent
			.get('/projects')
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body.length).toBe(1);
				return done();
			});
	});
});
