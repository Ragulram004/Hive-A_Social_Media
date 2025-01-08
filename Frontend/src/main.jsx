import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "./components/ui/provider"
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { SocketContextProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  //In strict mode renders every component twice,on development on production renders only once
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Provider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </Provider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
