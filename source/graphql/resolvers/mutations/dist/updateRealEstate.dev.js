"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = require("../../../db");

var _typeValid = _interopRequireDefault(require("type-valid"));

var _fixtureDatasConverter = require("../../tools/fixtureDatasConverter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var updateRealEstate = function updateRealEstate(obj, args, context) {
  var updateRealEstateDatas, validationTypes, fixtureResult, validationControlResult, userID;
  return regeneratorRuntime.async(function updateRealEstate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          updateRealEstateDatas = {};
          validationTypes = {
            type: {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 85
              }
            },
            title: {
              isEmptyString: true,
              isLength: {
                min: 4,
                max: 40
              }
            },
            adress: {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 85
              }
            }
          };

          if (args.usageType) {
            validationTypes.usageType = {
              isEmptyString: true,
              isLength: {
                min: 4,
                max: 40
              }
            };
            updateRealEstateDatas.usageType = args.usageType;
          } else {
            updateRealEstateDatas.usageType = "";
          }

          if (!args.fixtureDatas) {
            _context.next = 19;
            break;
          }

          console.log(args.fixtureDatas);

          if (!(args.fixtureDatas.length !== 0)) {
            _context.next = 16;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap((0, _fixtureDatasConverter.fixtureDatasConverter)(args.fixtureDatas, args.realEstateID));

        case 8:
          fixtureResult = _context.sent;

          if (!(fixtureResult.status === true)) {
            _context.next = 13;
            break;
          }

          updateRealEstateDatas.fixtureDatas = fixtureResult.data;
          _context.next = 14;
          break;

        case 13:
          return _context.abrupt("return", {
            message: "Demirbaşlar güncellenirken bir hata oluşmuştur. Lütfen tekrar deneyin",
            code: 400
          });

        case 14:
          _context.next = 17;
          break;

        case 16:
          updateRealEstateDatas.fixtureDatas = [];

        case 17:
          _context.next = 20;
          break;

        case 19:
          updateRealEstateDatas.fixtureDatas = [];

        case 20:
          if (args.rentalDate) {
            updateRealEstateDatas.rentalDate = args.rentalDate;
          } else {
            updateRealEstateDatas.rentalDate = "0";
          }

          if (args.electricity) {
            validationTypes.electricity = {
              isEmptyString: true
            };
            updateRealEstateDatas.electricity = args.electricity;
          } else {
            updateRealEstateDatas.electricity = "";
          }

          if (args.water) {
            validationTypes.water = {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 150
              }
            };
            updateRealEstateDatas.water = args.water;
          } else {
            updateRealEstateDatas.water = "";
          }

          if (args.naturalGas) {
            validationTypes.naturalGas = {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 150
              }
            };
            updateRealEstateDatas.naturalGas = args.naturalGas;
          } else {
            updateRealEstateDatas.naturalGas = "";
          }

          if (args.TCIPNo) {
            validationTypes.TCIPNo = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            updateRealEstateDatas.TCIPNo = args.TCIPNo;
          } else {
            updateRealEstateDatas.TCIPNo = "";
          }

          if (args.ownerNameSurname) {
            validationTypes.ownerNameSurname = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            updateRealEstateDatas.ownerNameSurname = args.ownerNameSurname;
          } else {
            updateRealEstateDatas.ownerNameSurname = "";
          }

          if (args.ownerManagerPhoneNumber) {
            validationTypes.ownerManagerPhoneNumber = {
              isEmptyString: true,
              isLength: {
                min: 9,
                max: 16
              }
            };
            updateRealEstateDatas.ownerManagerPhoneNumber = args.ownerManagerPhoneNumber;
          } else {
            updateRealEstateDatas.ownerManagerPhoneNumber = "";
          }

          if (args.ownerTcIdentity) {
            validationTypes.ownerTcIdentity = {
              isEmptyString: true,
              isLength: {
                min: 10,
                max: 11
              }
            };
            updateRealEstateDatas.ownerTcIdentity = args.ownerTcIdentity;
          } else {
            updateRealEstateDatas.ownerTcIdentity = "";
          }

          if (args.ownerIban) {
            validationTypes.ownerIban = {
              isEmptyString: true,
              isLength: {
                min: 25,
                max: 34
              }
            };
            updateRealEstateDatas.ownerIban = args.ownerIban;
          } else {
            updateRealEstateDatas.ownerIban = "";
          }

          if (args.detailDues) {
            validationTypes.detailDues = {
              isEmptyString: true
            };
            updateRealEstateDatas.detailDues = args.detailDues;
          } else {
            updateRealEstateDatas.detailDues = "";
          }

          if (args.detailManagerPhoneNumber) {
            validationTypes.detailManagerPhoneNumber = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            updateRealEstateDatas.detailManagerPhoneNumber = args.detailManagerPhoneNumber;
          } else {
            updateRealEstateDatas.detailManagerPhoneNumber = "";
          }

          if (args.detailAdditionalInformation) {
            validationTypes.detailAdditionalInformation = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 720
              }
            };
            updateRealEstateDatas.detailAdditionalInformation = args.detailAdditionalInformation;
          } else {
            updateRealEstateDatas.detailAdditionalInformation = "";
          }

          if (args.numberOfRoom) {
            validationTypes.numberOfRoom = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            updateRealEstateDatas.numberOfRoom = args.numberOfRoom;
          } else {
            updateRealEstateDatas.numberOfRoom = "";
          }

          if (args.purposeOfUsage) {
            validationTypes.purposeOfUsage = {
              isEmptyString: true,
              isLength: {
                min: 2,
                max: 300
              }
            };
            updateRealEstateDatas.purposeOfUsage = args.purposeOfUsage;
          } else {
            updateRealEstateDatas.purposeOfUsage = "";
          }

          if (args.detailRent) {
            validationTypes.detailRent = {
              isEmptyString: true
            };
            updateRealEstateDatas.detailRent = args.detailRent;
          } else {
            updateRealEstateDatas.detailRent = "";
          }

          if (args.deposit) {
            updateRealEstateDatas.deposit = args.deposit;
          } else {
            updateRealEstateDatas.deposit = "0";
          }

          validationControlResult = validationControl(args, validationTypes);

          if (validationControlResult.result) {
            _context.next = 39;
            break;
          }

          return _context.abrupt("return", {
            message: validationControlResult.error,
            code: 400
          });

        case 39:
          userID = context.userID;
          updateRealEstateDatas.userID = userID;
          updateRealEstateDatas.realEstateID = args.realEstateID;
          updateRealEstateDatas.type = args.type;
          updateRealEstateDatas.title = args.title;
          updateRealEstateDatas.adress = args.adress;
          updateRealEstateDatas.paymentPeriod = args.paymentPeriod;
          updateRealEstateDatas.rentalType = args.rentalType;
          updateRealEstateDatas.registerDate = new Date().toISOString();
          _context.next = 50;
          return regeneratorRuntime.awrap(updateRealEstateData({
            updateRealEstateDatas: updateRealEstateDatas
          }));

        case 50:
          return _context.abrupt("return", _context.sent);

        case 51:
        case "end":
          return _context.stop();
      }
    }
  });
};

