import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const rootEl = document.getElementById('root')!;

// Override the global #root CSS constraints without touching index.css
rootEl.style.width = '100%';
rootEl.style.maxWidth = '100%';
rootEl.style.margin = '0';
rootEl.style.textAlign = 'left';
rootEl.style.border = 'none';
rootEl.style.borderInline = 'none';

// Override body global styles too
document.body.style.display = 'block';
document.body.style.placeItems = 'unset';

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
