import axiosInstance from "./axiosInstance";

const axiosService = async (httpMethod, url, body) => {
  try {
    const response = await axiosInstance({
      method: httpMethod,
      url,
      data: body,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export default axiosService;
