import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLayout from "./components/AdminLayout";
import PostAdmin from "./pages/PostAdmin";
import ProfileAdmin from "./pages/ProfileAdmin";
import DashboardAdmin from "./pages/DashboardAdmin";

function App() {

  window.location.pathname.includes("/dashboard");

  return (
    <div >
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="" element={<DashboardAdmin />} />
          <Route path="post" element={<PostAdmin />} />
          <Route path="profile" element={<ProfileAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
