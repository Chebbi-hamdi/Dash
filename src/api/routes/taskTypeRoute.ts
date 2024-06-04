import customAxios from "../../hooks/customAxios";


const baseUrl = (route: string) => `/api/v0/${route}`;

export const createSubSub = async (route: string, data: any) => {
  try {
    const response = await customAxios.post(`${baseUrl(route)}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};

export const getAllSubSubTask = async (route: string) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/`);
    console.log('responseSubSubTask---------',response);
    return response.data;
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};

export const createSub = async (route: string, data: any) => {
  try {
    const response = await customAxios.post(`${baseUrl(route)}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
};
export const createTask = async (route: string, data: any) => {
  try {
    const response = await customAxios.post(`${baseUrl(route)}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error;
  }
}

export const getAllSubTask = async (route: string) => {
  try {
    const response = await customAxios.get(`${baseUrl(route)}/`);
    console.log('responseSubTask---------',response);
    return response.data;
  } catch (error) {
    console.error('Error getting resources:', error);
    throw error;
  }
};


export const uploadFile = async (route: string, data: File) => {
    try{
        const formData = new FormData();
        formData.append('image', data);
        const response = await customAxios.post(`${baseUrl(route)}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log('imagepath------',response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;

    }
}