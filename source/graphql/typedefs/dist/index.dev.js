"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _mutation = _interopRequireDefault(require("./mutation"));

var _query = _interopRequireDefault(require("./query"));

var _Response = _interopRequireDefault(require("./types/Response"));

var _Upload = _interopRequireDefault(require("./types/Upload"));

var _JSON = _interopRequireDefault(require("./types/JSON"));

var _SafeProfile = _interopRequireDefault(require("./types/SafeProfile"));

var _SafeAllTenants = _interopRequireDefault(require("./types/SafeAllTenants"));

var _SafeTenant = _interopRequireDefault(require("./types/SafeTenant"));

var _SafeAllRealEstates = _interopRequireDefault(require("./types/SafeAllRealEstates"));

var _SafeRealEstate = _interopRequireDefault(require("./types/SafeRealEstate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", ",\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

//Contract Datas
var typeDefs = (0, _graphqlTag["default"])(_templateObject(), _Response["default"], _Upload["default"], _JSON["default"], _SafeProfile["default"], _SafeAllTenants["default"], _SafeTenant["default"], _SafeAllRealEstates["default"], _SafeRealEstate["default"], _query["default"], _mutation["default"]);
var _default = typeDefs;
exports["default"] = _default;