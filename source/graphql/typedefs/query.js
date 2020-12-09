const query = `
    type Query {
        home: Home,
        getProfile: SafeProfile,
        getAllTenants: SafeAllTenants,
        getTenant( tenantID: String! ): SafeTenant,
        getAvailableTenantsForContract: SafeAllTenants
        getAllRealEstates: SafeAllRealEstates,
        getRealEstate(realEstateID: String!): SafeRealEstate,
        getAvailableRealEstatesForContract: SafeAllRealEstates
        contractControl(tenantID: String, realEstateID: String): Response
        realestateNotificationSettings(
            id: String!
        ): RealEstateResponse
    }
`;
export default query;