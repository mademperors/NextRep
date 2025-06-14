const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (url: string, options: RequestInit) => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`, { cause: response });
  }

  return response;
};

export default apiFetch;

