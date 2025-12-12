import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import type { Bus } from '../../types';


export const useBuses = () => {
const [buses, setBuses] = useState<Bus[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);


const fetchBuses = async () => {
try {
setLoading(true);
const response = await apiClient.get('/buses');
setBuses(response.data);
setError(null);
} catch (err: any) {
setError(err.response?.data?.error || 'Ошибка загрузки автобусов');
} finally {
setLoading(false);
}
};


const createBus = async (busData: Omit<Bus, 'id'>) => {
const response = await apiClient.post('/buses', busData);
await fetchBuses();
return response;
};


const updateBus = async (id: number, busData: Partial<Bus>) => {
const response = await apiClient.put(`/buses/${id}`, busData);
await fetchBuses();
return response;
};


const deleteBus = async (id: number) => {
await apiClient.delete(`/buses/${id}`);
await fetchBuses();
};


useEffect(() => {
fetchBuses();
}, []);


return {
buses,
loading,
error,
fetchBuses,
createBus,
updateBus,
deleteBus
};
};
