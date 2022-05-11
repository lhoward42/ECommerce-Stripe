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
    const [val2, setVal2] = useState([]);
    const [newVal, setNewVal] = useState(null);
    const [newVal2, setNewVal2] = useState(null);
    const [property2, setProperty2] = useState(null);
   
    const [removeVal, setRemoveVal] = useState([]);
    const [removeVal2, setRemoveVal2] = useState([]);

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
                setProduct({ ...product, value: value });
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
            value: val,
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
            value2: val2,
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
            setRemoveVal([])
        } catch (err) {
            console.error( "Product did not update", err )
        }
        
    }

    const handleRemoveVal = (e) => {
        const newArray = val.filter(element => 
            !removeVal.includes(element))
            console.log(newArray, removeVal);
            setVal(newArray)
            setRemoveVal([])
            console.log(e);
    }
    
    const handleInputChangeVal = (e) => {
        const { value } = e.target;
        setNewVal(value);

    }

   

    const handleChangeVal = (e) => {
        const { options } = e.target;
        console.log('options', options.selectedIndex)
        console.log('selected', options)
        console.log(options.selected);
        console.log(e.target[e.target.selectedIndex].text)
        const newValues = [...options]
        .filter(option => option.selected === true)
        .map(x => x.value);
        console.log("New Values", newValues);
       
        // const removed = val.filter(element => 
        //     newValues.includes(element)
        // )
        setRemoveVal(newValues)
        console.log('removed')
    }
    const handleRemoveVal2 = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newArray = val2.filter(element => 
            !removeVal2.includes(element))
            console.log(newArray);
            setVal2(newArray)
        //    const removedIndexItem =  val2.findIndex(element => 
        //         removeVal2.includes(element))
        //      setRemoveVal2(removedIndexItem!== -1 ? removeVal2[removeVal2.length-1]:[])
    }
    
    const handleChangeVal2 = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const { options } = e.target;
       
        const newValues = [...options]
        .filter(option => option.selected)
        .map(x => x.value);
        console.log("New Values", newValues, "event target", e.target);
       
        const removed = val2.filter(element => 
            newValues.includes(element)
        )
        setRemoveVal2(removed)
        console.log(removed)
    }
    
    
    const handleInputChangeVal2 = (e) => {
        const { value } = e.target;
        setNewVal2(value);

    }

const contextValues = {
    products,
    product,
    removeVal,
    removeVal2,
    title,
    description,
    imageUrl,
    price,
    property,
    val,
    property2, 
    val2,
    newVal,
    newVal2,
    handleChange,
    setNewVal,
    handleChangeVal,
    handleChangeVal2,
    handleInputChangeVal,
    handleRemoveVal,
    handleRemoveVal2,
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
    setVal2, 
    setRemoveVal,
    setRemoveVal2,
    handleInputChangeVal2

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