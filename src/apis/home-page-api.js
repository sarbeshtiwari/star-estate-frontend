import axios from 'axios';

const API_BASE_URL = `https://ecis.in/apis/star-estate-API`;

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categories/getCategories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchCities = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/city/getCities`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw error;
    }
};

export const fetchProjects = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/addProjects/getProjectByType/${id}`);
        return response.data;
    } catch (err) {
        console.error('Unexpected error:', err);
        throw err;
    }
};