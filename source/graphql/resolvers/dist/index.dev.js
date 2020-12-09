"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _test = _interopRequireDefault(require("./queries/test"));

var _getProfile = _interopRequireDefault(require("./queries/getProfile"));

var _getAllTenants = _interopRequireDefault(require("./queries/getAllTenants"));

var _getTenant = _interopRequireDefault(require("./queries/getTenant"));

var _getAvailableTenantsForContract = _interopRequireDefault(require("./queries/getAvailableTenantsForContract"));

var _getAllRealEstates = _interopRequireDefault(require("./queries/getAllRealEstates"));

var _getRealEstate = _interopRequireDefault(require("./queries/getRealEstate"));

var _getAvailableRealEstatesForContract = _interopRequireDefault(require("./queries/getAvailableRealEstatesForContract"));

var _contractControl = _interopRequireDefault(require("./queries/contractControl"));

var _updateProfile = _interopRequireDefault(require("./mutations/updateProfile"));

var _updateProfileImage = _interopRequireDefault(require("./mutations/updateProfileImage"));

var _newTenant = _interopRequireDefault(require("./mutations/newTenant"));

var _updateTenant = _interopRequireDefault(require("./mutations/updateTenant"));

var _updateTenantImage = _interopRequireDefault(require("./mutations/updateTenantImage"));

var _deleteTenant = _interopRequireDefault(require("./mutations/deleteTenant"));

var _newRealEstate = _interopRequireDefault(require("./mutations/newRealEstate"));

var _updateRealEstate = _interopRequireDefault(require("./mutations/updateRealEstate"));

var _deleteRealEstate = _interopRequireDefault(require("./mutations/deleteRealEstate"));

var _newContract = _interopRequireDefault(require("./mutations/newContract"));

var _deleteContract = _interopRequireDefault(require("./mutations/deleteContract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Query:
//Profile Query:
//Tenants Query:
//RealEstate Query
// Mutation:
var resolvers = {
  Query: {
    test: _test["default"],
    getProfile: _getProfile["default"],
    getAllTenants: _getAllTenants["default"],
    getTenant: _getTenant["default"],
    getAllRealEstates: _getAllRealEstates["default"],
    getRealEstate: _getRealEstate["default"],
    getAvailableTenantsForContract: _getAvailableTenantsForContract["default"],
    getAvailableRealEstatesForContract: _getAvailableRealEstatesForContract["default"],
    contractControl: _contractControl["default"]
  },
  Mutation: {
    updateProfile: _updateProfile["default"],
    updateProfileImage: _updateProfileImage["default"],
    newTenant: _newTenant["default"],
    updateTenant: _updateTenant["default"],
    updateTenantImage: _updateTenantImage["default"],
    deleteTenant: _deleteTenant["default"],
    newRealEstate: _newRealEstate["default"],
    updateRealEstate: _updateRealEstate["default"],
    deleteRealEstate: _deleteRealEstate["default"],
    newContract: _newContract["default"],
    deleteContract: _deleteContract["default"]
  }
};
var _default = resolvers;
exports["default"] = _default;