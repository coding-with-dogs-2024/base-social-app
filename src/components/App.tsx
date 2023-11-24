import { Navbar } from './Navbar';
import { Content } from './Content';
import { BrowserRouter } from 'react-router-dom';

export const App = () => (
	<BrowserRouter>
		<Navbar />
		<Content />
	</BrowserRouter>
);
