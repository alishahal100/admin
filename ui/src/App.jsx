
import SignUp from './Components/Admin/SignUp'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import SignIn from './Components/Signin'
function App() {


  return (
   <main className=' container '>
      <Router>
        <Routes>
          <Route path='/admin/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />

        </Routes>
      </Router>
   </main>
  )
}

export default App
