import Home from "./components/Home";
import Login from "./components/user/Login";
import NavBar from "./components/layout/header/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/user/Signup";
import routeNames from "./constants/routeNames";
import Cart from "./components/cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { setCart } from "./state/actions/cartActions";
import Checkout from "./components/checkout/Checkout";
import ProductPage from "./components/products/ProductPage";
import ProducOverview from "./components/products/ProductOverview";
import Filters from "./components/products/CategoryFilters";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./components/admin/Dashboard";
import OrderList from "./components/admin/OrderList";
import MainData from "./components/admin/MainData";
import UsersList from "./components/admin/UsersList";
import Account from "./components/user/Account";
import CreateProduct from "./components/admin/product/CreateProduct";
import ProductList from "./components/admin/product/ProductList";
import UpdateProduct from "./components/admin/product/UpdateProduct";
import Footer from "./components/layout/footer/Footer";
import OrderPage from "./components/orders/OrderPage";

const App = () => {
  const dispatch = useDispatch();
  const [navVisible, setNavVisible] = useState(true);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    setNavVisible(!user || user.role === 'customer');
    if (user) {
      dispatch(setCart());
    }

  }, [dispatch, user]);
  
  return (
    <>
      
      <BrowserRouter>
        {navVisible && <NavBar />}
        <main className="">
          <Routes>
            <Route exact path={routeNames.HOME} element={<Home />} />
            <Route exact path={routeNames.SIGNIN} element={<Login />} />
            <Route exact path={routeNames.SIGNUP} element={<Signup />} />
            <Route exact path={routeNames.ACCOUNT} element={<Account />} />
            <Route exact path={routeNames.CART} element={<Cart />} />
            <Route exact path={routeNames.PRODUCTPAGE} element={<ProductPage />} />
            <Route exact path={routeNames.PRODUCT_OVERVIEW} element={<ProducOverview />} />
            <Route exact path={routeNames.SEARCH} element={<Filters />} />
            <Route exact path={routeNames.CHECKOUT} element={<Checkout />} />
            <Route exact path={routeNames.ADMIN_UPDATE_PRODUCT(':pid')} element={<UpdateProduct />} />
            <Route exact path={routeNames.ORDERS} element={<OrderPage />} />


            {/* admin */}
            {/* main data */}
            <Route exact path={routeNames.ADMIN_DASHBOARD} element={
              <ProtectedRoutes >
                <Dashboard activeTab={0}>
                  <MainData />
                </Dashboard>
              </ProtectedRoutes>
            } />

            {/* all users */}
            <Route exact path={routeNames.ADMIN_USERS} element={
              <ProtectedRoutes >
                <Dashboard activeTab={4}>
                  < UsersList/>
                </Dashboard>
              </ProtectedRoutes>
            } />

            {/* all orders */}
            <Route exact path={routeNames.ADMIN_ORDERS} element={
              <ProtectedRoutes >
                <Dashboard activeTab={1}>
                  <OrderList />
                </Dashboard>
              </ProtectedRoutes>
            } />
            
            {/* all products */}
            <Route exact path={routeNames.ADMIN_PRODUCTS} element={
              <ProtectedRoutes >
                <Dashboard activeTab={2}>
                  <ProductList />
                </Dashboard>
              </ProtectedRoutes>
            } />

            {/* create product */}
            <Route exact path={routeNames.ADMIN_NEW_PRODUCT} element={
              <ProtectedRoutes >
                <Dashboard activeTab={3}>
                  <CreateProduct />
                </Dashboard>
              </ProtectedRoutes>
            } />
            
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>

  );
}

export default App;
