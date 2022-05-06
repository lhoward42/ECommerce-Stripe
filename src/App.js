import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page.jsx";
import NotFound from "./components/not-found.jsx";
import SingleProduct from "./components/single-product/single-product.jsx";
import Shop from "./components/pages/shop/shop";
import CartPage from "./components/pages/cart-page/cart-page.jsx";
import Checkout from "./components/checkout/checkout";
import Success from "./components/checkout/stripe-checkout/success.jsx";
import Canceled from "./components/checkout/stripe-checkout/canceled.jsx";
import Portal from "./components/auth/portal.jsx";
import CreateProduct from "./components/admin/products/create-product.jsx";
import UpdateProduct from "./components/admin/products/update-product.jsx";
import "./App.scss";
import { useEffect, useState } from "react/cjs/react.development";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(localStorage.setItem("token", newToken));
  };
  
  const clearToken = () => {
    localStorage.clear();
    setToken("");
  }


  return (
    <div className='App'>
      <Routes>
        
        <Route exact path='/' element={<HomePage />} />
       
        {/* <Route path='/admin' element={<AdminPage />} /> */}
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/canceled' element={<Canceled />} /> 
        <Route path='/portal' element={<Portal token={token} logout={clearToken} newToken={updateToken} />} />
        <Route path='/admin-home/create-product' element={<CreateProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
