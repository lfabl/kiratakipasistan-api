const Home = `
    type Home {
        message: String,
        code: Int,
        approaching: [RealEstate],
        pastEstateData: [RealEstate],
        totalEstatesCount: Int,
        totalActiveEstateCount: Int,
        totalPassiveEstateCount: Int,
        totalTenantCount: Int
    }
`;
export default Home;