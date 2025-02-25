import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from "react-toastify"
import { Provider as ChakraProvider } from "@/components/ui/provider"
import App from './App.jsx'
import './index.css'
import appStore from './redux/store.js'
createRoot(document.getElementById('root')).render(
  <>
    <Provider store={appStore}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
    <ToastContainer position='top-right' pauseOnHover={true} />
  </>

)
