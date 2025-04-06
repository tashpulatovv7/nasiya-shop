import { CalendarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createDebt } from './CreateDebts';
import './debts.css';

const CreateDebts = () => {
	const [name, setName] = useState('');
	const [date, setDate] = useState('');
	const [isToday, setIsToday] = useState(false);
	const [period, setPeriod] = useState('');
	const [note, setNote] = useState('');
	const [images, setImages] = useState<File[]>([]);
	const [debtSum, setDebtSum] = useState<number>(0);
	const [totalMonth, setTotalMonth] = useState<number>(1);

	const navigate = useNavigate();
	const { id } = useParams();

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setImages(prev => [...prev, ...files]);
	};

	const handleTodayToggle = () => {
		if (!isToday) {
			const today = new Date();
			const formatted = today.toISOString().split('T')[0];
			setDate(formatted);
		}
		setIsToday(!isToday);
	};

	const handleSubmit = async () => {
		if (!name || !date || !period || !debtSum || !totalMonth) return;

		const debtData = {
			customer_id: id!,
			full_name: name,
			created_at: date,
			total_month: totalMonth,
			debt_period: period,
			debt_sum: debtSum,
			total_debt_sum: debtSum,
			note,
			images,
			next_payment_date: date,
			debt_status: 'active' as const,
		};

		try {
			await createDebt(debtData);
			navigate(`/customer/${id}`);
		} catch (error) {
			console.error('Debt creation failed', error);
		}
	};

	return (
		<div className='nasiya-container'>
			<h2 className='nasiya-title'>Nasiya yaratish</h2>

			<div className='form-group'>
				<label>Ismi *</label>
				<input
					className='input'
					type='text'
					value={name}
					placeholder='Ismni kiriting'
					onChange={e => setName(e.target.value)}
				/>
			</div>

			<div className='form-group'>
				<label>Sana</label>
				<div className='date-row'>
					<input
						className='input'
						type='date'
						value={date}
						onChange={e => setDate(e.target.value)}
					/>
					<CalendarOutlined className='calendar-icon' />
					<label className='checkbox'>
						<input
							type='checkbox'
							checked={isToday}
							onChange={handleTodayToggle}
						/>
						<span>Bugun</span>
					</label>
				</div>
			</div>

			<div className='form-group'>
				<label>Muddat</label>
				<select
					className='input'
					value={period}
					onChange={e => setPeriod(e.target.value)}
				>
					<option value=''>Muddatni tanlang</option>
					<option value='1 oy'>1 oy</option>
					<option value='3 oy'>3 oy</option>
					<option value='6 oy'>6 oy</option>
					<option value='12 oy'>12 oy</option>
				</select>
			</div>

			<div className='form-group'>
				<label>Jami nasiya summasi</label>
				<input
					type='number'
					className='input'
					value={debtSum}
					placeholder='Nasiya summasini kiriting'
					onChange={e => setDebtSum(Number(e.target.value))}
				/>
			</div>

			<div className='form-group'>
				<label>Oylar soni</label>
				<input
					type='number'
					className='input'
					value={totalMonth}
					placeholder='Necha oyga bo‘linganini kiriting'
					onChange={e => setTotalMonth(Number(e.target.value))}
				/>
			</div>

			<div className='form-group'>
				<label>Eslatma</label>
				<textarea
					className='textarea'
					value={note}
					placeholder='Eslatma kiriting'
					onChange={e => setNote(e.target.value)}
				/>
			</div>

			<div className='form-group'>
				<label>Rasm biriktirish</label>
				<input
					type='file'
					multiple
					onChange={handleImageChange}
					className='file-input'
				/>
				<div className='image-preview-container'>
					{images.map((image, idx) => (
						<div key={idx} className='image-wrapper'>
							<img
								src={URL.createObjectURL(image)}
								alt='preview'
								className='image'
							/>
							<div className='image-overlay'>
								<span>✏️ O‘zgartirish</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<button
				className='save-button'
				disabled={!name || !date || !period || !debtSum || !totalMonth}
				onClick={handleSubmit}
			>
				Saqlash
			</button>
		</div>
	);
};

export default CreateDebts;
