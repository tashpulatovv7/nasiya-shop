import { Link } from 'react-router-dom';
import './customer.css';

const Customer = () => {
	return (
		<div className='container'>
			<div className='customer-container'>
				<div className='customer-header'>
					<input type='text' placeholder='Mijozlarni qidirish...' />
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10 18H21M3 18H6M6 18V20M6 18V16M20 12H21M3 12H16M16 12V14M16 12V10M14 6H21M3 6H10M10 6V8M10 6V4'
							stroke='#1A1A1A'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</div>
				<div className='customer-content'>
					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>

					<div className='customer-info'>
						<h2>Rahmatulloh Madraximov</h2>
						<a href=''>+998 91 123 45 67</a>
						<p>Jami nasiya:</p>
						<h4>-800 000 so'm</h4>
					</div>
				</div>

				<Link to='/createcustomer'>
					<button className='customer-add-btn'>Yaratish</button>
				</Link>
			</div>
		</div>
	);
};

export default Customer;
