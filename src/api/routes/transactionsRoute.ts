import customAxios from "../../hooks/customAxios";

const baseUrl = (route: string) => `/api/v0/${route}`;

export const getAll = async (route: string) => {
    try {
        const response = await customAxios.get(`${baseUrl(route)}`);
        return response.data;
    } catch (error) {
        console.error('Error getting resources:', error);
        throw error;
    }
}

export const getTransaction = async (route: string, id: string) => {
    try {
        const response = await customAxios.get(`${baseUrl(route)}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting resource by ID:', error);
        throw error;
    }
}
    export const updateTransaction = async (route: string, id: string, data: any) => {
        try {
            const response = await customAxios.put(`${baseUrl(route)}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating resource:', error);
            throw error;
        }
    }