var updateRealEstateData = function updateRealEstateData(_ref) {
  var updateRealEstateDatas, updateDataFilterType, contractControl;
  return regeneratorRuntime.async(function updateRealEstateData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          updateRealEstateDatas = _ref.updateRealEstateDatas;
          _context3.prev = 1;
          updateDataFilterType = {};

          if (updateRealEstateDatas.type === "store") {
            updateDataFilterType = {
              userID: updateRealEstateDatas.userID,
              type: updateRealEstateDatas.type,
              usageType: "null",
              title: updateRealEstateDatas.title,
              adress: updateRealEstateDatas.adress,
              fixtureDatas: updateRealEstateDatas.fixtureDatas,
              electricity: updateRealEstateDatas.electricity,
              water: updateRealEstateDatas.water,
              naturalGas: updateRealEstateDatas.naturalGas,
              TCIPNo: updateRealEstateDatas.TCIPNo,
              ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
              ownerIban: updateRealEstateDatas.ownerIban,
              detailDues: updateRealEstateDatas.detailDues,
              detailManagerPhoneNumber: updateRealEstateDatas.detailManagerPhoneNumber,
              detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: "0+0",
              purposeOfUsage: updateRealEstateDatas.purposeOfUsage,
              detailRent: updateRealEstateDatas.detailRent,
              registerDate: updateRealEstateDatas.registerDate,
              paymentPeriod: updateRealEstateDatas.paymentPeriod,
              deposit: updateRealEstateDatas.deposit
            };
          } else if (updateRealEstateDatas.type === "apartment") {
            updateDataFilterType = {
              userID: updateRealEstateDatas.userID,
              type: updateRealEstateDatas.type,
              usageType: "null",
              title: updateRealEstateDatas.title,
              adress: updateRealEstateDatas.adress,
              fixtureDatas: updateRealEstateDatas.fixtureDatas,
              electricity: updateRealEstateDatas.electricity,
              water: updateRealEstateDatas.water,
              naturalGas: updateRealEstateDatas.naturalGas,
              TCIPNo: updateRealEstateDatas.TCIPNo,
              ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
              ownerIban: updateRealEstateDatas.ownerIban,
              detailDues: updateRealEstateDatas.detailDues,
              detailManagerPhoneNumber: updateRealEstateDatas.detailManagerPhoneNumber,
              detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: updateRealEstateDatas.numberOfRoom,
              purposeOfUsage: updateRealEstateDatas.purposeOfUsage,
              detailRent: updateRealEstateDatas.detailRent,
              registerDate: updateRealEstateDatas.registerDate,
              paymentPeriod: updateRealEstateDatas.paymentPeriod,
              deposit: updateRealEstateDatas.deposit
            };
          } else if (updateRealEstateDatas.type === "other") {
            updateDataFilterType = {
              userID: updateRealEstateDatas.userID,
              type: updateRealEstateDatas.type,
              usageType: updateRealEstateDatas.usageType,
              title: updateRealEstateDatas.title,
              adress: updateRealEstateDatas.adress,
              fixtureDatas: [],
              electricity: "",
              water: "",
              naturalGas: "",
              TCIPNo: "",
              ownerNameSurname: updateRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: updateRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: updateRealEstateDatas.ownerTcIdentity,
              ownerIban: updateRealEstateDatas.ownerIban,
              detailDues: "0",
              detailManagerPhoneNumber: "",
              detailAdditionalInformation: updateRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: "0+0",
              purposeOfUsage: "",
              detailRent: updateRealEstateDatas.detailRent,
              registerDate: updateRealEstateDatas.registerDate,
              paymentPeriod: updateRealEstateDatas.paymentPeriod,
              deposit: updateRealEstateDatas.deposit
            };
          }

          _context3.next = 6;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("contracts").filter({
            realEstateID: updateRealEstateDatas.realEstateID,
            status: "continuation",
            userID: updateRealEstateDatas.userID
          }).then(function (res) {
            return res.length !== 0 ? true : false;
          }));

        case 6:
          contractControl = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("realEstates").get(updateRealEstateDatas.realEstateID).update(updateDataFilterType).then(function _callee(res) {
            return regeneratorRuntime.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(res.replaced && res.replaced !== 0 || res.unchanged && res.unchanged !== 0)) {
                      _context2.next = 10;
                      break;
                    }

                    if (!(contractControl === true && updateRealEstateDatas.rentalType === "unattached")) {
                      _context2.next = 7;
                      break;
                    }

                    _context2.next = 4;
                    return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("contracts").filter({
                      realEstateID: updateRealEstateDatas.realEstateID,
                      status: "continuation",
                      userID: updateRealEstateDatas.userID
                    }).update({
                      status: "cancel"
                    }).then(function (updateResult) {
                      if (updateResult.replaced && updateResult.replaced !== 0 || updateResult.unchanged && updateResult.unchanged !== 0) {
                        return {
                          message: "Başarı ile bilgiler güncellenmiştir.",
                          code: 200
                        };
                      } else {
                        return {
                          message: "Hata: Emlak bilgileri güncellenememiştir, lütfen daha sonra tekrar deneyiniz.",
                          code: 400
                        };
                      }
                    }));

                  case 4:
                    return _context2.abrupt("return", _context2.sent);

                  case 7:
                    return _context2.abrupt("return", {
                      message: "Başarı ile bilgiler güncellenmiştir.",
                      code: 200
                    });

                  case 8:
                    _context2.next = 11;
                    break;

                  case 10:
                    return _context2.abrupt("return", {
                      message: "Hata: Emlak bilgileri güncellenememiştir, lütfen daha sonra tekrar deneyiniz.",
                      code: 400
                    });

                  case 11:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          })["catch"](function (err) {
            return {
              message: "Hata: " + err,
              code: 400
            };
          }));

        case 9:
          return _context3.abrupt("return", _context3.sent);

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", {
            message: "Hata: " + _context3.t0.message,
            code: _context3.t0.code
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

var _default = updateRealEstate;
exports["default"] = _default;