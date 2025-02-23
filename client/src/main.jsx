import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import appStore from './redux/store.js'
import { ToastContainer } from "react-toastify"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
    <ToastContainer position='top-right' pauseOnHover={true} />
  </BrowserRouter>,
)
