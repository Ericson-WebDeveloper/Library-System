import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import AppLayout from './pages/layout/AppLayout';
import UDash from './pages/user/DashBoard';
import ADash from './pages/admin/DashBoard';
import Books from './pages/admin/Books';
import Librarians from './pages/admin/Librarians';
import Loans from './pages/admin/Loans';
import Users from './pages/admin/Users';
import Profile from './pages/Profile';
import LoanBooks from './pages/user/LoanBooks';
import AddUser from './pages/admin/AddUser';
import AddBook from './pages/admin/AddBook';
import EditBook from './pages/admin/EditBook';
import AddLoan from './pages/admin/AddLoan';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtecMiddleware from './middleware/ProtecMiddleware';
import UnAuthorized from './pages/UnAuthorized';
import RoleMiddleware from './middleware/RoleMiddleware';
import EditLoan from './pages/admin/EditLoan';
import ViewLoan from './pages/admin/ViewLoan';
import ViewUser from './pages/admin/ViewUser';
import ViewBook from './pages/admin/ViewBook';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <div>
    <Routes>
 
      <Route path='/' element={<Login />} />
      <Route path='/forget-password' element={<ForgetPassword />} />
      <Route path='/signup' element={<Register />} />
      <Route path='/reset-password/:email/:token' element={<ResetPassword />} />
      
      <Route path="/library-system" element={<AppLayout />}>

        <Route element={<ProtecMiddleware />}>

          <Route element={<RoleMiddleware allowedRoles={['Librarian']} />} >
            <Route index element={<ADash />} />

            {/* makikita total loans, if available */}
            <Route path='admin/books' element={<Books />} />
            <Route path='admin/book/add' element={<AddBook />} />
            <Route path='admin/book/edit/:id_book' element={<EditBook />} />
            <Route path='admin/librarian-user' element={<Librarians />} />

            <Route path='admin/loans' element={<Loans />} />
            <Route path='admin/loans/add' element={<AddLoan />} />
            
            <Route path='admin/loan/edit/:id_loan' element={<EditLoan />} />
            <Route path='admin/users' element={<Users />} />
            <Route path='admin/user/add' element={<AddUser />} />
            <Route path='admin/user/view/:id_user' element={<ViewUser />} />
          </Route>
            
          <Route element={<RoleMiddleware allowedRoles={['User']} />} >
            <Route path='user' element={<UDash />} />
            {/* explicit add, edit delete books - only search form, pagination */}
            <Route path='user/books' element={<Books />} />
            <Route path='user/loans' element={<LoanBooks />} />
          </Route>

            <Route path='loan/view/:id_loan' element={<ViewLoan />} />
            <Route path='view/book/:id_book' element={<ViewBook />} />
            <Route path='profile' element={<Profile />} />

        </Route>

        <Route path='unauthorized' element={<UnAuthorized />} />
      </Route>
      
  </Routes>
  <ToastContainer />
  </div>
  );
}

export default App;
