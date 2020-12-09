const SafeProfile = `
    type SafeProfile {
        data: SafeProfileSchema,
        response: Response
    }
    type SafeProfileSchema {
        id: String,
        fullName: String,
        userName: String,
        mail: String,
        profileImageName: String,
        registerDate: String
    }
`;
export default SafeProfile;