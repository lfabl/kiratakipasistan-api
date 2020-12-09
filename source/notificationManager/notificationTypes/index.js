export const types = {
    test: async (e) => {
        const { objectID, title, message } = e;
        return {
            title: title ? title : 'Kira Takip Asistan - Yeni Bildirim',
            message: message,
            sentAt: new Date().toISOString(),
            objectID: objectID
        };
    }
};