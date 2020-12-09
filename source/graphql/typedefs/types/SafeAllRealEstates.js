const SafeAllRealEstates = `
    type SafeAllRealEstates {
        data: [AllRealEstates],
        response: Response
    }

    type AllRealEstates {
        id: String,
        title: String,
        type: String,
        rentalType: [RentalTypes],
        paymentPeriod: PaymentPeriodType,
        ownerManagerPhoneNumber: String,
        ownerNameSurname: String,
        activeTenant: [ActiveTenant],
        detailRent: Int
    }

    type ActiveTenant {
        fullName: String,
    }
`;
export default SafeAllRealEstates;