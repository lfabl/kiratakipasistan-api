const SafeRealEstate = `
    type RealEstateResponse {
        message: String,
        code: Int,
        data: RealEstate
    }
    type SafeRealEstate {
        data: RealEstate,
        response: Response
    }
    type RealEstate {
        id: String,
        type: String,
        usageType: String,
        title: String,
        adress: String,
        fixtureDatas: [FixtureDatas],
        rentalType: [RentalTypes],
        electricity: String,
        openNotifications: Boolean,
        water: String,
        naturalGas: String,
        TCIPNo: String,
        ownerNameSurname: String,
        ownerManagerPhoneNumber: String,
        ownerTcIdentity: String,
        ownerIban: String,
        detailDues: String,
        detailManagerPhoneNumber: String,
        detailAdditionalInformation: String,
        numberOfRoom: String,
        purposeOfUsage: String,
        detailRent: String,
        registerDate: String,
        paymentPeriod: PaymentPeriodType,
        deposit: String,
        contract: Contract
    }
    type FixtureDatas {
        name: String,
        images: [fixtureDatasImage]
    }
    type fixtureDatasImage {
        image: String,
        imageBase64: String
    }
    type PaymentPeriodType {
        type: String,
        date: String
    }
    type RentalTypes {
        status: String,
    }
    type Contract {
        contractDate: String,
        contractPeriod: String,
        id: String,
        paymentPeriod: ContractPeriod,
        paymentType: String,
        realEstateID: String,
        rentalDate: String,
        rentalPrice: String,
        status: String,
        tenantID: String,
        userID: String
    }
    type ContractPeriod {
        date: String,
        type: String
    }
`;
export default SafeRealEstate;