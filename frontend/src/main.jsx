import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './routes/AuthRoutes.jsx'
import { Provider } from "react-redux"
import { store } from './store/store.js'
import AuthProvider from './Layout/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </Provider>
)
