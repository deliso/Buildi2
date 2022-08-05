"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var bidSchema = new Schema({
    bidPrice: Number,
    creatorId: String,
    creatorName: String,
    creatorPic: String,
    awarded: Boolean
});
var RFISchema = new Schema({
    question: String,
    response: String,
    creatorId: String,
    creatorPic: String
});
var projectSchema = new Schema({
    projectImage: {
        type: String,
        required: false
    },
    name: String,
    description: String,
    userId: String,
    specialties: [String],
    lifeCycle: String,
    bids: [bidSchema],
    rfis: [RFISchema]
});
exports["default"] = mongoose_1["default"].model('project', projectSchema);
// module.exports.Project = mongoose.model('project', projectSchema);
