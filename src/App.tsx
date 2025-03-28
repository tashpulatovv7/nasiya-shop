import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Customer from './pages/customer/Customer';
import Home from './pages/home/Home';
import Kalendar from './pages/kalendar/Kalendar';
import Login from './pages/login/login';

const App = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';

	return (
		<>
			{!isLoginPage && <Header />}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<Navigate to='/login' replace />} />
				<Route path='/kalendar' element={<Kalendar />} />
				<Route path='/customer' element={<Customer />} />
			</Routes>
		</>
	);
};

export default App;
