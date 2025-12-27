import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './redux/store.js'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
    <Toaster/>
  </React.StrictMode>,

    
)
