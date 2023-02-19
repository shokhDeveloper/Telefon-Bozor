import "./_Modal.scss"
export const Modal = ({title, children, modal, setModal}) => {
    return(
        <div style={{display: modal !== true? "none": "flex"}} className="overlay">
            <div className="modal" >
                <div className="modal_header">
                    <button style={{padding: "0.5rem", border: "1px solid transparent", fontSize: "20px", position: "absolute", top: 0, right: 0, borderRadius: "50%"}} onClick={() => {
                        setModal(!modal)
                        }}>&times;</button>
                </div>
                <h1 style={{fontSize: "40px", padding: "0rem 0rem 1rem 0rem", color: "#000"}}>{title}</h1>
                {children}
            </div>
        </div>
    )
}