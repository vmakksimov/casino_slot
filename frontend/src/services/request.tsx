import axios from 'axios';

export const request = async (baseURL: string, url: string, method: string, data: any) => {
    try {
        

        const headers: any = {};
        
        const csrfTokenCookie = document.cookie.split('; ').find(row => row.startsWith('csrf-token='));
        if (csrfTokenCookie) {
            const csrfToken = csrfTokenCookie.split('=')[1];
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }
        }

        const options = {
            baseURL,
            url,
            method,
            headers,
            data,
            withCredentials: true, 
        };

        if (method !== 'GET') {
            options.headers['Content-Type'] = 'application/json';
            options.data = JSON.stringify(data);
        }

        const response = await axios(options);

        return response.data;
    } catch (error) {
        console.log("error in catch request.js", error)
    }
};

export const get = (baseURL: string, url: string, data: any) => request(baseURL, url, 'GET', data);
export const post = (baseURL: string, url: string, data: any) => request(baseURL, url, 'POST', data);
export const put = (baseURL: string, url: string, data: any) => request(baseURL, url, 'PUT', data);
export const del = (baseURL: string, url: string, data: any) => request(baseURL, url, 'DELETE', data);