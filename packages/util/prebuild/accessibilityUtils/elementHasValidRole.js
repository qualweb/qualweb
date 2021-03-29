"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_json_1 = __importDefault(require("./roles.json"));
const getElementRole_1 = __importDefault(require("./getElementRole"));
function elementHasValidRole(element) {
    const role = getElementRole_1.default(element);
    let result = false;
    if (role) {
        if (role.trim().includes(' ')) {
            for (const r of role.trim().split(' ')) {
                result = Object.keys(roles_json_1.default).includes(r);
                if (result) {
                    break;
                }
            }
        }
        else {
            result = Object.keys(roles_json_1.default).includes(role);
        }
    }
    return result;
}
exports.default = elementHasValidRole;
