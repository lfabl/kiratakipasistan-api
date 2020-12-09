const SafeTenant = `
    type SafeTenant {
        data: Tenant,
        response: Response
    }
    type Tenant {
        id: String,
        fullName: String,
        tcIdentity: String,
        phoneNumber1: String,
        phoneNumber2: String,
        tenantAdress: String,
        activeApartment: [ActiveApartment],
        suretyFullName: String,
        suretyTcIdentity: String,
        suretyPhoneNumber: String,
        suretyAdress: String,
        profileImageName: String,
        registerDate: String,
    }
    type ActiveApartment {
        id: String,
        title: String
    }
`;
export default SafeTenant;