
import SignUp from './Components/Admin/SignUp'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import SignIn from './Components/Signin'
import Home from './Components/Home'
import AdminHome from './Components/Admin/AdminHome'
import UserSignUp from './Components/User/SignUp'
import TurfSignUp from './Components/TurfOwner/SignUp'
import SellerDashboard from './Components/TurfOwner/SellerDashboard'
import TurfDetails from './Components/TurfDetails'
function App() {


  return (
   <main className=' container '>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/admin/signup' element={<SignUp />} />
          <Route path='/user/signup' element={<UserSignUp/>} />
          <Route path='/Turf/signup' element={<TurfSignUp/>} />        
          <Route path='/signin' element={<SignIn />} />
          <Route path='/admin/dashboard' element={<AdminHome/>} />
          <Route path='/seller/dashboard' element={<SellerDashboard/>} />
          <Route path="/turf/:id" element={<TurfDetails/>} />

        </Routes>
      </Router>
   </main>
  )
}

export default App
