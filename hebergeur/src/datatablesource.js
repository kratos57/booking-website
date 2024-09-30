export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
          
        src={params.row.photos[0]|| "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
        alt="avatar"
        className="cellImg"
      />
         
          {params.row.name}
        </div>
      );
  },
},
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "att",
    headerName: "att",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    
    headerName: "phots",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
          
        src={params.row.photos[0]|| "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
        alt="avatar"
        className="cellImg"
      />
       
        </div>
      );
  },},
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
export const postColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },
    {
    field: "image",
    headerName: "Image",
    width: 230,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
];
