import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './header/Header';
import Customer from './pages/customer/Customer';
import Home from './pages/home/Home';
import Kalendar from './pages/kalendar/Kalendar';
import Login from './pages/login/login';
import PrivateRoute from './PrivateRoute';

const App = () => {
	const location = useLocation();
	const isLoginPage = location.pathname === '/login';
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{!isLoginPage && <Header />}
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route element={<PrivateRoute />}>
					<Route path='/home' element={<Home />} />
					<Route path='/kalendar' element={<Kalendar />} />
					<Route path='/customer' element={<Customer />} />
				</Route>
				<Route path='/' element={<Navigate to='/home' replace />} />
			</Routes>
		</QueryClientProvider>
	);
};

export default App;
