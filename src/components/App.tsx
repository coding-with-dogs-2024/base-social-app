import { Navbar } from './Navbar';
import { Content } from './Content';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			gcTime: 0,
			staleTime: 300_000
		}
	}
});

export const App = () => (
	<BrowserRouter>
		<QueryClientProvider client={queryClient}>
			<Navbar />
			<Content />
		</QueryClientProvider>
	</BrowserRouter>
);
