"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScreenShot = exports.createScreenShot = exports.getScreenShots = void 0;
const User_1 = __importDefault(require("../models/User"));
const getScreenShots = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User_1.default.findById(userId, 'imageUrls').exec();
        if (user) {
            return res.status(200).json(user.imageUrls);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getScreenShots = getScreenShots;
const createScreenShot = async (req, res) => {
    const { userId, imageUrl } = req.body;
    try {
        if (!userId || !imageUrl) {
            return res
                .status(400)
                .json({ message: 'UserId and imageUrl are required' });
        }
        // Find the user and update the imageUrls array
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { $push: { imageUrls: imageUrl } }, { new: true, useFindAndModify: false });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createScreenShot = createScreenShot;
const deleteScreenShot = async (req, res) => {
    const { userId, imageUrl } = req.body;
    try {
        if (!userId || !imageUrl) {
            return res
                .status(400)
                .json({ message: 'UserId and imageUrl are required' });
        }
        // Find the user and update the imageUrls array
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { $pull: { imageUrls: imageUrl } }, { new: true, useFindAndModify: false });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteScreenShot = deleteScreenShot;
//# sourceMappingURL=screenshot-controller.js.map