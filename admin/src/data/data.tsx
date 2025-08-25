import axios from "axios";
import baseURL, { summaryAPI } from "../api/summaryAPI";
import type { APIResponse, paginationData, totalCount } from "../types/types";

export const getTotalItems = async () => {
  try {
    const response = await axios.get<APIResponse<totalCount>>(
      `${baseURL}/${summaryAPI.getTotalCount.url}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      return response.data.output?.totalCount as number;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch data from server."
      );
    }
  } catch (error) {
    throw error;
  }
};

export const getPaginatedData = async (page_num: number, page_size: number) => {
  try {
    const response = await axios.get<APIResponse<paginationData>>(
      `${baseURL}/${summaryAPI.paginationData.url}?page_num=${page_num}&page_size=${page_size}`,
      { withCredentials: true }
    );
    if (response.data.success) {
      return response.data.output;
    } else {
      throw new Error(
        response.data.message || "Failed to fetch data from server."
      );
    }
  } catch (error) {
    throw error;
  }
};

export const convertDate = (date: Date) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
};

export const convertStringDate = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
};

export const downloadCSV = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/${summaryAPI.downloadCSV.url}`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "client_data.csv");

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    throw error;
  }
};

export const downloadJSON = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/${summaryAPI.downloadCSV.url}`,
      {
        withCredentials: true,
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "client_data.csv");

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    throw error;
  }
};