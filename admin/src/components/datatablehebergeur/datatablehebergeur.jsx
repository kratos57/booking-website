import "./datatablehebergeur.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/hebergeurfetche";
import axios from "axios";
import EditForm from "../../pages/Editform/EditForm";// Import the EditForm component
// Update the Datatable component to handle blogs
const DatataHebergeur= ({ columns }) => {
  const location = useLocation();
  const path = "users";
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
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
      // Determine the delete endpoint based on the path
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
        case 'posts': // Add case for blogs
          deleteEndpoint = `/posts/${id}`;
          break;
        default:
          // Handle other cases if needed
          break;
      }

      // Perform the delete request
      if (deleteEndpoint) {
        await axios.delete(deleteEndpoint);
        setList((prevList) => prevList.filter((item) => item._id !== id));
      } else {
        console.error('Invalid path:', path);
      }
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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
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
        Hebergeur
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
      {/* Render EditForm if editItem is not null */}
      {editItem && <EditForm item={editItem} onUpdate={handleUpdate} onCancel={() => setEditItem(null)} />}
    </div>
  );
};

export default DatataHebergeur;