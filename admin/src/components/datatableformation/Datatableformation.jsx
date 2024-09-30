import "./datatableformation.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFormaionatt";
import axios from "axios";
import EditForm from "../../pages/Editform/EditForm"; // Import the EditForm component
import Imag from "../../pages/imag/imag";
import { useContext } from "react";
import { AuthContext } from "../../../../admin/src/context/AuthContext";
const Datatablemison = ({ columns }) => {
  const location = useLocation();
  const k = location.pathname.split("/")[1];
  const path = "hotels"
  const [imag, setimag] = useState(null);
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null); // State to manage the edited item
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    // Check if the new data is different from the current list
    const isNewDataDifferent = JSON.stringify(data) !== JSON.stringify(list);
  
    // Update the list only if they are different
    if (isNewDataDifferent) {
      setList(data);
    }
  }, [data, list]);

  const handleDelete = async (id,item) => {
    try {
      const notificationData = {
        img: user.img,
        namee: `admin ${user.username}`,
        message: `ur ${item.type} ${item.name} has been delete`,
        to: item.namek, // Assuming item.namek holds the desired value
      };
      await axios.post("/notification/creat", notificationData);
      const deleteEndpoint = `/${path}/${id}`;
      console.log('Delete URL:', deleteEndpoint); // Log the delete endpoint
      await axios.delete(deleteEndpoint);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  
  const image = (id) => {
    const itemToEdit = list.find((item) => item._id === id);
    setimag(itemToEdit);
  };

  const handleEdit = (id) => {
    // Find the item to edit and set it in the state
    const itemToEdit = list.find((item) => item._id === id);
    setEditItem(itemToEdit);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`/${path}/${editItem._id}`, updatedData);
      // Update the list with the updated data
      setList((prevList) =>
        prevList.map((item) =>
          item._id === editItem._id ? { ...item, ...updatedData } : item
        )
      );
      setEditItem(null); // Clear the edit state after updating
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
             <div className="editButtone" 
            onClick={() => image(params.row._id)}
            >
              view image
              </div>
            <div
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id,params.row)}
            >
              Delete
            </div>
           
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {k}
        <Link to={`/${k}/new`} className="link">
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
      />
      {/* Render EditForm if editItem is not null */}
      {imag && <Imag item={imag} onUpdate={handleUpdate} onCancel={() => setimag(null)} />}
      {editItem && (
        <EditForm
          item={editItem}
          onUpdate={handleUpdate}
          onCancel={() => setEditItem(null)}
        />
      )}
    </div>
  );
};

export default Datatablemison;
