import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Listevenements from "./pages/listevenements/Listevenements.jsx";
import Listevenements2 from "./pages/listevenements/Listevenements2.jsx";
import Listformation from "./pages/listformation/Listformation.jsx";
import Listformation2 from "./pages/listformation/Listformation2.jsx";
import Listmison from "./pages/listmison/Listmison.jsx";
import Listmison2 from "./pages/listmison/Listmison2.jsx";
import Listcamping from "./pages/listcamping/Listcamping.jsx";
import Listcamping2 from "./pages/listcamping/Listcamping2.jsx";
import Single from "./pages/single/Single";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, orderColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import EditForm from "./pages/Editform/EditForm";
import Order from "./pages/order/order.js";
import History from "./pages/hestoriq/hestoriq.js"; // Import the Order component
import Profil from "./pages/profil/profil.jsx";
import NewFormatin from "./pages/newFormation/NewFormation.jsx";

import Newplace from "./pages/newplace/Newplace.jsx";
import Newmison from "./pages/newmison/Newmison.jsx";
import Newroomd from "./pages/newroomd/Newroomd.jsx";
import Newcamping from "./pages/newcamping/Newcamping.jsx";
import Newtont from "./pages/newtont/Newtont.jsx";
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
        
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
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
                path="edit/:itemId" // Define the route for editing users
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
            {/* Add a route for displaying orders */}
            <Route path="/order" element={<Order />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/history" element={<History/>} />

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


          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;