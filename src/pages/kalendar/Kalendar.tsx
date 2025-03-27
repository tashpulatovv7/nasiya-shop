import { useState } from 'react';
import { Link } from 'react-router-dom';
import './kalendar.css';

interface Payment {
	name: string;
	amount: string;
}

const Kalendar = () => {
	const [currentMonth, setCurrentMonth] = useState(9);
	const [currentYear, setCurrentYear] = useState(2024);
	const [selectedDate, setSelectedDate] = useState(1);

	const monthNames = [
		'Yanvar',
		'Fevral',
		'Mart',
		'Aprel',
		'May',
		'Iyun',
		'Iyul',
		'Avgust',
		'Sentabr',
		'Oktabr',
		'Noyabr',
		'Dekabr',
	];

	const weekDays = ['DU', 'SE', 'CH', 'PA', 'JU', 'SH', 'YA'];

	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
	// const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

	const payments: Payment[] = [
		{ name: 'Avazbek Jahongirov', amount: 'UZS 1 000 000' },
		{ name: 'Otabek Sulaymonov', amount: 'UZS 1 000 000' },
	];

	const handlePrevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11);
			setCurrentYear(currentYear - 1);
		} else {
			setCurrentMonth(currentMonth - 1);
		}
	};

	const handleNextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0);
			setCurrentYear(currentYear + 1);
		} else {
			setCurrentMonth(currentMonth + 1);
		}
	};

	const renderCalendarDays = () => {
		const days = [];
		const totalDays = daysInMonth;

		for (let i = 1; i <= totalDays; i++) {
			const isSelected = i === selectedDate;
			const hasPayment = [1, 8, 15, 22, 29].includes(i);
			days.push(
				<div
					key={i}
					className={`calendar-day ${isSelected ? 'selected' : ''}`}
					onClick={() => setSelectedDate(i)}
				>
					{i}
					{hasPayment && <div className='payment-indicator'></div>}
				</div>
			);
		}
		return days;
	};

	return (
		<div className='container'>
			<div className='calendar-container'>
				<div className='calendar-header'>
					<Link to={'/home'}>
						<button className='back-button'>←</button>
					</Link>
					<h1>Kalendar</h1>
				</div>

				<div className='month-header'>
					<h2>
						{monthNames[currentMonth]}, {currentYear}
					</h2>
					<div className='total-amount'>
						<span>Oylik jami:</span>
						<span className='amount'>50 125 000 so'm</span>
					</div>
				</div>

				<div className='calendar-navigation'>
					<button className='nav-button' onClick={handlePrevMonth}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
							<path
								d='M15 18L9 12L15 6'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<button className='nav-button' onClick={handleNextMonth}>
						<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
							<path
								d='M9 6L15 12L9 18'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>

				<div className='calendar-grid'>
					{weekDays.map(day => (
						<div key={day} className='weekday'>
							{day}
						</div>
					))}
					{renderCalendarDays()}
				</div>

				{selectedDate === 1 && (
					<div className='payments-section'>
						<h3>{selectedDate} Oktabr kuni to'lov kutilmoqda</h3>
						{payments.map((payment, index) => (
							<div key={index} className='payment-card'>
								<h4>{payment.name}</h4>
								<p>{payment.amount}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Kalendar;
