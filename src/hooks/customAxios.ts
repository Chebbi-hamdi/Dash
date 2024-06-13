import axios from "axios";


const customAxios = axios.create({
// baseURL: "http://localhost:3000",
baseURL: "http://192.168.11.113:3000",
});


customAxios.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      console.log('Token:', token);
      //decode token
      if (token !== null) {
        config.headers.authorization = `bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
export default customAxios;
 



/********** */




