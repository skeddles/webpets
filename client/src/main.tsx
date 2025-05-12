import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx';
import { AppStateProvider } from './hooks/AppState.tsx';

const root = document.getElementById('root')!;

createRoot(root).render(
	<StrictMode>
		<AppStateProvider>
			<App />
		</AppStateProvider>
	</StrictMode>,
)
