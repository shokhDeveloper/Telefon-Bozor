import "./_Header.scss"
import { Link, NavLink, Outlet } from "react-router-dom"
import { Container } from "../../Container"
import { Language } from "../../Language/Language"
import { useContext, useEffect, useRef } from "react"
import { Context } from "../../Context"
export const Header = () => {
    const {lang, setLang, setDark, dark} = useContext(Context)
    console.log(lang)
    const checkedRef = useRef()
    const handleChange = (event) => {
        setLang(event.target.value)
    }
    useEffect(() => {
        if(dark !=="dark"){
            checkedRef.current.checked = false
        }else{
            checkedRef.current.checked = true    
        }
    },[dark])
    return(
        <>
        <header className="public_header" style={{transition: "0.5s ease"}}>
            <Container>
                <nav className="public_nav">
                    <Link className="logo"><h1>{Language[lang].logo}</h1></Link>
                    <ul className="nav__ul">
                        <li>
                            <NavLink to={"/home"}>{Language[lang].public_header_a_1}</NavLink>
                          </li>
                        <li>
                            <NavLink to={"/about"}>{Language[lang].public_header_a_2}</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/about_admin"}>{Language[lang].public_header_a_3}</NavLink>
                        </li>
                    </ul>
                    <select onChange={handleChange} className="language_select">
                        <option value="default" selected disabled>{Language[lang].language_select}</option>
                        <option value="uzb">UZB</option>
                        <option value="eng">Eng</option>
                    </select>
                    <input type="checkbox" ref={checkedRef} onChange={(event) => {
                      let app = document.querySelector(".App")
                      if(event.target.checked){
                        window.localStorage.setItem("darkmode", "dark")
                        app.classList.add(window.localStorage.getItem("darkmode"))
                        
                    } else{
                        event.target.checked = false
                        window.localStorage.removeItem("darkmode")
                        app.classList.remove("dark")
                      }
                    }} className="check" />
                    <NavLink className={"login_a"} to="/login">Login</NavLink>
                </nav>
            </Container>
        </header>
        <main>
         <Container>
         <Outlet/>
        </Container>   
        </main>
        </>
    )
}