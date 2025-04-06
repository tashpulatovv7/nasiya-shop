import { create } from 'zustand';

interface Customer {
	id: string;
	full_name: string;
	phone_numbers: { number: string }[];
	address: string;
	note: string;
	images: File[];
}

interface CustomerStore {
	customers: Customer[];
	addCustomer: (customer: Customer) => void;
}

export const useCustomerStore = create<CustomerStore>(set => ({
	customers: [],
	addCustomer: customer =>
		set(state => ({
			customers: [...state.customers, customer],
		})),
}));
