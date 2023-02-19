import "../../assets/scss/_varieble.scss";
import { useContext } from "react";
import { Context } from "../../Context";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Admin } from "../../Admin";

export const Home = () => {
  const { dark, user, admin } = useContext(Context);
  console.log(admin)
  return (
  <>
    {admin === "admin"? <Admin/>: <div
      className={`private_home`}
      style={{
        display: "flex",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Sidebar />
      <div style={{ width: "100%" }} className="align">
        <Header />
      </div>
    </div>}
      
  </>
  
  );
};
