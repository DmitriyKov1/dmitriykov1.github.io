import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from "./Components/Navbar";
import Login from './Pages/Login'
import File from './Pages/File'
import {LOGIN_ROUTE, FILE_ROUTE} from './consts'

function App() {


  return (
    <div className="container">
      <div className="app">
        <Navbar/>
        <Routes>
          <Route path={LOGIN_ROUTE} element={<Login/>}/>
          <Route path={FILE_ROUTE} element={<File/>}/>
        </Routes>
      </div>
    </div>
  )

}

export default App;
