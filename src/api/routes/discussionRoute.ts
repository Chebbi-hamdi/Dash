import customAxios from "../../hooks/customAxios";

const baseUrl = (route: string) => `/api/v0/${route}`;

export const getParticipants = async (route: string, id: string) => {
    try {
      const response = await customAxios.get(`${baseUrl(route)}/get/${id}`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error('Error getting resource by ID:', error);
      throw error;
    }
  }
  export const getDiscussion = async (route: string, id: string) => {
    try {
      const response = await customAxios.get(`${baseUrl(route)}/disc/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting resource by ID:', error);
      throw error;
    }
  }

export const getAll = async (route: string) => {
    try {
        const response = await customAxios.get(`${baseUrl(route)}`);
        return response.data;
    } catch (error) {
        console.error('Error getting resources:', error);
        throw error;
    }
};