import React, { useEffect, createContext, useState, useReducer } from 'react';
import APIURL from '../utils/environment';


 export const ProductsContext = createContext();

 const ProductsContextProvider = ({ children }) => {
    // state = {
    //      products: [],
    //      token: localStorage.getItem("token"),
    //      product: {}

    // }

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});


    useEffect(() => {
        fetchAllProducts()
    }, []) 
    
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case 'title': {
                setProduct({ ...product, title: value });
                break;
            }
            case 'description': {
                setProduct({ ...product, description: value });
                break;
            }
            case 'price': {
                setProduct({ ...product, price: value });
                break;
            }
            case 'imageUrl': {
                setProduct({ ...product, imageUrl: value });
                break;
            }
            case 'property': {
                setProduct({ ...product, property: value });
                break;
            }
            case 'value': {
                setProduct({ ...product, value: [value] });
                break;
            }
            default:
                break;
        }
        }

    const fetchAllProducts = async () => {
       try {
        let res = await fetch(`${APIURL}/products/all`, { 
            method: "GET", 
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        let data = await res.json();
        await setProducts(data); 
        await localStorage.setItem("products", JSON.stringify(data));
        console.log(data); 
    } catch (err) {
        console.error(err);
    }
    }

    const createNewProduct = async () => {
       
        let token = localStorage.getItem("token");
        let productData = {
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            property: product.property,
            value: product.value,
            property2: product.property2,
            value2: product.value2,
        };
        try {
        let res = await fetch(`${APIURL}/products/new-product`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify(productData),
           })  
        let data = await res.json();
        console.log(data);
        } catch (err) {
            console.error(err);
        } 
    }

const contextValues = {
    products,
    product,
    handleChange,
    fetchAllProducts,
    createNewProduct,
}
    
    return (
        <ProductsContext.Provider value={ contextValues }>
            {
            children
            }
        </ProductsContext.Provider>
    )
}


export default ProductsContextProvider;