import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Liste from "./pages/list2/List";
import Listhotel from "./pages/listhotel/Listhotel.jsx";
import Listevenements from "./pages/listevenements/Listevenements.jsx";
import Listevenements2 from "./pages/listevenements/Listevenements2.jsx";
import Listformation from "./pages/listformation/Listformation.jsx";
import Listformation2 from "./pages/listformation/Listformation2.jsx";
import Listmison from "./pages/listmison/Listmison.jsx";
import Listhebergeur from "./pages/listhebergeur/listhebergeur.jsx";
import Listhebergeuratt from "./pages/listhebergeuratt/listhebergeur.jsx";
import Listmison2 from "./pages/listmison/Listmison2.jsx";
import Listcamping from "./pages/listcamping/Listcamping.jsx";
import Listcamping2 from "./pages/listcamping/Listcamping2.jsx";
import Attendre from "./pages/attendre/Attendre"
import Single from "./pages/single/Single";
import Profil from "./pages/profil/profil";
import New from "./pages/new/New";
import EditForm from "./pages/Editform/EditForm"; // Import the EditForm component
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  userInputs,HebergeurInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, postColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import NewBlog from "./pages/newblogs/NewBlogs";
import Order from "./pages/order/order";
import NewFormatin from "./pages/newFormation/NewFormation.jsx";
import Newhebergeur from "./pages/newhebergeur/newhebergeur.jsx";
import Newplace from "./pages/newplace/Newplace.jsx";
import Newmison from "./pages/newmison/Newmison.jsx";
import Newroomd from "./pages/newroomd/Newroomd.jsx";
import Newcamping from "./pages/newcamping/Newcamping.jsx";
import Newtont from "./pages/newtont/Newtont.jsx";
import Listuser from "./pages/listuser/Listuser.jsx";
import Terminer from "./pages/terminer/terminer.js"
import Neweventes from "./pages/newevents/Neweventes.jsx";
import Newticket from "./pages/newticket/Newticket.jsx";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listuser columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hebergeur">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listhebergeur columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newhebergeur inputs={HebergeurInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hebergeuratt">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listhebergeuratt columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
           
            
            </Route>
            <Route path="attendre">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Attendre columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listhotel columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:itemId" // Define the route for editing hotels
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:itemId" // Define the route for editing rooms
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/posts">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Liste columns={postColumns} />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewBlog />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:itemId" // Define the route for editing rooms
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="formation">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listformation columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewFormatin />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="camping">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listcamping columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newcamping />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="mison">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listmison columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newmison />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="tont">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listcamping2 columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newtont />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="place">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listformation2 columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newplace />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="misonro">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listmison2 columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newroomd />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="evenements">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listevenements columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Neweventes />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="ticket">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Listevenements2 columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <Newticket />
                  </ProtectedRoute>
                }
              />
               <Route
                path="edit/:itemId" // Define the route for editing users
                element={
                  <ProtectedRoute>
                    <EditForm />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/order" element={<Order />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/completed" element={<Terminer/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
