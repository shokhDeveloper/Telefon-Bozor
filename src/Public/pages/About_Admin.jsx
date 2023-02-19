import "./_About.admin.scss"
import { NavLink } from "react-router-dom"
import Avtor from "../../assets/images/Avtor_image.jpg"
import Zoom from "react-reveal/Zoom"
import Reveal from "react-reveal/Reveal"
import { Language } from "../../Language/Language"
import { useContext } from "react"
import { Context } from "../../Context"
export const About_Admin = () => {
    const {lang} = useContext(Context)
    return(
        <div className="public_admin">
            <Reveal effect="fadeInUp">
            <h2>{Language[lang].public_about_admin_title}</h2>
            </Reveal> 
           <Zoom left>
           <div className="public_admin_align">
                <img src={Avtor} alt="" />
                <div className="public_admin_align_text">
                    <h3>{Language[lang].public_about_admin_title}</h3>
                    <p>{Language[lang].public_about_admin_text} <NavLink className={"link"} to={"/register"}>{Language[lang].public_about_admin_register} </NavLink>   </p>
                </div>
            </div>
           </Zoom>
        </div>
    )
}