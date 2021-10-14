"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GQLDrainError = exports.GQLDrain = void 0;
function GQLDrain(status, data) {
    var final_data = { status: status, data: data };
    var final_data_str = JSON.stringify(final_data);
    return final_data_str;
    //   var encrypted = AESEncryption(final_data_str)
    //   return encrypted
}
exports.GQLDrain = GQLDrain;
function GQLDrainError() {
    return GQLDrain(-1, {});
}
exports.GQLDrainError = GQLDrainError;
function AESEncryption(data) {
    return "";
}
