import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/home-page.jsx";
import NotFound from "./components/not-found.jsx";
import SingleProduct from "./components/single-product/single-product.jsx";
import Shop from "./components/pages/shop/shop";
import "./App.scss";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product/:id' element={<SingleProduct />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
