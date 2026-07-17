/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // For cookie exchange if needed later
});

// Request interceptor for injection of authorization headers or logs if required later
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for consistent error handling and formatting
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    const formattedError = {
      message,
      status: error.response?.status,
      data: error.response?.data,
    };
    return Promise.reject(formattedError);
  }
);

export default api;
