import {
	SearchOutlined,
	SlidersOutlined,
	StarFilled,
	StarOutlined,
	UserAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDebtor from '../../hooks/useDebtor';
import { useCustomerStore } from './CustomerStore';
import './customer.css';

interface PhoneNumber {
	number: string;
}

interface Debt {
	debt_sum?: string;
}

interface BaseCustomer {
	id: string;
	full_name: string;
	phone_numbers: PhoneNumber[];
}

interface Debtor extends BaseCustomer {
	debts: Debt[];
}

interface Customer extends BaseCustomer {
	// no debts in manually created customer
}

type CustomerType = Debtor | Customer;

const Customers = () => {
	const { debtors } = useDebtor();
	const createdCustomers = useCustomerStore(state => state.customers);
	const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
	const navigate = useNavigate();

	const allCustomers: CustomerType[] = [...createdCustomers, ...(debtors || [])];

	const toggleFavorite = (id: string) => {
		setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<section className='customers'>
			<div className='customer-container'>
				<div className='customers__search'>
					<form className='customers__search-form'>
						<input type='text' placeholder='Mijozlarni qidirish...' />
						<SearchOutlined className='customers__search-icon' />
					</form>
					<button className='customers__search-btn'>
						<SlidersOutlined className='customers__search-btn__icon' />
					</button>
				</div>

				<div className='customers__list'>
					{allCustomers.length > 0 ? (
						allCustomers.map(customer => {
							const isDebtor = 'debts' in customer;
							const totalDebt = isDebtor
								? (customer as Debtor).debts.reduce(
										(sum: number, debt: Debt) =>
											sum +
											parseFloat(debt.debt_sum || '0'),
										0
								  )
								: 0;

							return (
								<div
									key={customer.id}
									className='customers__item'
									onClick={() =>
										navigate(`/customer/${customer.id}`)
									}
								>
									<div className='customers__info'>
										<h3 className='customers__name'>
											{customer.full_name}
										</h3>
										<p className='customers__phone'>
											{customer.phone_numbers?.[0]
												?.number ||
												"Telefon raqami yo'q"}
										</p>
										<p className='customers__debt-label'>
											Jami nasiya:
										</p>
										<p
											className={`customers__debt ${
												totalDebt < 0
													? 'negative'
													: 'positive'
											}`}
										>
											{totalDebt.toLocaleString()} so'm
										</p>
									</div>
									<div
										className='customers__favorite'
										onClick={e => {
											e.stopPropagation();
											toggleFavorite(customer.id);
										}}
									>
										{favorites[customer.id] ? (
											<StarFilled className='star-icon active' />
										) : (
											<StarOutlined className='star-icon' />
										)}
									</div>
								</div>
							);
						})
					) : (
						<p>Hech qanday mijoz topilmadi.</p>
					)}
				</div>

				<Link to='/createcustomer'>
					<button className='customers__add'>
						<UserAddOutlined /> Yaratish
					</button>
				</Link>
			</div>
		</section>
	);
};

export default Customers;
