"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var _fs = require("fs");

var _path = require("path");

var getRealEstate = function getRealEstate(obj, args, context) {
  var realEstateID;
  return regeneratorRuntime.async(function getRealEstate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          realEstateID = args.realEstateID;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("realEstates").filter({
            id: realEstateID,
            visible: true
          }).merge(function (realEstate) {
            return {
              rentalType: _db.r.db("hifaKiraTakip").table("contracts").filter({
                realEstateID: realEstate("id"),
                status: "continuation"
              }).coerceTo("array").pluck("status")
            };
          }).then(function _callee(res) {
            var newRes;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(resConverter(res));

                  case 2:
                    newRes = _context.sent;
                    return _context.abrupt("return", {
                      data: newRes,
                      response: {
                        message: "Success",
                        code: 200
                      }
                    });

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
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
          return _context2.abrupt("return", _context2.sent);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", {
            data: [],
            response: {
              message: "Failed: " + _context2.t0.message,
              code: _context2.t0.code
            }
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var resConverter = function resConverter(args) {
  return regeneratorRuntime.async(function resConverter$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee2(resolve, reject) {
            var newRest, newFixtureDatas, index, element, newFixtureDatasImages, _index, fixTureDatas, imageResult;

            return regeneratorRuntime.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(args.length !== 0)) {
                      _context3.next = 36;
                      break;
                    }

                    newRest = args[0];

                    if (!(typeof newRest.fixtureDatas !== "undefined" && newRest.fixtureDatas.length !== 0)) {
                      _context3.next = 35;
                      break;
                    }

                    newFixtureDatas = [];
                    index = 0;

                  case 5:
                    if (!(index < newRest.fixtureDatas.length)) {
                      _context3.next = 33;
                      break;
                    }

                    element = newRest.fixtureDatas[index];

                    if (!(typeof element.images !== "undefined" && element.images.length !== 0)) {
                      _context3.next = 24;
                      break;
                    }

                    newFixtureDatasImages = [];
                    _index = 0;

                  case 10:
                    if (!(_index < element.images.length)) {
                      _context3.next = 22;
                      break;
                    }

                    fixTureDatas = element.images[_index];
                    imageResult = "";

                    if (!(typeof fixTureDatas.image !== "undefined")) {
                      _context3.next = 17;
                      break;
                    }

                    _context3.next = 16;
                    return regeneratorRuntime.awrap((0, _fs.readFileSync)((0, _path.join)(__dirname + "../../../../uploadedFixtureDatasImages/" + fixTureDatas.image), {
                      encoding: "base64"
                    }, function (err, data) {
                      if (err) {
                        return "";
                      } else {
                        return data;
                      }
                    }));

                  case 16:
                    imageResult = _context3.sent;

                  case 17:
                    newFixtureDatasImages.push({
                      image: fixTureDatas.image,
                      imageBase64: imageResult
                    });

                    if (element.images.length - 1 === _index) {
                      newFixtureDatas.push({
                        name: element.name,
                        images: newFixtureDatasImages
                      });
                    }

                  case 19:
                    _index++;
                    _context3.next = 10;
                    break;

                  case 22:
                    _context3.next = 25;
                    break;

                  case 24:
                    newFixtureDatas.push({
                      name: element.name,
                      images: []
                    });

                  case 25:
                    if (!(newRest.fixtureDatas.length - 1 === index)) {
                      _context3.next = 30;
                      break;
                    }

                    _context3.next = 28;
                    return regeneratorRuntime.awrap(newFixtureDatas);

                  case 28:
                    newRest.fixtureDatas = _context3.sent;
                    resolve(newRest);

                  case 30:
                    index++;
                    _context3.next = 5;
                    break;

                  case 33:
                    _context3.next = 36;
                    break;

                  case 35:
                    resolve(newRest);

                  case 36:
                  case "end":
                    return _context3.stop();
                }
              }
            });
          }));

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var _default = getRealEstate;
exports["default"] = _default;