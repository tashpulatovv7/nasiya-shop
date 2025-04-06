import { useState } from 'react';
import './customer.css';

export default function CreateCustomer() {
	const [name, setName] = useState('');
	const [phones, setPhones] = useState(['']);
	const [address, setAddress] = useState('');
	const [note, setNote] = useState('');
	const [images] = useState([]);

	const addPhoneField = () => {
		setPhones([...phones, '']);
	};

	// const handlePhoneChange = (index, value) => {
	// 	const newPhones = [...phones];
	// 	newPhones[index] = value;
	// 	setPhones(newPhones);
	// };

	// const handleImageUpload = e => {
	// 	const fileList = Array.from(e.target.files);
	// 	setImages([...images, ...fileList]);
	// };

	return (
		<div className='create-container'>
			<h2 className='title'>Mijoz yaratish</h2>

			<div>
				<label className='label'>Ismi *</label>
				<input
					type='text'
					placeholder='Ismini kiriting'
					value={name}
					onChange={e => setName(e.target.value)}
					className='input'
				/>
			</div>

			<div>
				<label className='label'>Telefon raqami *</label>
				{phones.map((phone, index) => (
					<input
						key={index}
						type='text'
						placeholder='Telefon raqami'
						value={phone}
						// onChange={e => handlePhoneChange(index, e.target.value)}
						className='input'
					/>
				))}
				<button onClick={addPhoneField} className='add-phone-btn'>
					+ Ko‘proq qo‘shish
				</button>
			</div>

			<div>
				<label className='label'>Yashash manzili</label>
				<input
					type='text'
					placeholder='Yashash manzilini kiriting'
					value={address}
					onChange={e => setAddress(e.target.value)}
					className='input'
				/>
			</div>

			<div>
				<label className='label'>Eslatma</label>
				<textarea
					placeholder='Eslatma qo‘shish'
					value={note}
					onChange={e => setNote(e.target.value)}
					className='textarea'
				/>
			</div>

			<div>
				<label className='label'>Rasm biriktirish</label>
				<input
					type='file'
					multiple
					// onChange={handleImageUpload}
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

			<button disabled={!name || !phones[0]} className='save-btn'>
				Saqlash
			</button>
		</div>
	);
}
