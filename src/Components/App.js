import React, {useState} from  'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import AstroView from './AstroView/AstroView'
import '../App.css';
import NavBar from './NavBar'
import SignUp from './SignUp'
import LogIn from './Login' 


//create user context

export const UserContext = React.createContext([]);

function App() {
  const[user,setUser] = useState(null)
  return (
    <UserContext.Provider value={[user,setUser]}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
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
