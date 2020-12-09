// Query:
import home from './queries/Home';
import realestateNotificationSettings from './queries/realestateNotificationSettings';
import getProfile from './queries/getProfile';
import getAllTenants from './queries/getAllTenants';
import getTenant from './queries/getTenant';
import getAvailableTenantsForContract from "./queries/getAvailableTenantsForContract";
import getAllRealEstates from './queries/getAllRealEstates';
import getRealEstate from './queries/getRealEstate';
import getAvailableRealEstatesForContract from "./queries/getAvailableRealEstatesForContract";

import contractControl from "./queries/contractControl";

// Mutation:
import updateProfile from './mutations/updateProfile';
import updateProfileImage from "./mutations/updateProfileImage";

import newTenant from './mutations/newTenant';
import updateTenant from './mutations/updateTenant';
import updateTenantImage from "./mutations/updateTenantImage";
import deleteTenant from "./mutations/deleteTenant";

import newRealEstate from './mutations/newRealEstate';
import updateRealEstate from './mutations/updateRealEstate';
import deleteRealEstate from "./mutations/deleteRealEstate";

import newContract from './mutations/newContract';
import deleteContract from './mutations/deleteContract';

import updateRealestateNotificationGQL from './mutations/updateRealestateNotificationGQL';

const resolvers = {
    Query: {
        home,
        getProfile,
        getAllTenants,
        getTenant,
        getAllRealEstates,
        getRealEstate,
        getAvailableTenantsForContract,
        getAvailableRealEstatesForContract,
        contractControl,
        realestateNotificationSettings
    },
    Mutation: {
        updateProfile,
        updateProfileImage,
        newTenant,
        updateTenant,
        updateTenantImage,
        deleteTenant,
        newRealEstate,
        updateRealEstate,
        deleteRealEstate,
        newContract,
        deleteContract,
        updateRealestateNotificationGQL
    }
};
export default resolvers;