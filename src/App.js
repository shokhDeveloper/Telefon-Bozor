import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "./Container";
import { Context } from "./Context";
import { Home } from "./Private";
import { Home as Not, Login, Register } from "./Public";
import "./App.scss"
import { Home_Page } from "./Public/pages/Home_Page";
import { About } from "./Public/pages/About";
import { About_Admin } from "./Public/pages/About_Admin";
function App() {
  let { token, dark } = useContext(Context);
  console.log(dark)
  return (
    <div className={`App ${dark}`} >
      <Routes>
        {token !== null ? (
          <>
            <Route path="/*" element={<Home />}>
            <Route path="*" element={<Navigate to={"/"} replace={token !== null? true: false}/>}/>
            </Route>
          </>
        ) : (
          <>
            <Route path="/*" element={<Not/>}> 
            <Route index element={<Home_Page/>}/>
            <Route  path="home" element={<Home_Page/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="about_admin" element={<About_Admin/>}/>
            </Route>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Navigate to={"/"} replace={true} />}/>
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
