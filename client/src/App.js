import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import City from "./pages/city/City";
import City1 from "./pages/city/City1";
import City2 from "./pages/city/City2";
import City3 from "./pages/city/City3";
import City4 from "./pages/city/City4";
import City5 from "./pages/city/City5";
import City6 from "./pages/city/City6";
import City7 from "./pages/city/City7";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/signup";
import SignupHebergeur from "./pages/signuphebergeur/signuphebergeur.js" // Import the Signup component
import ForgotPassword from "./pages/forgotpassword/ForgotPassword.jsx";
import ResetPassword from "./pages/resetpassword/ResetPassword.jsx";
import Reserve from "./components/reserve/Reserve.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import FavoritesPage from "./pages/favoritepage/FavoritesPage.jsx";
import Contact from "./pages/contacet/contact";
import Team from "./pages/Team/Team.jsx";
import LandingPage from "./pages/landing/landing.jsx";
import Success from "./components/payment/Success.js"; // Update import path
import Fail from "./components/payment/fail.js"; // Update import path
import BlogList from "./pages/Blog/BlogList.jsx";
import BlogPost from "./pages/Blogid/Blog.jsx";
import About from "./pages/About/about.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/city" element={<City />} />
        <Route path="/city1" element={<City1 />} />
        <Route path="/city2" element={<City2 />} />
        <Route path="/city3" element={<City3 />} />
        <Route path="/city4" element={<City4 />} />
        <Route path="/city5" element={<City5 />} />
        <Route path="/city6" element={<City6 />} />
        <Route path="/city7" element={<City7 />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
        <Route path="/reserve/:id" element={<Reserve />} />
        <Route path="/sighebergeur/" element={<SignupHebergeur />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Fail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
