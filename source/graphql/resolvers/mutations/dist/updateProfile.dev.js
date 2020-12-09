"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var _typeValid = _interopRequireDefault(require("type-valid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isEmpty = function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }

  return true;
};

var validationControl = function validationControl(args, validationTypes) {
  var newArgs = [];
  var names = Object.keys(validationTypes);
  names.forEach(function (name) {
    return newArgs.push({
      name: name,
      param: args[name],
      type: validationTypes[name]
    });
  });
  var result = (0, _typeValid["default"])({
    args: newArgs
  });
  return result;
};

var updateProfile = function updateProfile(obj, args, context) {
  var validationTypes, validationControlResult, userID, user, newUserData;
  return regeneratorRuntime.async(function updateProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          validationTypes = {};

          if (args.oldPassword) {
            validationTypes.oldPassword = {
              isEmptyString: true,
              isMD5: true
            };
          }

          if (args.newPassword) {
            validationTypes.newPassword = {
              isEmptyString: true,
              isMD5: true
            };
          }

          if (isEmpty(validationTypes)) {
            _context.next = 7;
            break;
          }

          validationControlResult = validationControl(args, validationTypes);

          if (validationControlResult.result) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", {
            message: validationControlResult.error,
            code: 400
          });

        case 7:
          userID = context.userID;
          _context.next = 10;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("users").get(userID).run());

        case 10:
          user = _context.sent;

          if (!user) {
            _context.next = 21;
            break;
          }

          newUserData = {};

          if (!(args.oldPassword !== user.password)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("return", {
            message: "Eski şifre hatalı. Lütfen doğru girdiğinizden emin olun.",
            code: 500
          });

        case 17:
          newUserData.password = args.newPassword;

        case 18:
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

        case 21:
          return _context.abrupt("return", {
            message: "Böyle bir kullanıcı bulunamadı.",
            code: 500
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = updateProfile;
exports["default"] = _default;