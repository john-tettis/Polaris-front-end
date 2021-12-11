import React, {useState} from  'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import AstroView from './AstroView/AstroView'
import '../App.css';
import NavBar from './NavBar'
import SignUp from './SignUp'
import LogIn from './Login'
import Landing from './Landing/Landing' 
import UserContext from '../Context'




function App() {
  const[user,setUser] = useState(null)
  const [showNav,setShowNav] = useState(true)

  return (
    <UserContext.Provider value={[user,setUser]}>
      <BrowserRouter>
        <NavBar show={showNav}/>
        <Routes>          
          <Route  exact path='/' element={<Landing setNav={setShowNav} />}/>
          <Route exact path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/login' element={<LogIn/>}></Route>
          <Route exact path='/astro-view' element={<AstroView/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
