import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export const fetchCompanies = (limit = 25, offset = 0) =>
  axios.get(`${API_BASE}/companies`, { params: { limit, offset } });

export const createCompany = (data) => axios.post(`${API_BASE}/companies`, data);
export const updateCompany = (id, data) => axios.put(`${API_BASE}/companies/${id}`, data);
export const deleteCompany = (id) => axios.delete(`${API_BASE}/companies/${id}`);

export const fetchEmployeesByCompany = (companyId) =>
  axios.get(`${API_BASE}/employees`, { params: { companyId } });

export const createEmployee = (data) => axios.post(`${API_BASE}/employees`, data);
export const updateEmployee = (id, data) => axios.put(`${API_BASE}/employees/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/employees/${id}`);
