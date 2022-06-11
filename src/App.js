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
import { useEffect, useState } from "react";
// import {DeviceSize} from './utils/DeviceSize.js'
// import { useMediaQuery } from "react-responsive";
import { createTheme, ThemeProvider,  experimental_sx as sx, } from "@mui/material";
import { mdiBoxShadow } from "@mdi/js";
import ResetRequest from "./components/auth/reset-request.jsx";
import ResetPassword from "./components/auth/reset-pw.jsx";
import Footer from "./components/footer/footer.jsx";
function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#40fff9",
      },
      secondary: {
        main: "#f7f063",
      },
      success: {
        main: "#f7f063",
      }
    },
    components: {
      MuiButton: {
        variants: [
          {
            props: { color: "primary" },
            style: {
              textTransform: "none",
              border: `4px black`,
              paddingTop: '1.2rem',
              paddingBottom: '1.2rem',
              color: "rgb(59, 30, 87)",
              fontSize: '1.35rem',
              lineHeight: '1.2rem',
              opacity: '75%',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              boxShadow: 'none'
              
            },
          },

          {
            props: { color: "secondary" },
            style: {
              border: `4px black`,
              color: "#3b1e57",
              fontSize: '1.35rem',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              boxShadow: 'none'
            },
          },
          {
            props: { color: "success" },
            style: {
              border: `4px black`,
              color: "#3b1e57",
              fontSize: '1.35rem',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              boxShadow: 'none',
              padding: '1rem 0 !important'
            },
          },

        ],
      },
      // MuiCardContent: {
      //   styleOverrides: {
      //     root: sx({
      //       padding: '0'
      //     }),
      //   }
      // },
      MuiInputBase: {
        styleOverrides: {
         root: sx({ 
          //  backgroundColor: 'rgba(64, 255, 249, .5)',
          //  backgroundColor: 'rgba(247, 240, 99, .4)',
           backgroundColor: 'rgba(255, 199, 241,.8)',
          // backgroundColor: 'rgba(59, 30, 87,.4)',
         
        }),
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: sx({ 
            paddingTop: '0px',
            paddingBottom: '5px',
            color: '#3b1e57',
          }), 
        },
      },
      MuiSelect: {
        
      }
    },
  });

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(localStorage.setItem("token", newToken));
  };

  const clearToken = () => {
    localStorage.clear();
    setToken("");
  };

  // const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  return (
    <ThemeProvider theme={theme}>
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
          <Route
            path='/portal'
            element={
              <Portal
                token={token}
                logout={clearToken}
                newToken={updateToken}
              />
            }
          />
          <Route
            path='/admin-home/create-product'
            element={<CreateProduct />}
          />
          <Route path='/update-product/:id' element={<UpdateProduct />} />
          <Route path='/admin-home/create-event' element={<CreateEvent />} />
          <Route
            path='/admin-home/update-event/:id'
            element={<UpdateEvent />}
          />
          <Route path='/passwordReset/request' element={<ResetRequest />} />
          <Route path='/passwordReset/:resetToken/:id' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
