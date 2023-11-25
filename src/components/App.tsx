import { Navbar } from './Navbar';
import { Content } from './Content';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../services/queryClient';

export const App = () => (
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<Content />
		</QueryClientProvider>
	</BrowserRouter>
);
