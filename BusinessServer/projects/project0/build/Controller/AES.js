"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var encryptionType = "aes-256-cbc";
var encryptionEncoding = "base64";
var bufferEncryption = "utf-8";
var AesEncryption = /** @class */ (function () {
    function AesEncryption() {
        this.AesKey = "my 32 length key................";
        this.AesIV = "0123456789abcdef";
    }
    AesEncryption.prototype.encrypt = function (plainText) {
        var key = Buffer.from(this.AesKey, bufferEncryption);
        var iv = Buffer.from(this.AesIV, bufferEncryption);
        var cipher = crypto.createCipheriv(encryptionType, key, iv);
        var encrypted = cipher.update(plainText, bufferEncryption, encryptionEncoding);
        encrypted += cipher.final(encryptionEncoding);
        return encrypted;
    };
    AesEncryption.prototype.decrypt = function (base64String) {
        var buff = Buffer.from(base64String, encryptionEncoding);
        var key = Buffer.from(this.AesKey, bufferEncryption);
        var iv = Buffer.from(this.AesIV, bufferEncryption);
        var decipher = crypto.createDecipheriv(encryptionType, key, iv);
        var deciphered = decipher.update(buff) + decipher.final();
        console.log(deciphered);
        return deciphered;
    };
    return AesEncryption;
}());
exports.default = new AesEncryption();
