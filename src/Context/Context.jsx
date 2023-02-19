import { createContext, useEffect, useState } from "react";

export const Context = createContext()

export const ContextProvider = ({children}) => {
    let parses = window.localStorage.getItem("token_bozor")
    const [token, setToken] = useState(parses !== null? parses: null)
    useEffect(() => {
        if(token !== null){
            window.localStorage.setItem("token_bozor", token)
        }
    },[token])
    const parses_user = window.localStorage.getItem("user_bozor")
    const [user, setUser] = useState(parses_user !== null? JSON.parse(parses_user): null)
    useEffect(() => {
        if(user !== null){
            window.localStorage.setItem("user_bozor", JSON.stringify(user))
        }
    },[user])
    let parses_language = window.localStorage.getItem("lang")
    const [lang, setLang] = useState(parses_language !== "uzb"? "eng":  "uzb")
    useEffect(() => {
        if(lang){
            window.localStorage.setItem("lang", lang)
        }
    },[lang])

    let darkmode = window.localStorage.getItem("darkmode")
    const [dark, setDark] = useState(darkmode) 
    const [sidebar, setSidebar] = useState(!true)
    const admin_locals = window.localStorage.getItem("admin_locals")
    const [admin, setAdmin] = useState(admin_locals !== null? admin_locals: null)
    useEffect(() => {
        if(admin !== null){
            window.localStorage.setItem("admin_locals", admin)
        }
    },[admin])
    return(
        <Context.Provider value={{sidebar, setSidebar, token, setToken, lang, setLang, user, setUser, dark, setDark, admin, setAdmin}}>
            {children}
        </Context.Provider>
    )
}