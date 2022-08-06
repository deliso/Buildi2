"use strict";
// 'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_model_1 = __importDefault(require("../model/project.model"));
// import session from 'express-session';
const user_model_1 = __importDefault(require("../model/user.model"));
const bcrypt = require('bcrypt');
// Creates a new project
const postProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield project_model_1.default.create({
            projectImage: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
            name: req.body.name,
            description: req.body.description,
            userId: req.body.id,
            specialties: req.body.specialties.split(','),
            lifeCycle: 'open',
            bids: [],
            rfis: [],
        });
        res.status(202);
        res.send('success!');
    }
    catch (e) {
        res.status(504);
    }
});
// Return lists of all projects
const returnProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('in');
        const projects = yield project_model_1.default.find();
        return res.status(200).send(projects);
    }
    catch (e) {
        res.status(505).send(e);
    }
    return res.send('yo');
});
// Return list of projects specific to a user
const returnProjectsById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('param id:', req.query.id);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
const returnOneProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield project_model_1.default.findById(req.query.id);
        return res.status(200).send(project);
    }
    catch (e) {
        res.status(505).send(e);
    }
    return 'Project not found';
});
// BIDS
const addBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f;
    try {
        const projectToUpdate = yield project_model_1.default.findByIdAndUpdate((_b = req.body) === null || _b === void 0 ? void 0 : _b.id, {
            $push: {
                bids: {
                    bidPrice: (_c = req.body) === null || _c === void 0 ? void 0 : _c.bidPrice,
                    creatorId: (_d = req.body) === null || _d === void 0 ? void 0 : _d.creatorId,
                    creatorName: (_e = req.body) === null || _e === void 0 ? void 0 : _e.creatorName,
                    creatorPic: (_f = req.body) === null || _f === void 0 ? void 0 : _f.creatorPic,
                    awarded: false,
                },
            },
        }, { new: true });
        res.status(200).send(projectToUpdate);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
const changeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectToUpdate = yield project_model_1.default.findOneAndUpdate({ _id: req.body.id, 'bids.creatorId': req.body.creatorId }, {
            $set: {
                'bids.$.bidPrice': req.body.bidPrice,
            },
        }, { new: true });
        res.status(200).send(projectToUpdate);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
// will update awarded bid status and also set project life cycle to awarded
const awardBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projectToUpdate = yield project_model_1.default.findOneAndUpdate({ _id: req.body.id, 'bids.creatorId': req.body.creatorId }, {
            $set: {
                'bids.$.awarded': true,
            },
        }, { new: true });
        projectToUpdate = yield project_model_1.default.findOneAndUpdate({ _id: req.body.id }, {
            $set: {
                lifeCycle: 'awarded',
            },
        }, { new: true });
        res.status(200).send(projectToUpdate);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
// RFIS
const addRFI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectToUpdate = yield project_model_1.default.findByIdAndUpdate(req.body.id, {
            $push: {
                rfis: {
                    question: req.body.question,
                    response: '',
                    creatorId: req.body.creatorId,
                    creatorPic: req.body.creatorPic,
                },
            },
        }, { new: true });
        res.status(200).send(projectToUpdate);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
const respondRFI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectToUpdate = yield project_model_1.default.findOneAndUpdate({ _id: req.body.id, 'rfis._id': req.body.rfiId }, {
            $set: {
                'rfis.$.response': req.body.response,
            },
        }, { new: true });
        res.status(200).send(projectToUpdate);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
// USER FUNCTIONS
// <any, any, UserT>
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // first leave the review
        const userToLeaveReviewOn = yield user_model_1.default.findByIdAndUpdate(req.body.bidderId, {
            $push: {
                reviews: {
                    rating: req.body.rating,
                    review: req.body.review,
                    creatorFirstName: req.body.creatorFirstName,
                    creatorLastName: req.body.creatorLastName,
                    creatorPic: req.body.creatorPic,
                },
            },
        }, { new: true });
        // next change the project status to closed
        // const projectToClose = await Project.findOneAndUpdate(
        // 	{ _id: req.body.projectId },
        // 	{
        // 		$set: {
        // 			lifeCycle: 'closed',
        // 		},
        // 	},
        // 	{ new: true }
        // );
        res.status(200).send(userToLeaveReviewOn);
    }
    catch (e) {
        res.status(505).send(e);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const { email, password } = req.body;
    const user = yield user_model_1.default.findOne({ email });
    if (user) {
        return res
            .status(409)
            .send({ error: '409', message: 'User already exists =(' });
    }
    try {
        if (password === '')
            throw new Error();
        const hash = yield bcrypt.hash(password, 10);
        const newUser = new user_model_1.default(Object.assign(Object.assign({}, req.body), { profilePic: (_g = req.file) === null || _g === void 0 ? void 0 : _g.path, specialties: req.body.specialties.split(','), reviews: [], password: hash }));
        const user1 = yield newUser.save();
        req.session.id = user1.id;
        res.status(201).send(user1);
    }
    catch (error) {
        res
            .status(400)
            .send({ error, message: 'Error, could not create a new user =(' });
    }
    return 'Error, could not create a new user =(';
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        const validatedPass = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (!validatedPass)
            throw new Error();
        req.session.id = user.id;
        res.status(200).send(user);
    }
    catch (error) {
        res
            .status(401)
            .send({ error: '401', message: 'Username or password is incorrect' });
    }
});
// This version uses auth middleware for logged in user
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, profilePic, firstName, lastName, userType, location, email, specialties, reviews, } = req.body.user;
        const user = {
            _id,
            profilePic,
            firstName,
            lastName,
            userType,
            location,
            email,
            specialties,
            reviews,
        };
        res.status(200).send(user);
    }
    catch (error) {
        res.status(404).send({ error, message: 'User not found' });
    }
});
// This version is to obtain profile details of another user, without changing the authorized user (to view someone elses profile)
// UPDATE LATER SO YOU DO NOT SEND BACK ANY SENSITIVE INFO (IF YOU HAVE TIME)
const getOtherProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otherUser = yield user_model_1.default.findById(req.query.id);
        res.status(200).send(otherUser);
    }
    catch (error) {
        res.status(404).send({ error, message: 'User not found' });
    }
});
const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res
                .status(500)
                .send({ error, message: 'Could not log out, please try again' });
        }
        else {
            res.clearCookie('sid');
            res.status(200).send({ message: 'Logout successful' });
        }
    });
};
exports.default = {
    postProject,
    returnProjects,
    returnProjectsById,
    returnOneProject,
    addBid,
    changeBid,
    awardBid,
    addRFI,
    respondRFI,
    createUser,
    login,
    profile,
    getOtherProfile,
    logout,
    createReview,
};
