import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Componet/Header';
import Sidebar from './Componet/Sidebar';
import Country from './Componet/SubComponet/Country';
import Content from './Componet/Content';
import State from './Componet/SubComponet/State';
import City from './Componet/SubComponet/City';
import Error404 from './Componet/Error404';
import Profile from './profile/profile';
import Register from './Register/RegisterForm';
import LoginForm from './login/LoginForm';


function App() {
  return (
   
  
   <BrowserRouter>
      <Routes>

        <Route path='/' element={<LoginForm/>}/>  
          <Route index element={<LoginForm/>} />
        <Route path="header" element={<Header />}/>
          <Route path="country" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="city" element={<City />} />
          <Route path='myprofile' element={<Profile/>}/>
        {/* </Route> */}
        <Route path='myregister' element={<Register/>}/>  
        <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Content /> */}
    </BrowserRouter>
   
  );
}

export default App;
