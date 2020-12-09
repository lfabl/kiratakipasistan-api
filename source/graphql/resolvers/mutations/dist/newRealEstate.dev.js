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

var newRealEstate = function newRealEstate(obj, args, context) {
  var newRealEstateDatas, validationTypes, fixtureResult, validationControlResult, userID;
  return regeneratorRuntime.async(function newRealEstate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newRealEstateDatas = {};
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
            newRealEstateDatas.usageType = args.usageType;
          } else {
            newRealEstateDatas.usageType = "null";
          }

          if (!args.fixtureDatas) {
            _context.next = 18;
            break;
          }

          if (!(args.fixtureDatas.length !== 0)) {
            _context.next = 15;
            break;
          }

          _context.next = 7;
          return regeneratorRuntime.awrap((0, _fixtureDatasConverter.fixtureDatasConverter)(args.fixtureDatas));

        case 7:
          fixtureResult = _context.sent;

          if (!(fixtureResult.status === true)) {
            _context.next = 12;
            break;
          }

          newRealEstateDatas.fixtureDatas = fixtureResult.data;
          _context.next = 13;
          break;

        case 12:
          return _context.abrupt("return", {
            message: "Demirbaşlar eklenirken bir hata oluşmuştur. Lütfen tekrar deneyin",
            code: 400
          });

        case 13:
          _context.next = 16;
          break;

        case 15:
          newRealEstateDatas.fixtureDatas = [];

        case 16:
          _context.next = 19;
          break;

        case 18:
          newRealEstateDatas.fixtureDatas = [];

        case 19:
          if (args.rentalDate) {
            newRealEstateDatas.rentalDate = args.rentalDate;
          } else {
            newRealEstateDatas.rentalDate = "0";
          }

          if (args.electricity) {
            validationTypes.electricity = {
              isEmptyString: true
            };
            newRealEstateDatas.electricity = args.electricity;
          } else {
            newRealEstateDatas.electricity = "";
          }

          if (args.water) {
            validationTypes.water = {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 150
              }
            };
            newRealEstateDatas.water = args.water;
          } else {
            newRealEstateDatas.water = "";
          }

          if (args.naturalGas) {
            validationTypes.naturalGas = {
              isEmptyString: true,
              isLength: {
                min: 5,
                max: 150
              }
            };
            newRealEstateDatas.naturalGas = args.naturalGas;
          } else {
            newRealEstateDatas.naturalGas = "";
          }

          if (args.TCIPNo) {
            validationTypes.TCIPNo = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            newRealEstateDatas.TCIPNo = args.TCIPNo;
          } else {
            newRealEstateDatas.TCIPNo = "";
          }

          if (args.ownerNameSurname) {
            validationTypes.ownerNameSurname = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            newRealEstateDatas.ownerNameSurname = args.ownerNameSurname;
          } else {
            newRealEstateDatas.ownerNameSurname = "";
          }

          if (args.ownerManagerPhoneNumber) {
            validationTypes.ownerManagerPhoneNumber = {
              isEmptyString: true,
              isLength: {
                min: 9,
                max: 16
              }
            };
            newRealEstateDatas.ownerManagerPhoneNumber = args.ownerManagerPhoneNumber;
          } else {
            newRealEstateDatas.ownerManagerPhoneNumber = "";
          }

          if (args.ownerTcIdentity) {
            validationTypes.ownerTcIdentity = {
              isEmptyString: true,
              isLength: {
                min: 9,
                max: 12
              }
            };
            newRealEstateDatas.ownerTcIdentity = args.ownerTcIdentity;
          } else {
            newRealEstateDatas.ownerTcIdentity = "";
          }

          if (args.ownerIban) {
            validationTypes.ownerIban = {
              isEmptyString: true,
              isLength: {
                min: 25,
                max: 34
              }
            };
            newRealEstateDatas.ownerIban = args.ownerIban;
          } else {
            newRealEstateDatas.ownerIban = "";
          }

          if (args.detailDues) {
            validationTypes.detailDues = {
              isEmptyString: true
            };
            newRealEstateDatas.detailDues = args.detailDues;
          } else {
            newRealEstateDatas.detailDues = "";
          }

          if (args.detailManagerPhoneNumber) {
            validationTypes.detailManagerPhoneNumber = {
              isEmptyString: true,
              isLength: {
                min: 9,
                max: 16
              }
            };
            newRealEstateDatas.detailManagerPhoneNumber = args.detailManagerPhoneNumber;
          } else {
            newRealEstateDatas.detailManagerPhoneNumber = "";
          }

          if (args.detailAdditionalInformation) {
            validationTypes.detailAdditionalInformation = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 720
              }
            };
            newRealEstateDatas.detailAdditionalInformation = args.detailAdditionalInformation;
          } else {
            newRealEstateDatas.detailAdditionalInformation = "";
          }

          if (args.numberOfRoom) {
            validationTypes.numberOfRoom = {
              isEmptyString: true,
              isLength: {
                min: 3,
                max: 150
              }
            };
            newRealEstateDatas.numberOfRoom = args.numberOfRoom;
          } else {
            newRealEstateDatas.numberOfRoom = "0+0";
          }

          if (args.purposeOfUsage) {
            validationTypes.purposeOfUsage = {
              isEmptyString: true,
              isLength: {
                min: 2,
                max: 300
              }
            };
            newRealEstateDatas.purposeOfUsage = args.purposeOfUsage;
          } else {
            newRealEstateDatas.purposeOfUsage = "";
          }

          if (args.detailRent) {
            validationTypes.detailRent = {
              isEmptyString: true
            };
            newRealEstateDatas.detailRent = args.detailRent;
          } else {
            newRealEstateDatas.detailRent = "";
          }

          if (args.deposit) {
            newRealEstateDatas.deposit = args.deposit;
          } else {
            newRealEstateDatas.deposit = "0";
          }

          validationControlResult = validationControl(args, validationTypes);

          if (validationControlResult.result) {
            _context.next = 38;
            break;
          }

          return _context.abrupt("return", {
            message: validationControlResult.error,
            code: 400
          });

        case 38:
          userID = context.userID;
          newRealEstateDatas.userID = userID;
          newRealEstateDatas.type = args.type;
          newRealEstateDatas.title = args.title;
          newRealEstateDatas.adress = args.adress;
          newRealEstateDatas.visible = true;
          newRealEstateDatas.paymentPeriod = args.paymentPeriod;
          newRealEstateDatas.registerDate = new Date().toISOString();
          _context.next = 48;
          return regeneratorRuntime.awrap(createNewRealEstate({
            newRealEstateDatas: newRealEstateDatas
          }));

        case 48:
          return _context.abrupt("return", _context.sent);

        case 49:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createNewRealEstate = function createNewRealEstate(_ref) {
  var newRealEstateDatas, insertRealEstateDatas;
  return regeneratorRuntime.async(function createNewRealEstate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newRealEstateDatas = _ref.newRealEstateDatas;
          _context2.prev = 1;
          insertRealEstateDatas = {};

          if (newRealEstateDatas.type === "store") {
            insertRealEstateDatas = {
              userID: newRealEstateDatas.userID,
              type: newRealEstateDatas.type,
              usageType: "null",
              title: newRealEstateDatas.title,
              adress: newRealEstateDatas.adress,
              fixtureDatas: newRealEstateDatas.fixtureDatas,
              electricity: newRealEstateDatas.electricity,
              water: newRealEstateDatas.water,
              naturalGas: newRealEstateDatas.naturalGas,
              TCIPNo: newRealEstateDatas.TCIPNo,
              ownerNameSurname: newRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
              ownerIban: newRealEstateDatas.ownerIban,
              detailDues: newRealEstateDatas.detailDues,
              detailManagerPhoneNumber: newRealEstateDatas.detailManagerPhoneNumber,
              detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: "0+0",
              purposeOfUsage: newRealEstateDatas.purposeOfUsage,
              detailRent: newRealEstateDatas.detailRent,
              registerDate: newRealEstateDatas.registerDate,
              paymentPeriod: newRealEstateDatas.paymentPeriod,
              deposit: newRealEstateDatas.deposit,
              visible: true
            };
          } else if (newRealEstateDatas.type === "apartment") {
            insertRealEstateDatas = {
              userID: newRealEstateDatas.userID,
              type: newRealEstateDatas.type,
              usageType: "null",
              title: newRealEstateDatas.title,
              adress: newRealEstateDatas.adress,
              fixtureDatas: newRealEstateDatas.fixtureDatas,
              electricity: newRealEstateDatas.electricity,
              water: newRealEstateDatas.water,
              naturalGas: newRealEstateDatas.naturalGas,
              TCIPNo: newRealEstateDatas.TCIPNo,
              ownerNameSurname: newRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
              ownerIban: newRealEstateDatas.ownerIban,
              detailDues: newRealEstateDatas.detailDues,
              detailManagerPhoneNumber: newRealEstateDatas.detailManagerPhoneNumber,
              detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: newRealEstateDatas.numberOfRoom,
              purposeOfUsage: newRealEstateDatas.purposeOfUsage,
              detailRent: newRealEstateDatas.detailRent,
              registerDate: newRealEstateDatas.registerDate,
              paymentPeriod: newRealEstateDatas.paymentPeriod,
              deposit: newRealEstateDatas.deposit,
              visible: true
            };
          } else if (newRealEstateDatas.type === "other") {
            insertRealEstateDatas = {
              userID: newRealEstateDatas.userID,
              type: newRealEstateDatas.type,
              usageType: newRealEstateDatas.usageType,
              title: newRealEstateDatas.title,
              adress: newRealEstateDatas.adress,
              fixtureDatas: [],
              electricity: "",
              water: "",
              naturalGas: "",
              TCIPNo: "",
              ownerNameSurname: newRealEstateDatas.ownerNameSurname,
              ownerManagerPhoneNumber: newRealEstateDatas.ownerManagerPhoneNumber,
              ownerTcIdentity: newRealEstateDatas.ownerTcIdentity,
              ownerIban: newRealEstateDatas.ownerIban,
              detailDues: "0",
              detailManagerPhoneNumber: "",
              detailAdditionalInformation: newRealEstateDatas.detailAdditionalInformation,
              numberOfRoom: "0+0",
              purposeOfUsage: "",
              detailRent: newRealEstateDatas.detailRent,
              registerDate: newRealEstateDatas.registerDate,
              paymentPeriod: newRealEstateDatas.paymentPeriod,
              deposit: newRealEstateDatas.deposit,
              visible: true
            };
          }

          _context2.next = 6;
          return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("realEstates").insert(insertRealEstateDatas).then(function (res) {
            if (res.inserted && res.inserted !== 0 && res.generated_keys && res.generated_keys.length !== 0) {
              return {
                message: "Başarı ile yeni emlak oluşturulmuştur",
                code: 200
              };
            } else {
              return {
                message: "Hata: Yeni emlak oluşturulamamıştır lütfen daha sonra tekrar deneyiniz.",
                code: 400
              };
            }
          })["catch"](function (err) {
            return {
              message: "Hata: " + err,
              code: 400
            };
          }));

        case 6:
          return _context2.abrupt("return", _context2.sent);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", {
            message: "Hata: " + _context2.t0.message,
            code: _context2.t0.code
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

var _default = newRealEstate;
exports["default"] = _default;