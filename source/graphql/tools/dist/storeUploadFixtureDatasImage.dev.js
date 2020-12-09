"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeUploadFixtureDatasImage = void 0;

var _fs = require("fs");

var _uploadFileNameCreator = require("./uploadFileNameCreator");

var _path = require("path");

var storeUploadFixtureDatasImage = function storeUploadFixtureDatasImage(args) {
  return new Promise(function _callee(resolve, reject) {
    var _ref, createReadStream, filename, newFileName, coolPath;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(args);

          case 2:
            _ref = _context.sent;
            createReadStream = _ref.createReadStream;
            filename = _ref.filename;
            _context.next = 7;
            return regeneratorRuntime.awrap((0, _uploadFileNameCreator.uploadFileNameCreator)(filename));

          case 7:
            newFileName = _context.sent;

            if (!(newFileName.status === true)) {
              _context.next = 13;
              break;
            }

            coolPath = (0, _path.join)(__dirname + "../../../uploadedFixtureDatasImages/".concat(newFileName.fileName));
            return _context.abrupt("return", createReadStream().pipe((0, _fs.createWriteStream)(coolPath)).on("finish", function () {
              return resolve({
                status: true,
                fileName: newFileName.fileName
              });
            }).on("error", function (err) {
              console.log(err);
              return reject({
                status: false,
                fileName: ""
              });
            }));

          case 13:
            resolve({
              status: false,
              fileName: ""
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  });
};

exports.storeUploadFixtureDatasImage = storeUploadFixtureDatasImage;