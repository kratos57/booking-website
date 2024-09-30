import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/usehotel";
import axios from "axios";
import EditForm from "../../pages/Editform/EditForm";
import Imag from "../../pages/imag/imag";
const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [imag, setimag] = useState(null);
  const { data } = useFetch(`/${path}`);
 useEffect(() => {
    // Check if the new data is different from the current list
    const isNewDataDifferent = JSON.stringify(data) !== JSON.stringify(list);
  
    // Update the list only if they are different
    if (isNewDataDifferent) {
      setList(data);
    }
  }, [data, list]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        let deleteEndpoint;
        switch (path) {
          case 'hotels':
            deleteEndpoint = `/hotels/${id}`;
            break;
          case 'rooms':
            deleteEndpoint = `/rooms/${id}`;
            break;
          case 'users':
            deleteEndpoint = `/users/${id}`;
            break;
          case 'posts':
            deleteEndpoint = `/posts/${id}`;
            break;
          default:
            // Handle other cases if needed
            break;
        }
  
        // Perform the delete request if confirmation is true
        if (deleteEndpoint) {
          await axios.delete(deleteEndpoint);
          setList((prevList) => prevList.filter((item) => item._id !== id));
        } else {
          console.error('Invalid path:', path);
        }
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const image = (id) => {
    const itemToEdit = list.find((item) => item._id === id);
    setimag(itemToEdit);
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButtone" onClick={() => image(params.row._id)}>view image</div>
            <div className="editButton" onClick={() => handleEdit(params.row._id)}>Edit</div>
            <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
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
      
      {imag && <Imag item={imag} onUpdate={handleUpdate} onCancel={() => setimag(null)} />}
      {editItem && <EditForm item={editItem} onUpdate={handleUpdate} onCancel={() => setEditItem(null)} />}
    </div>
  );
};

export default Datatable;