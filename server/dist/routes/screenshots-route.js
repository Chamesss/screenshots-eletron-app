"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const screenshot_controller_1 = require("../controllers/screenshot-controller");
router.get('/:userId', screenshot_controller_1.getScreenShots);
router.post('/', screenshot_controller_1.createScreenShot);
router.delete('/delete', screenshot_controller_1.deleteScreenShot);
exports.default = router;
//# sourceMappingURL=screenshots-route.js.map