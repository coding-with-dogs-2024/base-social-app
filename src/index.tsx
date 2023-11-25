import './assets/styles/global.scss';
import { createRoot } from 'react-dom/client';
import { App } from './components/App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.querySelector('#root')!);
root.render(<App />);
