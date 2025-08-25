const baseURL = import.meta.env.VITE_BACKEND_URL;

export const summaryAPI = {
  loginAPI: {
    url: "control/login",
  },
  authAPI: {
    url: "control/auth",
  },
  logoutAPI: {
    url: "control/logout",
  },
  paginationData: {
    url: "control/data",
  },
  downloadCSV: {
    url: "control/download-csv",
  },
  getTotalCount: {
    url: "control",
  },
};

export default baseURL;
