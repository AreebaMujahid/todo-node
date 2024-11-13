// src/App.js
import React from "react";
import Signup from "./Components/Signup";
import Todo from "./Components/Todo";
import Login from "./Components/Login"
import { BrowserRouter } from 'react-router-dom';
import {Routes , Route} from 'react-router-dom';

function App() {
    return (
       
         
         <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/Login" element={<Login/>} />
         </Routes>
        
        
            
       
    );
}

export default App;
