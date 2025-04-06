// import { Link } from 'react-router-dom';
// import './customer.css';

// const Customer = () => {
// 	return (
// 		<div className='container'>
// 			<div className='customer-container'>
// 				<div className='customer-header'>
// 					<input type='text' placeholder='Mijozlarni qidirish...' />
// 					<svg
// 						width='24'
// 						height='24'
// 						viewBox='0 0 24 24'
// 						fill='none'
// 						xmlns='http://www.w3.org/2000/svg'
// 					>
// 						<path
// 							d='M10 18H21M3 18H6M6 18V20M6 18V16M20 12H21M3 12H16M16 12V14M16 12V10M14 6H21M3 6H10M10 6V8M10 6V4'
// 							stroke='#1A1A1A'
// 							stroke-width='2'
// 							stroke-linecap='round'
// 							stroke-linejoin='round'
// 						/>
// 					</svg>
// 				</div>
// 				<div className='customer-content'>
// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>

// 					<div className='customer-info'>
// 						<h2>Rahmatulloh Madraximov</h2>
// 						<a href=''>+998 91 123 45 67</a>
// 						<p>Jami nasiya:</p>
// 						<h4>-800 000 so'm</h4>
// 					</div>
// 				</div>

// 				<Link to='/createcustomer'>
// 					<button className='customer-add-btn'>Yaratish</button>
// 				</Link>
// 			</div>
// 		</div>
// 	);
// };

// export default Customer;

import {
	SearchOutlined,
	SlidersOutlined,
	StarFilled,
	StarOutlined,
	UserAddOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebtor from '../../hooks/useDebtor';
import './customer.css';

const Customers = () => {
	const { debtors } = useDebtor();
	// const [filterVisible, setFilterVisible] = useState(false);
	const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
	// const [setIsModalOpen] = useState(false);

	// const handleAddDebtor = async (debtorData: any) => {
	// 	try {
	// 		await addDebtor(debtorData);
	// 		message.success("Qarzdor muvaffaqiyatli qo'shildi!");

	// 		setIsModalOpen(false);

	// 		refetch();
	// 	} catch (err) {
	// 		message.error("Qarzdorni qo'shishda xatolik yuz berdi.");
	// 	}
	// };

	// const menuItems: MenuProps['items'] = [
	// 	{ key: '1', label: 'Mashhur' },
	// 	{ key: '2', label: 'Yangi mijozlar' },
	// 	{ key: '3', label: 'Faol mijozlar' },
	// 	{ key: '4', label: 'No-faol mijozlar' },
	// ];

	const toggleFavorite = (id: string) => {
		setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
	};
	const navigate = useNavigate();

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
					{Array.isArray(debtors) && debtors.length > 0 ? (
						debtors.map(customer => {
							const totalDebt = customer.debts.reduce(
								(sum, debt) =>
									sum + parseFloat(debt.debt_sum || '0'),
								0
							);
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
											{customer.phone_numbers.length > 0
												? customer.phone_numbers[0]
														.number
												: "Telefon raqami yo'q"}
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
					<button
						className='customers__add'
						// onClick={() => setIsModalOpen(true)}
					>
						<UserAddOutlined />
						Yaratish
					</button>
				</Link>
			</div>
		</section>
	);
};

export default Customers;
