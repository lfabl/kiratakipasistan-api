"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixtureDatasConverter = void 0;

var _db = require("../../db");

var _storeUploadFixtureDatasImage = require("./storeUploadFixtureDatasImage");

var _fs = require("fs");

var _path = require("path");

var fixtureDatasConverter = function fixtureDatasConverter(datas, id) {
  return regeneratorRuntime.async(function fixtureDatasConverter$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee2(resolve, reject) {
            var returnData, index, element, imageResult, _index, image, uploadResult;

            return regeneratorRuntime.async(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    returnData = [];
                    index = 0;

                  case 2:
                    if (!(index < datas.length)) {
                      _context2.next = 31;
                      break;
                    }

                    element = datas[index];
                    console.log(element);
                    imageResult = [];

                    if (!(typeof element.images !== "undefined" && element.images.length !== 0)) {
                      _context2.next = 24;
                      break;
                    }

                    _index = 0;

                  case 8:
                    if (!(_index < element.images.length)) {
                      _context2.next = 22;
                      break;
                    }

                    image = element.images[_index];

                    if (!(typeof image["newImage"] !== "undefined")) {
                      _context2.next = 17;
                      break;
                    }

                    _context2.next = 13;
                    return regeneratorRuntime.awrap((0, _storeUploadFixtureDatasImage.storeUploadFixtureDatasImage)(image.newImage.promise));

                  case 13:
                    uploadResult = _context2.sent;

                    if (uploadResult.status === true) {
                      imageResult.push({
                        image: uploadResult.fileName
                      });
                    } else {
                      resolve({
                        status: false,
                        data: []
                      });
                    }

                    _context2.next = 18;
                    break;

                  case 17:
                    imageResult.push({
                      image: image.image
                    });

                  case 18:
                    if (element.images.length - 1 === _index) {
                      returnData.push({
                        name: element.name,
                        images: imageResult
                      });
                    }

                  case 19:
                    _index++;
                    _context2.next = 8;
                    break;

                  case 22:
                    _context2.next = 25;
                    break;

                  case 24:
                    returnData.push({
                      name: element.name,
                      image: []
                    });

                  case 25:
                    if (!(datas.length - 1 === index)) {
                      _context2.next = 28;
                      break;
                    }

                    _context2.next = 28;
                    return regeneratorRuntime.awrap(function _callee() {
                      var oldImages, newImages, difference, deleteStatus;
                      return regeneratorRuntime.async(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return regeneratorRuntime.awrap(SpecifyingImages(id));

                            case 2:
                              oldImages = _context.sent;
                              _context.next = 5;
                              return regeneratorRuntime.awrap(SpecifyingNewImages(returnData));

                            case 5:
                              newImages = _context.sent;
                              _context.next = 8;
                              return regeneratorRuntime.awrap(oldImages.filter(function (x) {
                                return !newImages.includes(x);
                              }));

                            case 8:
                              difference = _context.sent;

                              if (!(difference.length !== 0)) {
                                _context.next = 13;
                                break;
                              }

                              _context.next = 12;
                              return regeneratorRuntime.awrap(deleteImages(difference));

                            case 12:
                              deleteStatus = _context.sent;

                            case 13:
                              resolve({
                                status: true,
                                data: returnData
                              });

                            case 14:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    }());

                  case 28:
                    index++;
                    _context2.next = 2;
                    break;

                  case 31:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.fixtureDatasConverter = fixtureDatasConverter;

var SpecifyingImages = function SpecifyingImages(id) {
  return regeneratorRuntime.async(function SpecifyingImages$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee3(resolve, reject) {
            var oldDatas, oldImages, oldFixtureDatas, index, element, _index2, images;

            return regeneratorRuntime.async(function _callee3$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(_db.r.db("hifaKiraTakip").table("realEstates").filter({
                      id: id,
                      visible: true
                    }));

                  case 2:
                    oldDatas = _context4.sent;
                    oldImages = [];

                    if (oldDatas.length !== 0) {
                      oldFixtureDatas = oldDatas[0].fixtureDatas;

                      if (oldFixtureDatas.length !== 0) {
                        for (index = 0; index < oldFixtureDatas.length; index++) {
                          element = oldFixtureDatas[index];

                          if (element.images && element.images.length !== 0) {
                            for (_index2 = 0; _index2 < element.images.length; _index2++) {
                              images = element.images[_index2];
                              oldImages.push(images.image);
                            }
                          }

                          if (oldFixtureDatas.length - 1 === index) {
                            resolve(oldImages);
                          }
                        }
                      } else {
                        resolve([]);
                      }
                    } else {
                      resolve([]);
                    }

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 2:
          return _context5.abrupt("return", _context5.sent);

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var SpecifyingNewImages = function SpecifyingNewImages(newDatas) {
  return regeneratorRuntime.async(function SpecifyingNewImages$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee4(resolve, reject) {
            var newImages, index, element, _index3, images;

            return regeneratorRuntime.async(function _callee4$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    newImages = [];

                    if (newDatas.length !== 0) {
                      for (index = 0; index < newDatas.length; index++) {
                        element = newDatas[index];

                        if (element.images && element.images.length !== 0) {
                          for (_index3 = 0; _index3 < element.images.length; _index3++) {
                            images = element.images[_index3];
                            newImages.push(images.image);
                          }
                        }

                        if (newDatas.length - 1 === index) {
                          resolve(newImages);
                        }
                      }
                    } else {
                      resolve([]);
                    }

                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            });
          }));

        case 2:
          return _context7.abrupt("return", _context7.sent);

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var deleteImages = function deleteImages(deleteFilest) {
  return regeneratorRuntime.async(function deleteImages$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee5(resolve, reject) {
            var index, element, datas;
            return regeneratorRuntime.async(function _callee5$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    for (index = 0; index < deleteFilest.length; index++) {
                      element = deleteFilest[index];
                      console.log(element);
                      datas = deleteImage(element);

                      if (deleteFilest.length - 1 === index) {
                        resolve(true);
                      }
                    }

                  case 1:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          }));

        case 2:
          return _context9.abrupt("return", _context9.sent);

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var deleteImage = function deleteImage(fileName) {
  return regeneratorRuntime.async(function deleteImage$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(new Promise(function _callee6(resolve, reject) {
            var coolPath;
            return regeneratorRuntime.async(function _callee6$(_context10) {
              while (1) {
                switch (_context10.prev = _context10.next) {
                  case 0:
                    coolPath = (0, _path.join)(__dirname + "../../../uploadedFixtureDatasImages/".concat(fileName));

                    if (!(coolPath !== "")) {
                      _context10.next = 5;
                      break;
                    }

                    _context10.next = 4;
                    return regeneratorRuntime.awrap((0, _fs.unlink)(coolPath, function (err) {
                      if (err) resolve(false);else {
                        resolve(true);
                      }
                    }));

                  case 4:
                    return _context10.abrupt("return", _context10.sent);

                  case 5:
                  case "end":
                    return _context10.stop();
                }
              }
            });
          }));

        case 2:
          return _context11.abrupt("return", _context11.sent);

        case 3:
        case "end":
          return _context11.stop();
      }
    }
  });
};