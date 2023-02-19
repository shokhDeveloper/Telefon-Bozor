import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../Context";
import "./_Sidebar.scss";
export const Sidebar = () => {
  const { sidebar } = useContext(Context);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:2121/category")
      .then((response) => setData(response.data));
  }, []);
  return (
    <>
      {data?.length ? (
        <ul
          className="sidebar"
          style={{ display: sidebar !== true ? "none" : "flex" }}
        >   <li><NavLink to={"/"}>Hammasi</NavLink></li>
            {data?.map((item) => (
                <li><NavLink to={item.name}>{item.name}</NavLink></li>
            ))}
        </ul>
      ) : (
        <h1>Hali categorylar yuq</h1>
      )}
    </>
  );
};
