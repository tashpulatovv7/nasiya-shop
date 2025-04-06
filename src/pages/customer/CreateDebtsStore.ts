export interface CreateDebtParams {
	customer_id: string;
	full_name: string;
	created_at: string;
	total_month: number;
	debt_period: string;
	debt_sum: number;
	total_debt_sum: number;
	note?: string;
	images?: File[];
	next_payment_date: string;
	debt_status: 'active' | 'closed';
}

export const createDebt = async (data: CreateDebtParams) => {
	const formData = new FormData();

	Object.entries(data).forEach(([key, value]) => {
		if (key === 'images' && Array.isArray(value)) {
			value.forEach(file => formData.append('images', file));
		} else {
			formData.append(key, String(value));
		}
	});

	const res = await fetch(`/api/debts`, {
		method: 'POST',
		body: formData,
	});

	if (!res.ok) throw new Error('Server error');

	return await res.json();
};
