import React from 'react';
import axiosInstance from '../views/utils/axiosInstance';

// Fetch project location advantages
export const getProjectLocationAdvantages = async (projectname) => {
    try {
        const response = await axiosInstance.get(`projectLocationAdvantages/getprojectLocationAdvantages/${projectname}`);
        return response;
    } catch (error) {
        console.error('Error fetching project location advantages:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all location advantages
export const getLocationAdvantages = async () => {
    try {
        const response = await axiosInstance.get(`/locationAdvantages/getLocationAdvantages`);
        return response;
    } catch (error) {
        console.error('Error fetching all location advantages:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch all amenities
export const getAllTheAmenities = async () => {
    try {
        const response = await axiosInstance.get('subAmenities/getAllTheAmenities');
        return response;
    } catch (error) {
        console.error('Error fetching all amenities:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Fetch project amenities
export const getProjectAmenities = async (projectname) => {
    try {
        const response = await axiosInstance.get(`projectAmenities/getprojectAmenities/${projectname}`);
        return response;
    } catch (error) {
        console.error('Error fetching project amenities:', error.response ? error.response.data : error.message);
        throw error;
    }
};
