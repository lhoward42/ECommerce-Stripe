import { ProductsContext } from "../../../context/products-context";
import { useContext, useEffect } from "react";
import Layout from "../../shared/layout";
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const UpdateProduct = (props) => {
    const { products, updateProduct, product, setProduct, setTitle, setDescription, setPrice, setImageUrl, 
    setProperty, setVal, setProperty2, setVal2, val, val2, newVal, newVal2, handleInputChangeVal,
    handleInputChangeVal2, handleRemoveVal2, removeVal2, handleRemoveVal, category, setCategory,
    removeVal, handleChangeSelect, handleChangeSelect2, MenuProps, getStyles, deleteProduct } = useContext(ProductsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    

    

    

    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id));

        if(!product){
            return navigate('/shop');
        }

        setProduct(product);
        setTitle(product.title);
        setDescription(product.description);
        setImageUrl(product.imageUrl);
        setPrice(product.price);
        setProperty(product.property);
        setVal(product.value);
        setCategory(product.category);
        setProperty2(product.property2);
        setVal2(product.value2);

        console.log(product);

    }, [id, navigate, products, product, setProduct, setTitle, setDescription, setPrice, setImageUrl, setProperty, setVal, setProperty2, setVal2])

   
    useEffect(() => 
    {console.log("val", val)}, 
    [val])

    if(!product){ return null };


    return (
        <Layout>
            
            <div className="container">
                <h3> Update Product </h3>
            <form onSubmit={updateProduct} >
               
                <div className="form-group">
                    <img src={product.imageUrl} alt='product' />
                    <label>Image URL: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="imageUrl"
                    placeholder={product.imageUrl}
                    onChange={(e) => setImageUrl(e.target.value.length > 0 ? e.target.value : product.imageUrl)}
                />

                <div className="form-group">
                  <label>Product Name: </label>            
                  <input 
                  className="form-control" 
                  type="text"
                  name="title"
                  placeholder={product.title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                    <label>Description: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="description"
                    placeholder={product.description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Price: </label>
                    <input
                    className="form-control"
                    type="number"
                    step=".01"
                    name="price"
                    placeholder={product.price}
                    onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                  <div className="form-group">
                {/* Needs to be a select menu */}
                    <label>Category: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Product Attribute: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="property"
                    placeholder={product.property}
                    onChange={(e) => setProperty(e.target.value.length === 0 ? product.property : e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label> Edit Values for Attribute: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="value"
                    placeholder={product.value}
                    onChange={handleInputChangeVal}
                    />
                     <button
                    type="button"
                    onClick={(e) => setVal([...val, newVal])}
                    >
                    Add to Values
                    </button> 
                </div>
                 <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                    <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={removeVal}
                    onChange={handleChangeSelect}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    >
                        {val.map((v) => (
                            <MenuItem
                            key={v}
                            value={v}
                            style={getStyles(v, removeVal, theme)}
                            >
                            {v}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
         
                    <button
                    type="button"
                    onClick={handleRemoveVal}
                    > 
                    Remove 
                    </button>
                    </div> 

                <div className="form-group">
                    <label> Product Attribute: </label>
                    <input
                    className="form-control"
                    type="text"
                    name="property2"
                    placeholder={product.property2}
                    onChange={(e) => setProperty2(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Edit Values for Attribute: </label> 
                    <input
                    className="form-control"
                    type="text"
                    name="value2"
                    placeholder={product.value2}
                    onChange={handleInputChangeVal2}
                    />
                    
                   

                    <button
                    type="button"
                    onClick={(e) => setVal2([...val2, newVal2])}
               >
                   Add to Values
               </button>
               </div>
               <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={removeVal2}
                    onChange={handleChangeSelect2}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    >
                    {val2.map((v) => (
                        <MenuItem
                        key={v}
                        value={v}
                        style={getStyles(v, removeVal2, theme)}
                        >
                        {v}
                        </MenuItem>
                    ))}
                    </Select>
                    </FormControl>
                    <button
                    type="button"
                    onClick={handleRemoveVal2}
                    > 
                    Remove 
                    </button>
                </div>

                <div>
                    <button type="submit">Update Product</button>
                </div>
 
                </div>
            </form>
                <div>
                <button
                type ="button" 
                onClick={() => deleteProduct(product)}
                >
                Delete Product From Store
                </button>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProduct