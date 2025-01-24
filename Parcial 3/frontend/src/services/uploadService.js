import axios from 'axios';
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Uploads a file to the Cloudinary microservice and returns the uploaded image URL.
 * 
 * @param {File} file - The file to be uploaded.
 * @returns {Promise<string>} - The Cloudinary image URL.
 * @throws {Error} - Throws an error if the upload fails.
 */
export async function uploadFileToCloudinary(file) {
  if (!file) {
    throw new Error('No file provided for upload');
  }

  const formData = new FormData();
  formData.append('foto', file);

  try {
    const response = await axios.post(`${VITE_API_BASE_URL}/api/cloudinary/subirFoto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the response contains the image URL in `data.imageUrl`
    if (response.data && response.data.imageUrl) {
      return response.data.imageUrl;
    } else {
      throw new Error('Unexpected response format: Missing `imageUrl`');
    }
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}



export const getUserMarkers = async (email) => {
  const response = await axios.get(`${VITE_API_BASE_URL}/api/markers/user-markers`, { params: { email } });
  return response.data;
};

export const addMarker = async (markerData) => {
  const response = await axios.post(`${VITE_API_BASE_URL}/api/markers/add-marker`, markerData);
  return response.data;
};



export const logVisit = async (visitData) => {
  try {
    const response = await axios.post(`${VITE_API_BASE_URL}/api/visits`, visitData);
    return response.data;
  } catch (error) {
    console.error('Error logging visit:', error);
    throw error;
  }
};

export const getVisits = async (email) => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}/api/visits`, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching visits:', error);
    throw error;
  }
};
