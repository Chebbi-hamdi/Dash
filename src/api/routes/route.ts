
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


export const getAll = async (route: string,currentPage:number, itemsPerPage:number) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/get/${currentPage}/${itemsPerPage}`);
    return response.data;
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};

export const getAllUsers = async (route: string) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/all`);
    return response.data;
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};

export const getAllAdmins = async (route: string) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/`);
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
};
export const getByToken = async (route: string) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/getUserByToken`);
    return response.data;
      
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};



export const update = async (route: string, id: string, data: any) => {
  try {
    const response = await customAxios.put(`${baseUrl(route)}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating resource:', error);
    throw error;
  }
}

export const del = async (route: string, id: string) => {
  try {
    const response = await customAxios.delete(`${baseUrl(route)}/del/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting resource:', error);
    throw error;
  }
};
