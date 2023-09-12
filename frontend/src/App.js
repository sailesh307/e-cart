import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import routeNames from "./constants/routeNames";
import Cart from "./components/cart/Cart";
import ProducOverview from "./components/ProductOverview";
import ProductPage from "./components/ProductPage";
import Search from "./components/Search";
import PaymentPage from "./components/PaymentPage";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const loading = useSelector((state) => state.loading);
  // const { error } = isError;

  return (
    <>
    {/* // <Testing /> */}
      <BrowserRouter>
        <NavBar />
        
        {loading && <Loading />}
        <main className="">
          <Routes>
            <Route exact path={routeNames.HOME} element={<Home />} />
            <Route exact path={routeNames.SIGNIN} element={<Login />} />
            <Route exact path={routeNames.SIGNUP} element={<Signup />} />
            <Route exact path={routeNames.CART} element={<Cart />} />
            <Route exact path={routeNames.PRODUCTPAGE} element={<ProductPage />} />
            <Route exact path={routeNames.PRODUCT_OVERVIEW} element={<ProducOverview />} />
            <Route exact path={routeNames.SEARCH} element={<Search />} />
            <Route exact path={routeNames.PAYMENT_PAGE} element={<PaymentPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>

  );
}

export default App;
