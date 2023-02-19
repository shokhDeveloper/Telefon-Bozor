import "./_Register.scss"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup";
import { Container } from "../../Container";
import { useContext, useRef } from "react";
import axios from "axios";
import { Language } from "../../Language/Language";
import { Context } from "../../Context";
import  Reveal  from "react-reveal/Reveal";
import { NavLink } from "react-router-dom";
export const Register = () => {
    const date = new Date()
    const {setToken, setUser, lang} = useContext(Context)
    const initalValue = {
        name: "",
        lastname: "",
        email: "",
        password: ""
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(Language[lang].name_required),
        lastname: Yup.string().required(Language[lang].familya_required),
        email: Yup.string().email(Language[lang].email_invalid).required(Language[lang].email_required),
        password: Yup.string().min(3, "Minimum 3").max(12 ,"Maximum 12").required(Language[lang].password_required)
    })
    const onSubmit = async (event) => {
        const register = await axios.post("http://localhost:2121/register", {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Register-At`}).catch((error) => {
            console.log(error)
        })
        let response = await register.data
        if(response){
            const {accessToken, user} = response
            setToken(accessToken)
            setUser(user)
        }
    }
    return(
        <Reveal effect="register_effect" duraction="700">    
            <div className="register">
            <Container>
            <h1>{Language[lang].register_title}</h1>
            <Formik validationSchema={validationSchema} initialValues={initalValue} onSubmit={onSubmit}>
            <Form className="form">
                <Field className="input" name="name" type="text"  placeholder={Language[lang].register_name_placeholder} />
                <ErrorMessage className="error_text" component={"p"} name="name"/>
                <Field name="lastname"  className="input" placeholder={Language[lang].register_familya_placeholder} type="text"/>
                <ErrorMessage className="error_text" component={"p"} name="lastname"/>
                <Field name="email"  type="email" className="input" placeholder={Language[lang].register_email_placeholder}/>
                <ErrorMessage className="error_text"  component={"p"} name="email"/>
                <Field name="password"  className="input" type="password" placeholder={Language[lang].register_password_placeholder}/>
                <ErrorMessage className="error_text"  name="password" component={"p"}/>
                <NavLink to={"/login"} style={{display: "block"}} className="profile_akkaunt">Sizda akkaunt bormi ?</NavLink>
                <button type="submit">{Language[lang].submit}</button>
            </Form>
           </Formik>
            </Container>
        </div>
        </Reveal>
    )
}