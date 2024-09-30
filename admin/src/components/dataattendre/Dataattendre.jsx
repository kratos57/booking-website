import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/attendreFetche";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../admin/src/context/AuthContext";


const Datatable = ({ columns }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const path = "hotels"; // Change the value of path here
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    // Check if the data has changed before updating the state
    if (JSON.stringify(data) !== JSON.stringify(list)) {
      setList(data); 
    }
  }, [data, list]);

  const handleDelete = async (id,item) => {
    try {
      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `ur ${item.type} ${item.name} has been delete`,
        to: item.namek, 
      };
      await axios.post("/notification/creat", notificationData);
      await axios.delete(`/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = list.find((item) => item._id === id);
    setEditItem(itemToEdit);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`/${path}/${editItem._id}`, updatedData);
      setList((prevList) =>
        prevList.map((item) =>
          item._id === editItem._id ? { ...item, ...updatedData } : item
        )
      );
      setEditItem(null);
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const handleAccept = async (id, item) => {
    try {
      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `ur ${item.type} ${item.name} has been accepted`,
        to: item.namek, // Assuming item.namek holds the desired value
      };
      await axios.post("/notification/creat", notificationData);
      await axios.put(`/${path}/${id}`, { att: "accepter" });
      setList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, att: "accepter" } : item
        )
      );
    } catch (err) {
      console.error("Error accepting item:", err);
    }
  };
  

  const handleRefuse = async (id, item) => {
    try {
      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `ur ${item.type} ${item.name} has been refuser`,
        to: item.namek, // Assuming item.namek holds the desired value
      };
      await axios.post("/notification/creat", notificationData);
      await axios.put(`/${path}/${id}`, { att: "refuser" });
      setList((prevList) =>
        prevList.map((item) =>
          item._id === id ? { ...item, att: "refuser" } : item
        )
      );
    } catch (err) {
      console.error("Error refusing item:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
           
            
            <div className="deleteButton" onClick={() => handleDelete(params.row._id,params.row)}>Delete</div>
            {params.row.att === "en attente" && (
              <div className="acceptButton" onClick={() => handleAccept(params.row._id, params.row)}>Accept</div>

            )}
            {params.row.att === "en attente" && (
              <div className="refuseButton" onClick={() => handleRefuse(params.row._id,params.row)}>Refuse</div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
      attender
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: () => (
            <div style={{ display: "none" }}></div>
          ),
        }}
      />
     
    </div>
  );
};

export default Datatable;
