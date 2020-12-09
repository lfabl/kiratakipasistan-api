"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var SafeAllRealEstates = "\n    type SafeAllRealEstates {\n        data: [AllRealEstates],\n        response: Response\n    }\n\n    type AllRealEstates {\n        id: String,\n        title: String,\n        type: String,\n        rentalType: [RentalTypes],\n        paymentPeriod: PaymentPeriodType,\n        ownerManagerPhoneNumber: String,\n        ownerNameSurname: String,\n        activeTenant: [ActiveTenant],\n        detailRent: Int\n    }\n\n    type ActiveTenant {\n        fullName: String,\n    }\n";
var _default = SafeAllRealEstates;
exports["default"] = _default;