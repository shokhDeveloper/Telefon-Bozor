import "./_Login.scss"
import { Container } from "../../Container"
import {useForm} from "react-hook-form"
import * as Yup from "yup"
import { Language } from "../../Language/Language"
import { useContext } from "react"
import { Context } from "../../Context"
import {yupResolver} from "@hookform/resolvers/yup"
import axios from "axios"
export const Login = () => {
    const date = new Date()
    const {lang, setToken, setUser, setAdmin} = useContext(Context)
    const validationSchema = Yup.object({
        email: Yup.string().email(Language[lang].email_invalid).required(Language[lang].email_required),
        password: Yup.string().min(3, "Min 3").max(12, "Max 12").required(Language[lang].password_required)
    })
    const {register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
        values:{
            email: "",
            password: ""
        },
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    })
    const onSubmit = async (event) => {
        let jsons = await axios({
            method: "POST",
            url: "http://localhost:2121/login",
            headers: {
                "Content-Type": "application/json"
            },
            data: {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Login` }
        }).catch((error) => console.log(error))
        let response = await jsons.data
        if(response){
            const {accessToken, user} = response
            console.log(user.email)
            if(user.email === "shohijahonmusinkulov@gmail.com" && user.id === 1){
                let user_admin = {...user, admin: true}
                setAdmin("admin")
                setUser(user_admin)
                setToken(accessToken)
            }else{
                setUser(user)
                setToken(accessToken)
            }
        }
    }
    watch()
    return(
        <div className="login">
            <Container>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <input style={{outline: errors?.email? "2px solid crimson": false}} placeholder={Language[lang].register_email_placeholder} type="text" {...register("email")} name="email" />
                {errors?.email? <p className="error_text">{errors.email.message}</p>: false}
                <input style={{outline: errors?.password? "2px solid crimson": false}} placeholder={Language[lang].register_password_placeholder} type="text" {...register("password")} name="password" />
                {errors.password? <p className="error_text">{errors.password.message}</p>: false}
                <button disabled={!isValid} className="login_submitter" type="submit">{Language[lang].submit}</button>
            </form>          
            </Container>
        </div>
    )
}