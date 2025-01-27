"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user-controller");
router.get('/', user_controller_1.getUsers);
router.post('/create', user_controller_1.createUser);
router.put('/modify', user_controller_1.modifyUser);
router.delete('/delete', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user-route.js.map