import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './login.css';

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (formData.email === 'admin' && formData.password === '12345') {
			console.log('Login successful');
			navigate('/home');
		} else {
			setError("Login yoki parol noto'g'ri");
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		setError('');
	};

	return (
		<div className='container'>
			<div className='login-container'>
				<div className='login-content'>
					<div className='login-logo'>
						<img src={logo} alt='Logo' width='40' height='40' />
					</div>

					<div className='login-header'>
						<h1 className='login-title'>Dasturga kirish</h1>
						<p className='login-description'>
							Iltimos, tizimga kirish uchun login va parolingizni
							kiriting.
						</p>
					</div>

					<form onSubmit={handleSubmit} className='login-form'>
						{error && <div className='error-message'>{error}</div>}
						<div className='input-group'>
							<div className='input-wrapper'>
								<svg
									className='input-icon'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
									/>
								</svg>
								<input
									type='text'
									name='email'
									placeholder='admin'
									className='input-field'
									value={formData.email}
									onChange={handleChange}
								/>
							</div>

							<div className='input-wrapper'>
								<svg
									className='input-icon'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
									/>
								</svg>
								<input
									type='password'
									name='password'
									placeholder='12345'
									className='input-field'
									value={formData.password}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div className='forgot-password'>
							<a href='#'>Parolni unutdingizmi?</a>
						</div>

						<button type='submit' className='login-button'>
							Kirish
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
