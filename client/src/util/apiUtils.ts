const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    responseData?: any;
    status?: number;
}

export async function executeApiRequest(path: string, body?: object): Promise<any> {

	const token = localStorage.getItem('token');

    const url = `${API_URL}/${path}`;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method: 'POST',
        headers: headers,
        body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);
    let data;
    try {
        data = await response.json();
    } catch (error) {
        if (!response.ok) {
            const err = new ApiError(response.statusText || 'Network response was not ok and no JSON body');
            err.status = response.status;
            throw err;
        }
        return null; 
    }

    if (!response.ok) {
        const error = new ApiError(data?.error || 'API request failed');
        error.responseData = data;
        error.status = response.status;
        if (response.status !== 500) throw error;
        else throw new Error(data?.error || 'Error sending request. Please try again.');
    }

    return data;
}
