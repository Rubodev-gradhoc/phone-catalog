import api from '@/app/lib/axios.instance';
import { Phone, PhoneDetail } from '@/app/lib/definitons';

const LIMIT_PER_PAGE = 20;

export const getPhones = async (searchValue: string): Promise<Phone[]> => {
    try {
        const response = await api.get('/products', {
            params: {
                search: searchValue,
                limit: LIMIT_PER_PAGE,
            },
        });

        return response.data;
    } catch (error) {
        return [];
    }
};

export const getPhoneById = async (id): Promise<PhoneDetail | null> => {
    try {
        const response = await api.get(`/products/${id}`);

        if (response.status === 404) {
            return null;
        }
        return response.data;
    } catch (error) {
        return null;
    }
};
