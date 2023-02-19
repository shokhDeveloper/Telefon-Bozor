import "./_About.scss"
import { Container } from "../../Container"
import Iphone_14 from "../../assets/images/Iphone_14.png"
import { Language } from "../../Language/Language";
import { useContext } from "react";
import { Context } from "../../Context";
import  Reveal  from "react-reveal/Reveal";
export const About = () => {
    const {lang} = useContext(Context)
    return(
        <Reveal effect="animText" duraction="800">
            <div className="public_about">
            <img src={Iphone_14} alt="" />
            <div className="public_about_text">
                <h2>{Language[lang].public_about_title}</h2>
                <p>{Language[lang].public_about_text} </p>
            </div>
        </div>
        </Reveal>
    )
}