"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var SafeRealEstate = "\n    type SafeRealEstate {\n        data: RealEstate,\n        response: Response\n    }\n    type RealEstate {\n        type: String,\n        usageType: String,\n        title: String,\n        adress: String,\n        fixtureDatas: [FixtureDatas],\n        rentalType: [RentalTypes],\n        electricity: String,\n        water: String,\n        naturalGas: String,\n        TCIPNo: String,\n        ownerNameSurname: String,\n        ownerManagerPhoneNumber: String,\n        ownerTcIdentity: String,\n        ownerIban: String,\n        detailDues: String,\n        detailManagerPhoneNumber: String,\n        detailAdditionalInformation: String,\n        numberOfRoom: String,\n        purposeOfUsage: String,\n        detailRent: String,\n        registerDate: String,\n        paymentPeriod: PaymentPeriodType,\n        deposit: String\n    }\n    type FixtureDatas {\n        name: String,\n        images: [fixtureDatasImage]\n    }\n    type fixtureDatasImage {\n        image: String,\n        imageBase64: String\n    }\n    type PaymentPeriodType {\n        type: String,\n        date: String\n    }\n    type RentalTypes {\n        status: String,\n    }\n    \n";
var _default = SafeRealEstate;
exports["default"] = _default;