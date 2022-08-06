"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// REQUIRES
// multer is for incoming form data
const multer_1 = __importDefault(require("multer"));
const project_controller_1 = __importDefault(require("./controller/project.controller"));
const router = require('express').Router();
// const multer = require("multer");
const authMiddleware = require('./middlewares/auth');
// SETUP / CONFIG
// configures how multer stores files. More detailed than just using dest
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});
// note that I can use multer to filter by file types, only accept certain file sizes, etc.
// creates a multer instance
const upload = (0, multer_1.default)({ storage });
// ROUTES
// create project
router.post('/create', upload.single('projectImage'), project_controller_1.default.postProject);
// Bids
router.post('/bid', project_controller_1.default.addBid);
router.post('/editbid', project_controller_1.default.changeBid);
router.post('/awardbid', project_controller_1.default.awardBid);
// RFI's
router.post('/RFI', project_controller_1.default.addRFI);
router.post('/RFIrespond', project_controller_1.default.respondRFI);
// return all projects
// router.get('/projects', projectController.returnProjects);
router.get('/projects', () => console.log('router'));
// return projects specific to a user
router.get('/userprojects', project_controller_1.default.returnProjectsById);
// return specific project for details page
router.get('/oneProject/', project_controller_1.default.returnOneProject);
// USER ROUTES
// leave review
router.post('/review', project_controller_1.default.createReview);
// auth routes
router.post('/register', upload.single('profilePic'), project_controller_1.default.createUser);
router.post('/login', upload.single('formData would not be recieved without this middleware (which is meant for uploadings pictures). This is a temp bandaid fix. Nothing gets uploaded'), project_controller_1.default.login);
// auth version for the main user
router.get('/profile', authMiddleware, project_controller_1.default.profile);
// to view someone elses profile
router.get('/otherprofile', project_controller_1.default.getOtherProfile);
router.post('/logout', authMiddleware, project_controller_1.default.logout);
exports.default = router;
