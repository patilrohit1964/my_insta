import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify"
import { Provider as ChakraProvider } from "./components/ui/provider"
import App from './App.jsx'
import './index.css'
import { appStore, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/lib/integration/react'

createRoot(document.getElementById('root')).render(
  <>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
    <ToastContainer position='top-right' pauseOnHover={true} />
  </>

)
