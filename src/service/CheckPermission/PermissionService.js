import { getPermission } from "../api";


const PermissionService = {
    getPermissions: async () => {
        try {
            const response = await getPermission(); // Điều chỉnh endpoint theo API của bạn
            return response.data.result;
        } catch (error) {
            console.error('Error fetching permissions:', error);
            throw error;
        }
    },
};

export default PermissionService;