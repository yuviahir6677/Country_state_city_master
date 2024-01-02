import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Componet/Header';
import Sidebar from './Componet/Sidebar';
import Country from './Componet/SubComponet/Country';
import Content from './Componet/Content';
import State from './Componet/SubComponet/State';
import City from './Componet/SubComponet/City';
import Error404 from './Componet/Error404';


function App() {
  return (
   
  
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Header />} />
          <Route path="country" element={<Country />} />
          <Route path="state" element={<State />} />
          <Route path="city" element={<City />} />
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
          <Route path="*" element={<Error404 />} />
      </Routes>
      {/* <Content /> */}
    </BrowserRouter>
   
  );
}

export default App;
