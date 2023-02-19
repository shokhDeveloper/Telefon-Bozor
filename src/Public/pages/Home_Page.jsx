import "./_Home_Page.scss"
import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../../Context"
import { Language } from "../../Language/Language"
import Slide from 'react-reveal/Slide';
export const Home_Page = () => {
    const {lang} = useContext(Context)
    return(
        <div className="home_page">
           <div className="home_page_text">
            <Slide left >
            <h1 className="home_page_title">{Language[lang].home_page_title}</h1>
            <div className="home_page_text">
                <p><strong>{Language[lang].home_page_welcome}</strong>{Language[lang].home_page_text} <NavLink to={"/about_admin"} className="link">{Language[lang].batafsil} </NavLink>{Language[lang].home_page_batafsil_text} <NavLink className={"link"} to={"/register"}>{Language[lang].home_page_register}</NavLink> </p>
            </div>
            </Slide>
           
           </div>
        </div>
    )
}