"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var _storeUploadImage = require("../../tools/storeUploadImage");

var _storeDeleteImage = require("../../tools/storeDeleteImage");

var updateTenantImage = function updateTenantImage(obj, args, context) {
  var userID, tenantID, tenantDatas, newTenantDataFiltered, newTenantData, uploadResult;
  return regeneratorRuntime.async(function updateTenantImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userID = context.userID;
          tenantID = args.tenantID;
          _context.next = 4;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("tenants").filter({
            id: tenantID,
            visible: true,
            userID: userID
          }).run());

        case 4:
          tenantDatas = _context.sent;

          if (!(tenantDatas.length !== 0)) {
            _context.next = 30;
            break;
          }

          newTenantDataFiltered = tenantDatas[0];
          newTenantData = {};

          if (!(typeof args.profileImage !== "undefined")) {
            _context.next = 23;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap((0, _storeUploadImage.storeUploadImage)(args.profileImage.promise));

        case 11:
          uploadResult = _context.sent;

          if (!(uploadResult.status === true)) {
            _context.next = 19;
            break;
          }

          if (!(newTenantDataFiltered.profileImageName !== "")) {
            _context.next = 16;
            break;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap((0, _storeDeleteImage.storeDeleteImage)(newTenantDataFiltered.profileImageName));

        case 16:
          newTenantData.profileImageName = uploadResult.fileName;
          _context.next = 21;
          break;

        case 19:
          console.log("buraya girdi");
          return _context.abrupt("return", {
            message: "Güncelleme işlemi yapılamamıştır. Lütfen daha sonra tekrar deneyin",
            code: 400
          });

        case 21:
          _context.next = 27;
          break;

        case 23:
          if (!(typeof args.deleteProfileImage !== "undefined" && args.deleteProfileImage === true)) {
            _context.next = 27;
            break;
          }

          _context.next = 26;
          return regeneratorRuntime.awrap((0, _storeDeleteImage.storeDeleteImage)(newTenantDataFiltered.profileImageName));

        case 26:
          newTenantData.profileImageName = "";

        case 27:
          return _context.abrupt("return", _db.r.db("hifaKiraTakip").table("tenants").filter({
            id: tenantID,
            visible: true,
            userID: userID
          }).update(newTenantData).then(function () {
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

        case 30:
          return _context.abrupt("return", {
            message: "Böyle bir kiracı bulunamadı.",
            code: 500
          });

        case 31:
        case "end":
          return _context.stop();
      }
    }
  });
};

var _default = updateTenantImage;
exports["default"] = _default;