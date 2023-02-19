import "./_Header.scss"
import "../../assets/scss/_varieble.scss"
import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Container } from "../../Container";
import { Container_Fluid } from "../../Container_Fluid";
import { Language } from "../../Language/Language";
import { Context } from "../../Context";
import SideBarIcon from "@material-ui/icons/AddAlert"
import { AllProduct } from "../Pages/AllProduct";
export const Header = ({children}) => {
  const { lang, setLang , sidebar, setSidebar, dark} = useContext(Context);
  const [block, setBlock] = useState(!true)
  const checkedRef = useRef()
  useEffect(() => {
    if(block === true){
        window.addEventListener("mousedown", () => {
            setBlock(!block)
        })
    }else{
        window.removeEventListener("mousedown", () => {})
    }
  },[block])
  useEffect(() => {
    if(dark !== "dark"){
      checkedRef.current.checked = false
    }else{
      checkedRef.current.checked = true  
    }
  },[dark])
  return (
    <>
    <header className={`private_header`}>
      <Container_Fluid>
        <nav>
      <div style={{width: sidebar === true? "25%": "20%"}} className="private_nav_child_1">
       <button className="Sidebar_button" onClick={() => setSidebar(!sidebar)}><SideBarIcon/></button>
          <Link to={"/"} className="logo">
            <h1>{Language[lang].logo}</h1>
          </Link>
       </div>
          <div className="private_nav_child_2" style={{width: sidebar === true? "30%": "20%" }}>
            <select className="language_select" onChange={(event) => {
                setLang(event.target.value)
            }} defaultValue={"default"}>
                <option value="default" selected disabled>{Language[lang].language_select}</option>
                <option value="uzb">UZB</option>
                <option value="eng">ENG</option>
            </select>
            <button onClick={() => setBlock(!block)} className="btn">Sozlamalar</button>
            <ul className="bar" style={{display: block == true? "block": "none"}} >
                <NavLink to={"/logout"}><li>Akkauntdan chiqish</li></NavLink>
                <NavLink to={"/admin"}><li>Akkaunt sozlamalari</li></NavLink>
                <NavLink to={"/post"}><li>Post joylash</li></NavLink>
            </ul>
            <input ref={checkedRef} type="checkbox" className="check" onChange={(event) => {
             let app = document.querySelector(".App")
             if(event.target.checked){
               window.localStorage.setItem("darkmode", "dark")
               app.classList.add(window.localStorage.getItem("darkmode"))
               
           } else{
               event.target.checked = false
               window.localStorage.removeItem("darkmode")
               app.classList.remove("dark")
             }
            }} />
          </div>
        </nav>
      </Container_Fluid>
    </header>
      <Routes>
        <Route index element={<AllProduct/>}></Route>
      </Routes>
    </>
  );
};
