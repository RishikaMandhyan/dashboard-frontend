import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";
import { Login } from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Signup from "./components/Signup";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import InventoryItem from "./pages/InventoryItem";
import Home from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="analytics" element={<Analytics />}></Route>
            <Route path="orders" element={<Orders />}></Route>
            <Route path="inventory" element={<Inventory />}></Route>
            <Route path="inventory/:id" element={<InventoryItem />}></Route>
            <Route path="payments" element={<Payments />}></Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
