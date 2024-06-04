import customAxios from "../../hooks/customAxios";


const baseUrl = (route: string) => `/api/v0/${route}`;

export const create = async (route: string, data: any) => {
  try {
    const response = await customAxios.post(`${baseUrl(route)}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};
export const assignTask = async (route: string, data: any) => {
    try {
      console.log('data assigned',data);
const taskId = data.taskId;
const userId = data.userId;
        const response = await customAxios.put(`${baseUrl(route)}/AddTeammate/${taskId}/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error creating resource:', error);
        throw error;
    }
}

export const getAll = async (route: string,currentPage:number, itemsPerPage:number) => {
    try {
        console.log('itemsPerPage',itemsPerPage);
        const response = await customAxios.get(`${baseUrl(route)}/${currentPage}/${itemsPerPage}`);
        console.log('response',response);
        return response.data;
    } catch (error) {
        console.error('Error getting resources:', error);
        throw error;
    }
}

export const getById = async (route: string, id: string) => {
    try {
        const response = await customAxios.get(`${baseUrl(route)}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting resource by ID:', error);
        throw error;
    }
}

export const  deleteById = async (route: string, id: string) => {
    try {
        const response = await customAxios.delete(`${baseUrl(route)}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting resource by ID:', error);
        throw error;
    }
}