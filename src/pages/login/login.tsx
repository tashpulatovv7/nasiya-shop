import { message, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useAuth from '../../hooks/useAuth';
import './login.css';

const Login = () => {
	const { loginMutation } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.email || !formData.password) {
			message.warning("Iltimos, barcha maydonlarni to'ldiring!");
			return;
		}

		setLoading(true);
		loginMutation.mutate(
			{ login: formData.email, hashed_password: formData.password },
			{
				onSuccess: () => {
					setLoading(false);
					message.success('Muvaffaqiyatli tizimga kirdingiz!');
					navigate('/');
				},
				onError: (error: any) => {
					setLoading(false);
					message.error(
						error?.response?.data?.message || "Login yoki parol noto'g'ri"
					);
				},
			}
		);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
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
						<div className='input-group'>
							<input
								type='text'
								name='email'
								placeholder='Login'
								className='input-field'
								value={formData.email}
								onChange={handleChange}
							/>
							<input
								type='password'
								name='password'
								placeholder='Parol'
								className='input-field'
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<div className='forgot-password'>
							<a href='#'>Parolni unutdingizmi?</a>
						</div>
						<button
							type='submit'
							className='login-button'
							disabled={loading}
						>
							{loading ? <Spin size='small' /> : 'Kirish'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
