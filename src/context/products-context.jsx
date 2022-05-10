import React, { useEffect, createContext, useState, useReducer } from 'react';
import APIURL from '../utils/environment';


 export const ProductsContext = createContext();

 const ProductsContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState(null);
    const [property, setProperty] = useState(null);
    const [val, setVal] = useState([]);
    const [newVal, setNewVal] = useState(null);
    const [property2, setProperty2] = useState(null);
    const [value2, setValue2] = useState([]);
    const [removeValues, setRemoveValues] = useState([]);
    

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
            case 'property2': {
                setProduct({ ...product, property2: value });
                break;
            }
            case 'value2': {
                setProduct({ ...product, value2: [value] });
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

    

    const updateProduct = async (e) => {

        e.preventDefault();
        let token = localStorage.getItem("token");
        let productData = {
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            property: property,
            value: val,
            property2: property2,
            value2: value2,
        };

        try {
            let res = await fetch(`${APIURL}/products/${product.id}`, {
                method: 'PUT',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
                body: JSON.stringify(productData),
            })
            let data = await res.json();
            console.log(data);
            setRemoveValues([])
        } catch (err) {
            console.error( "Product did not update", err )
        }
        
    }

const contextValues = {
    products,
    product,
    removeValues,
    title,
    description,
    imageUrl,
    price,
    property,
    val,
    property2, 
    value2,
    newVal,
    setNewVal,
    handleChange,
    fetchAllProducts,
    createNewProduct,
    updateProduct,
    setProduct,
    setTitle,
    setDescription,
    setPrice,
    setImageUrl,
    setVal,
    setProperty,
    setProperty2,
    setValue2, 
    setRemoveValues

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