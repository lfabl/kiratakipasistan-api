"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var getAllRealEstates = function getAllRealEstates(obj, args, context) {
  var userID;
  return regeneratorRuntime.async(function getAllRealEstates$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userID = context.userID;
          _context.next = 4;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("realEstates").filter({
            userID: userID,
            visible: true
          }).merge(function (realEstates) {
            return {
              activeTenant: _db.r.db('hifaKiraTakip').table("contracts").filter({
                realEstateID: realEstates("id"),
                status: "continuation"
              }).coerceTo("array").merge(function (data) {
                return _db.r.db('hifaKiraTakip').table("tenants").get(data("tenantID"));
              }).pluck("fullName"),
              rentalType: _db.r.db("hifaKiraTakip").table("contracts").filter({
                realEstateID: realEstates("id"),
                status: "continuation"
              }).coerceTo("array").pluck("status")
            };
          }).orderBy(_db.r.desc("registerDate")).pluck("id", "title", "type", "rentalType", "rentalDate", "ownerManagerPhoneNumber", "ownerNameSurname", "activeTenant", "paymentPeriod", "detailRent").then(function (res) {
            return {
              data: res,
              response: {
                message: "Success",
                code: 200
              }
            };
          })["catch"](function (err) {
            return {
              data: [],
              response: {
                message: "Failed: " + err,
                code: 400
              }
            };
          }));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            data: [],
            response: {
              message: "Failed: " + _context.t0.message,
              code: _context.t0.code
            }
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var _default = getAllRealEstates;
exports["default"] = _default;