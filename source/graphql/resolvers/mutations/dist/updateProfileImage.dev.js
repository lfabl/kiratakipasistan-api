"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var _typeValid = _interopRequireDefault(require("type-valid"));

var _storeUploadImage = require("../../tools/storeUploadImage");

var _storeDeleteImage = require("../../tools/storeDeleteImage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var updateProfileImage = function updateProfileImage(obj, args, context) {
  var userID, user, newUserData, uploadResult;
  return regeneratorRuntime.async(function updateProfileImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userID = context.userID;
          _context.next = 3;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("users").get(userID).run());

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 28;
            break;
          }

          newUserData = {};

          if (!(typeof args.profileImage !== "undefined")) {
            _context.next = 21;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap((0, _storeUploadImage.storeUploadImage)(args.profileImage.promise));

        case 9:
          uploadResult = _context.sent;

          if (!(uploadResult.status === true)) {
            _context.next = 17;
            break;
          }

          if (!(user.profileImageName !== "")) {
            _context.next = 14;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap((0, _storeDeleteImage.storeDeleteImage)(user.profileImageName));

        case 14:
          newUserData.profileImageName = uploadResult.fileName;
          _context.next = 19;
          break;

        case 17:
          console.log("buraya girdi");
          return _context.abrupt("return", {
            message: "Güncelleme işlemi yapılamamıştır. Lütfen daha sonra tekrar deneyin",
            code: 400
          });

        case 19:
          _context.next = 25;
          break;

        case 21:
          if (!(typeof args.deleteProfileImage !== "undefined" && args.deleteProfileImage === true)) {
            _context.next = 25;
            break;
          }

          _context.next = 24;
          return regeneratorRuntime.awrap((0, _storeDeleteImage.storeDeleteImage)(user.profileImageName));

        case 24:
          newUserData.profileImageName = "";

        case 25:
          return _context.abrupt("return", _db.r.db("hifaKiraTakip").table("users").get(userID).update(newUserData).then(function () {
            return {
              message: "Bilgileriniz başarı ile güncellenmiştir.",
              code: 200
            };
          })["catch"](function (err) {
            return {
              message: err,
              code: 500
            };
          }));

        case 28:
          return _context.abrupt("return", {
            message: "Böyle bir kullanıcı bulunamadı.",
            code: 500
          });

        case 29:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = updateProfileImage;
exports["default"] = _default;