// import { useState } from 'react';
// import './customer.css';

// export default function CreateCustomer() {
// 	const [name, setName] = useState('');
// 	const [phones, setPhones] = useState(['']);
// 	const [address, setAddress] = useState('');
// 	const [note, setNote] = useState('');
// 	const [images] = useState([]);

// 	const addPhoneField = () => {
// 		setPhones([...phones, '']);
// 	};

// 	// const handlePhoneChange = (index, value) => {
// 	// 	const newPhones = [...phones];
// 	// 	newPhones[index] = value;
// 	// 	setPhones(newPhones);
// 	// };

// 	// const handleImageUpload = e => {
// 	// 	const fileList = Array.from(e.target.files);
// 	// 	setImages([...images, ...fileList]);
// 	// };

// 	return (
// 		<div className='create-container'>
// 			<h2 className='title'>Mijoz yaratish</h2>

// 			<div>
// 				<label className='label'>Ismi *</label>
// 				<input
// 					type='text'
// 					placeholder='Ismini kiriting'
// 					value={name}
// 					onChange={e => setName(e.target.value)}
// 					className='input'
// 				/>
// 			</div>

// 			<div>
// 				<label className='label'>Telefon raqami *</label>
// 				{phones.map((phone, index) => (
// 					<input
// 						key={index}
// 						type='text'
// 						placeholder='Telefon raqami'
// 						value={phone}
// 						// onChange={e => handlePhoneChange(index, e.target.value)}
// 						className='input'
// 					/>
// 				))}
// 				<button onClick={addPhoneField} className='add-phone-btn'>
// 					+ Ko‘proq qo‘shish
// 				</button>
// 			</div>

// 			<div>
// 				<label className='label'>Yashash manzili</label>
// 				<input
// 					type='text'
// 					placeholder='Yashash manzilini kiriting'
// 					value={address}
// 					onChange={e => setAddress(e.target.value)}
// 					className='input'
// 				/>
// 			</div>

// 			<div>
// 				<label className='label'>Eslatma</label>
// 				<textarea
// 					placeholder='Eslatma qo‘shish'
// 					value={note}
// 					onChange={e => setNote(e.target.value)}
// 					className='textarea'
// 				/>
// 			</div>

// 			<div>
// 				<label className='label'>Rasm biriktirish</label>
// 				<input
// 					type='file'
// 					multiple
// 					// onChange={handleImageUpload}
// 					className='file-input'
// 				/>
// 				<div className='image-preview-container'>
// 					{images.map((image, index) => (
// 						<div key={index} className='image-preview'>
// 							<img
// 								src={URL.createObjectURL(image)}
// 								alt='Uploaded'
// 								className='image'
// 							/>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			<button disabled={!name || !phones[0]} className='save-btn'>
// 				Saqlash
// 			</button>
// 		</div>
// 	);
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCustomerStore } from './CustomerStore';
import './customer.css';

export default function CreateCustomer() {
	const [name, setName] = useState('');
	const [phones, setPhones] = useState(['']);
	const [address, setAddress] = useState('');
	const [note, setNote] = useState('');
	const [images, setImages] = useState<File[]>([]);

	const addCustomer = useCustomerStore(state => state.addCustomer);
	const navigate = useNavigate();

	const handlePhoneChange = (index: number, value: string) => {
		const updatedPhones = [...phones];
		updatedPhones[index] = value;
		setPhones(updatedPhones);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setImages(prev => [...prev, ...files]);
	};

	const handleSubmit = () => {
		const newCustomer = {
			id: uuidv4(),
			full_name: name,
			phone_numbers: phones.map(p => ({ number: p })),
			address,
			note,
			images,
		};
		addCustomer(newCustomer);
		navigate('/customer');
	};

	return (
		<div className='create-container'>
			<h2 className='title'>Mijoz yaratish</h2>

			<div>
				<label className='label'>Ismi *</label>
				<input
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
					className='input'
					placeholder='Ism kiriting'
				/>
			</div>

			<div>
				<label className='label'>Telefon raqami *</label>
				{phones.map((phone, index) => (
					<input
						key={index}
						type='text'
						value={phone}
						onChange={e => handlePhoneChange(index, e.target.value)}
						className='input'
						placeholder='Telefon raqami'
					/>
				))}
				<button
					onClick={() => setPhones([...phones, ''])}
					className='add-phone-btn'
				>
					+ Ko‘proq qo‘shish
				</button>
			</div>

			<div>
				<label className='label'>Yashash manzili</label>
				<input
					type='text'
					value={address}
					onChange={e => setAddress(e.target.value)}
					className='input'
					placeholder='Yashash manzili'
				/>
			</div>

			<div>
				<label className='label'>Eslatma</label>
				<textarea
					value={note}
					onChange={e => setNote(e.target.value)}
					className='textarea'
					placeholder='Eslatma qo‘shish'
				/>
			</div>

			<div>
				<label className='label'>Rasm biriktirish</label>
				<input
					type='file'
					multiple
					onChange={handleImageUpload}
					className='file-input'
				/>
				<div className='image-preview-container'>
					{images.map((image, index) => (
						<div key={index} className='image-preview'>
							<img
								src={URL.createObjectURL(image)}
								alt='Uploaded'
								className='image'
							/>
						</div>
					))}
				</div>
			</div>

			<button
				disabled={!name || !phones[0]}
				className='save-btn'
				onClick={handleSubmit}
			>
				Saqlash
			</button>
		</div>
	);
}
