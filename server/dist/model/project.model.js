"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const bidSchema = new Schema({
    bidPrice: Number,
    creatorId: String,
    creatorName: String,
    creatorPic: String,
    awarded: Boolean,
});
const RFISchema = new Schema({
    question: String,
    response: String,
    creatorId: String,
    creatorPic: String,
});
const projectSchema = new Schema({
    projectImage: {
        type: String,
        required: false,
    },
    name: String,
    description: String,
    userId: String,
    specialties: [String],
    lifeCycle: String,
    bids: [bidSchema],
    rfis: [RFISchema],
});
module.exports.Project = mongoose_1.default.model('project', projectSchema);
