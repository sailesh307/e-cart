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
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { setCart } from "./state/actions/cartActions";



function App() {
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  // initialize the cart on app load
  useEffect(() => {
    dispatch(setCart());
  }, [dispatch]);


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
