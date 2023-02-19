import "./_Admin.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Container_Fluid } from "../Container_Fluid";
import { Modal } from "../Modal";
import axios from "axios";
import { Table } from "antd";
import { useForm } from "react-hook-form";
import * as Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { Context } from "../Context";
import { Language } from "../Language/Language";
export const Admin = () => {
  const date = new Date();
  const {lang} = useContext(Context)
  const [modal, setModal] = useState(!true);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedModel, setTouchedModel] = useState(false);
  const [errorName, setErrorName] = useState(Language[lang].category_name);
  const [errorModel, setErrorModel] = useState(Language[lang].category_model);
  const [data, setData] = useState([]);
  const [editModal, setEditModal] = useState(!true);
  const [number, setNumber] = useState(0);
  const nameRef = useRef();

  const handleBlur = (event) => {
    switch (event.target.id) {
      case "name":
        {
          setTouchedName(true);
        }
        break;
      case "model": {
        setTouchedModel(true);
      }
    }
  };
  const handleChange = (event) => {
    switch (event.target.id) {
      case "name":
        {
          if (event.target.value.length >= 1) {
            setErrorName("")
            event.target.style.outline = "2px solid transparent";
          } else {

            event.target.style.outline = "2px solid crimson";
          }
        }
        break;
      case "model": {
        if (event.target.value.length >= 1) {
          setErrorModel("")
          event.target.style.outline = "2px solid transparent";
        } else {
          event.target.style.outline = "2px solid crimson";
        }
      }
    }
  };
  const handleSubmits = async (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    const jsons = await axios.post("http://localhost:2121/category", {
      name: data.get("category_name"),
      model: data.get("category_model"),
      date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Create-At`,
    });
    if (jsons.status === 201) {
      setModal(!modal);
    }
    let response = await jsons.data;
    console.log(response);
  };
  const columns = [
    {
      key: "id",
      dataIndex: "id"
    },
    {
      key: "name",
      dataIndex: "name"
    },
    {
     key: "model",
     dataIndex: "model"
    },
    {
     key: "edit",
     dataIndex: "edit"
    },
    {
    key: "delete",
    dataIndex: "delete"
    }
  ];
  let array = [];
  useEffect(() => {
    axios
      .get("http://localhost:2121/category")
      .then((response) => setData(response.data));
    console.log(data);
  }, []);
  array = data?.map((item, index) => (
    {
        key: item.id,
        id: item.id,
        edit: <button onClick={() =>{
            setEditModal(!editModal)
            setNumber(item.id)
        } }>{Language[lang].edit}</button>,
        name: item.name,
        model: item.model,
        delete: <button onClick={() =>{
          setNumber(item.id)
          axios.delete(`http://localhost:2121/category/${item.id}`).then((response) => console.log(response))
        }}>{Language[lang].delete}</button>
    }
  ));
  const validationSchema = Yup.object({
    name: Yup.string().required(Language[lang].category_name),
    model: Yup.string().required(Language[lang].category_model)
  })
  const {formState, register, watch, formState:{errors, isValid}, handleSubmit} = useForm({
    values:{
      name: "",
      model:""
    },
    mode: "onBlur",
    resolver: yupResolver(validationSchema)
  })
  const onSubmit = async (event) => {
    if(number !== 0){
      const jsons = await axios.put(`http://localhost:2121/category/${number}`, {...event, date: `${date.toLocaleDateString()}-${date.getHours()}:${date.getMinutes()} Update-At`})
      let response = await jsons.data
      console.log(response)
      
    }
  }
  watch()
  return (
    <div className="admin">
      <Container_Fluid>
        <h1>Admin</h1>
        <button className="admin_btn"
          onClick={() => {
            setModal(!modal);
          }}
        >
          {Language[lang].add_category}
        </button>
        <Modal modal={modal} setModal={setModal} title={Language[lang].add_category}>
          <form onSubmit={handleSubmits} className="admin_form">
            <label htmlFor="name">
              {touchedName === true ? (
                <p className="error_text_2">{errorName}</p>
              ) : (
                false
              )}
              <input
                ref={nameRef}
                type="text"
                style={{
                  outline:
                    touchedName === true
                      ? "2px solid crimson"
                      : "2px solid transparent",
                }}
                onChange={handleChange}
                onFocus={handleBlur}
                id="name"
                name="category_name"
              />
            </label>
            <label htmlFor="model">
              {touchedModel === true ? (
                <p className="error_text_2">{errorModel}</p>
              ) : (
                false
              )}
              <input
                type="text"
                style={{
                  outline:
                    touchedModel === true
                      ? "2px solid crimson"
                      : "2px solid transparent",
                }}
                onChange={handleChange}
                onFocus={handleBlur}
                id="model"
                name="category_model"
              />
            </label>
            <button type="submit" className="login_submitter" style={{border: "2px solid transparent"}}>{Language[lang].submit}</button>
          </form>
        </Modal>
        <Modal modal={editModal} setModal={setEditModal} title={Language[lang].edit}>
              <form onSubmit={handleSubmit(onSubmit)} className="admin_form">
                <input {...register("name")} type="text" />
                {errors?.name? <p className="error_text">{errors.name.message}</p>: false}
                <input {...register("model")} type="text" />
                {errors?.model? <p className="error_text">{errors.model.message}</p>: false}
                <button className="login_submitter" style={{border: "2px solid transparent", background: "aqua", color: "#000"}}>{Language[lang].submit}</button>
              </form>
        </Modal>
        {/* <Modal modal={modal} setModal={setModal} title="Category qushish"/> */}
        <Table dataSource={array} columns={columns} className="table"  />
      </Container_Fluid>
    </div>
  );
};
