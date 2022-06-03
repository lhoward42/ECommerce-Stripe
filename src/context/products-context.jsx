import React, { useEffect, createContext, useState } from 'react';
import APIURL from '../utils/environment';


 export const ProductsContext = createContext();

 const ProductsContextProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState(null);
    const [property, setProperty] = useState(null);
    const [val, setVal] = useState([]); 
    const [val2, setVal2] = useState([]);
    const [category, setCategory] = useState("");
    const [newVal, setNewVal] = useState(null);
    const [newVal2, setNewVal2] = useState(null);
    const [property2, setProperty2] = useState(null);
    const [eventName, setEventName] = useState(null);
   
    const [removeVal, setRemoveVal] = useState([]);
    const [removeVal2, setRemoveVal2] = useState([]);

    useEffect(() => {
        fetchAllProducts()
    }, []) 
   
    //MUI FUNCTIONS

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    const getStyles = (val, removeVal, theme) => {
        return {
          fontWeight:
            removeVal.indexOf(val) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }
    
    //HANDLES CHANGES TO CREATE-PRODUCT.JS FORM

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

            case 'property2': {
                setProduct({ ...product, property2: value });
                break;
            }          
            case 'category': {
                setProduct({ ...product, category: value });
                break;
            }
            case 'eventName': {
                setProduct({ ...product, eventName: value });
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

    //EVENT FUNCTION CREATES A NEW PRODUCT

    const createNewProduct = async (e) => {
       e.preventDefault()
        const token = localStorage.getItem("token");
        const productData = {
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            property: product.property,
            value: val,
            property2: product.property2,
            value2: val2,
            category: product.category,
            eventName: product.eventName,
        };

        console.log(productData);
        try {
        if(token){
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
        if (data) { alert('new product created') }
        } else {
            alert('Admin must be logged in to create a product')
        }
        } catch (err) {
            console.error(err);
            
        } 
    }

    //EVENT FUNCTION UPDATES THE PRODUCT

    const updateProduct = async (e) => {

        // e.preventDefault();
        const token = localStorage.getItem("token");
        let productData = {
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            property: property,
            value: val,
            property2: property2,
            value2: val2,
            category: category,
            eventName: eventName,
        };

        try {
            if (token){
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
            alert('product successfully updated');
            setRemoveVal([])
        } else {
            alert('Admin must be logged in to update product');
        }
        } catch (err) {
            console.error( "Product did not update", err )
            alert('product could not be updated, please check fields and try again')
        }
        
    }

    //DELETE PRODUCT FROM STORE

    const deleteProduct = async (product) => { 
        const token = localStorage.getItem("token");
        
        try{
            if(token){
            const res = await fetch( 
                `${APIURL}/products/${product.id}`, {
                    method: "DELETE",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }),
                }
            );
            const data = res.json();
            console.log(data);
            alert("product successfully deleted");
            let array = await [...products];
            let index = array.indexOf(product);
            if (index !== -1){
                array.splice(index, 1);
                setProducts(array);
            };
            } else {
                alert('Admin must be logged in to delete product');
            }

        } catch (err) {
            console.error(err);
            
        }
    }

    //EVENT FUNCTIONS FOR FIRST SET OF PRODUCT ATTRIBUTES

    const handleRemoveVal = (e) => {
        console.log('val', val, removeVal)
        // const newArray = val.filter(element => 
        //     !removeVal.includes(element))
        const newArray = val.filter((item) => {
            return !removeVal.includes(item)
        })


        console.log({newArray});
            // setVal(val.length > 1 ? newArray : [])
            setVal(newArray)
            setRemoveVal([])
        //     console.log(e);

    }

    const handleInputChangeVal = (e) => {
        const { value } = e.target;
        setNewVal(value);

    }

    const handleChangeSelect = (event) => {
        const {
          target: { value },
        } = event;
        setRemoveVal(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    //EVENT FUNCTIONS FOR SECOND SET OF PRODUCT ATTRIBUTES

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

    const handleChangeSelect2 = (event) => {
        const {
          target: { value },
        } = event;
        setRemoveVal2(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const handleInputChangeVal2 = (e) => {
        const { value } = e.target;
        setNewVal2(value);

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
    eventName,
    newVal,
    newVal2,
    MenuProps,
    category,
    setCategory,
    setEventName,
    getStyles,
    handleChange,
    setNewVal,
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
    deleteProduct,
    handleChangeSelect,
    handleChangeSelect2,
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