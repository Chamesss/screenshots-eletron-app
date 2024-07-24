"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const screenshots_route_1 = __importDefault(require("./routes/screenshots-route"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const port = 8000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.MONGODB_ATLAS_SRV || '')
    .then(() => {
    console.log('connected !');
})
    .catch((err) => {
    console.log('Failed to connect: ', err);
});
app.use('/users', user_route_1.default);
app.use('/screenshots', screenshots_route_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map