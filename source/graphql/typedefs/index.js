import gql from 'graphql-tag';

// Mutation Type:
import mutation from './mutation';

// Query Type:
import query from './query';
import Home from './types/Home';

// Other Types:
import Response from './types/Response';
import Upload from "./types/Upload";
import JSON from "./types/JSON";

//Profile Types
import SafeProfile from "./types/SafeProfile";
//Tenant Types
import SafeAllTenants from './types/SafeAllTenants';
import SafeTenant from './types/SafeTenant';
//Real Estate Types
import SafeAllRealEstates from "./types/SafeAllRealEstates";
import SafeRealEstate from "./types/SafeRealEstate"
//Contract Datas

const typeDefs = gql`
    ${Home},
    ${Response},
    ${Upload},
    ${JSON},
    ${SafeProfile},
    ${SafeAllTenants},
    ${SafeTenant},
    ${SafeAllRealEstates},
    ${SafeRealEstate},
    ${query},
    ${mutation}
`;

export default typeDefs;