"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.modifyUser = exports.createUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find({}, 'name').exec();
        return res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Username is required' });
        }
        const newUser = new User_1.default({ name });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createUser = createUser;
// Modify a user
const modifyUser = async (req, res) => {
    const { id, newName } = req.body;
    try {
        if (!newName) {
            return res.status(400).json({ message: 'New username is required' });
        }
        const updatedUser = await User_1.default.findByIdAndUpdate(id, { name: newName }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.modifyUser = modifyUser;
// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedUser = await User_1.default.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user-controller.js.map