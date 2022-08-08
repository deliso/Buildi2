import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Project from './model/project.model';
import router from './router';

const databaseName = 'buildi_test';

describe('Integration tests', () => {
	const app = express();
	app.use(express.json());
	app.use(router);
	const request = supertest(app);

	beforeAll(async () => {
		const url = `mondodb://127.0.0.1/${databaseName}`;
		await mongoose.connect(url, { useNewUrlParser: true });
	});
});

const PORT = 3002;
const app = express();
