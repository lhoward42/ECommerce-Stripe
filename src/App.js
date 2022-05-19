import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page.jsx";
import NotFound from "./components/not-found.jsx";
import SingleProduct from "./components/single-product/single-product.jsx";
import SingleEvent from "./components/single-event/single-event.jsx";
import Shop from "./components/pages/shop/shop";
import EventPage from "./components/events/events.jsx";
import CartPage from "./components/pages/cart-page/cart-page.jsx";
import Checkout from "./components/checkout/checkout";
import Success from "./components/checkout/stripe-checkout/success.jsx";
import Canceled from "./components/checkout/stripe-checkout/canceled.jsx";
import Portal from "./components/auth/portal.jsx";
import CreateProduct from "./components/admin/products/create-product.jsx";
import UpdateProduct from "./components/admin/products/update-product.jsx";
import CreateEvent from "./components/admin/events/create-events.jsx";
import UpdateEvent from "./components/admin/events/update-event.jsx";
import "./App.scss";
import { useEffect, useState } from "react/cjs/react.development";
// import {DeviceSize} from './utils/DeviceSize.js'
// import { useMediaQuery } from "react-responsive";

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

  // const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });


  return (
    <div className='App'>
      <Routes>
        
        <Route exact path='/' element={<HomePage />} />
       
        {/* <Route path='/admin' element={<AdminPage />} /> */}
        <Route path='/shop' element={<Shop />} />
        <Route path='/events' element={<EventPage />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='/events/:title/:id' element={<SingleEvent />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/success' element={<Success />} />
        <Route path='/canceled' element={<Canceled />} /> 
        <Route path='/portal' element={<Portal token={token} logout={clearToken} newToken={updateToken} />} />
        <Route path='/admin-home/create-product' element={<CreateProduct />} />
        <Route path='/update-product/:id' element={<UpdateProduct />} />
        <Route path='/admin-home/create-event' element={<CreateEvent />} />
        <Route path='/admin-home/update-event' element={<UpdateEvent />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
