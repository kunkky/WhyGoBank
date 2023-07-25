import React from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Signin from './Pages/Signin'
import Receipt from './Pages/Receipt'
import Profile from './Pages/Profile'
import ErrorPage from './Pages/ErrorPage'
import Dashboard from './Pages/Dashboard'
import Transaction from './Pages/Transaction'
import PasswordReset from './Pages/PasswordReset'
import AmountToTransfer from './Pages/AmountToTransfer'
import FailurePage from './Pages/FailurePage'
import TransactionResult from './Pages/TransactionResult'
import ViewTransaction from './Pages/ViewTransaction'





const ProtectedRoutes = ({children }) => {
  if (sessionStorage.getItem("token")) {
    return children
  } else {
    return <Navigate to={"/"} replace={true} />
  }
}



const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signUp' element={<SignUp />}></Route>
      <Route path='/signin' element={<Signin />}></Route>
      <Route path='/passwordReset' element={<PasswordReset />}></Route>
{/* Protected routes */}
      
         <Route path='/receipt' element={
         <ProtectedRoutes>
         <Receipt />
         </ProtectedRoutes>
         }></Route>
      
      <Route path='/dashboard' element={
      <ProtectedRoutes>

      <Dashboard />
      </ProtectedRoutes>
      }></Route>
      
      <Route path='/profile' element={
      <ProtectedRoutes>
      <Profile />
      </ProtectedRoutes>
      }></Route>
      
      <Route path='/transaction' element={
        <ProtectedRoutes>
          <Transaction />
      </ProtectedRoutes>
      }></Route>


      <Route path='/amount' element={
        <ProtectedRoutes>
          <AmountToTransfer />
        </ProtectedRoutes>
      }></Route>
      
      <Route path='/ViewTransaction/:transactionId' element={
        <ProtectedRoutes>
          <ViewTransaction />
        </ProtectedRoutes>
      }></Route>
      <Route path='/TransactionResult' element={
        <ProtectedRoutes>
          <TransactionResult />
        </ProtectedRoutes>
      }></Route>

      <Route path='/failed' element={
        <ProtectedRoutes>
          <FailurePage />
        </ProtectedRoutes>
      }></Route>

          {/* Error Page */}
      <Route path='*' element={<ErrorPage />}></Route>
    </Routes>
  )
}

export default App