import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
])
function App() {

  return (
    <div>
      
    <RouterProvider router={appRouter}/>

    </div>
  );
}

export default App
