const mutation = `
    type Mutation {
        updateProfile(
            oldPassword: String,
            newPassword: String,
            profileImage: Upload,
            deleteProfileImage: Boolean
        ): Response
        
        updateProfileImage(
            profileImage: Upload,
            deleteProfileImage: Boolean
        ): Response

        newTenant(
            fullName: String!,
            tcIdentity: String!
            phoneNumber1: String!,
            phoneNumber2: String,
            tenantAdress: String,
            profileImageName: String,
            suretyFullName: String,
            suretyTcIdentity: String,
            suretyPhoneNumber: String,
            suretyAdress: String,
        ): Response

              
        updateTenant(
            tenantID: String!
            fullName: String!,
            tcIdentity: String!
            phoneNumber1: String!,
            phoneNumber2: String,
            tenantAdress: String,
            profileImageName: String,
            suretyFullName: String,
            suretyTcIdentity: String,
            suretyPhoneNumber: String,
            suretyAdress: String,
            profileImage: Upload,
            deleteProfileImage: Boolean,
        ): Response

        updateTenantImage(
            tenantID: String!,
            profileImage: Upload,
            deleteProfileImage: Boolean
        ): Response

        deleteTenant(
            tenantID: String!
        ): Response

        updateRealestateNotificationGQL(
            id: String!,
            openNotifications: Boolean!
        ): RealEstateResponse

        newRealEstate(
            type: String!
            usageType: String,
            title: String!,
            adress: String!,
            fixtureDatas: [fixtureDatasInput],
            electricity: String,
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
            paymentPeriod: PaymentPeriod,
            deposit: String
        ): Response

        updateRealEstate(
            realEstateID: String!,
            type: String!
            usageType: String,
            title: String!,
            adress: String!,
            fixtureDatas: [fixtureDatasInput],
            rentalType: String!,
            electricity: String,
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
            paymentPeriod: PaymentPeriod,
            deposit: String
        ): Response
        
        deleteRealEstate(
            realEstateID: String!
        ): Response

        newContract (
            tenantID: String!,
            realEstateID: String!,
            rentalDate: String!,
            contractPeriod: String!,
            rentalPrice: String!,
            paymentType: String!,
            paymentPeriod: PaymentPeriod!
        ) : Response

        deleteContract (
            tenantID: String,
            realEstateID: String
        ) : Response
        
    }
    input fixtureDatasInput {
        name: String!,
        images: [fixtureDatasImages]
    }
    input fixtureDatasImages {
        newImage: Upload,
        image: String
    }
    input PaymentPeriod {
        type: String!,
        date: String!
    }
    
`;
export default mutation;