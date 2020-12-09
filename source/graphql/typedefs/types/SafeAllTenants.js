const SafeAllTenants = `
    type SafeAllTenants {
        data: [AllTenants],
        response: Response
    }
    type AllTenants {
        id: String,
        fullName: String,
        phoneNumber1: String,
        activeApartment: [ActiveApartment],
        suretyFullName: String,
        suretyPhoneNumber: String,
        profileImageName: String
    }
`;
export default SafeAllTenants;