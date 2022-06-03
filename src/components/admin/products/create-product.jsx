import { useContext } from "react";
import { ProductsContext } from "../../../context/products-context";
import Layout from "../../shared/layout";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';


// function getStyles(val, removeVal, theme) {
//     return {
//       fontWeight:
//         removeVal.indexOf(val) === -1
//           ? theme.typography.fontWeightRegular
//           : theme.typography.fontWeightMedium,
//     };
//   }

const CreateProduct = () => {
    const { handleChange, createNewProduct, setVal, setVal2, val, val2, newVal, newVal2, handleInputChangeVal,
    handleRemoveVal, handleInputChangeVal2, handleRemoveVal2,removeVal, removeVal2, handleChangeSelect, category,
    handleChangeSelect2, MenuProps, getStyles, setProduct, product } = useContext(ProductsContext);
    
    const theme = useTheme();


    return (
        <Layout>
            <div className="container">
                <h3> New Product </h3>
            <form onSubmit={createNewProduct} >
                <div className="form-group">
                  <label>Product Name: </label> 
                  <input 
                  className="form-control" 
                  type="text"
                  name="title"
                  placeholder="Product Name"
                  onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="form-group">
                <label>Description: </label>
                <input
                className="form-control"
                type="text"
                name="description"
                placeholder="Description"
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="form-group">
                <label>Price: </label>
                <input
                className="form-control"
                type="number"
                step=".01"
                name="price"
                placeholder="Price"
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="form-group">
                {/* Needs to be a select menu */}
                <label>Category: </label>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={product.category}
                label="Category"
                onChange={e => setProduct({ ...product, category: e.target.value })}
                >
                <MenuItem value="product">Product</MenuItem>
                <MenuItem value="event">Event</MenuItem>
                
                </Select>
                </FormControl>


                {/* <input
                className="form-control"
                type="text"
                name="category"
                placeholder="Category"
                onChange={(e) => handleChange(e)}
                /> */}
                </div>
                <div className="form-group">
                <label>Image URL: </label>
                <input
                className="form-control"
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="form-group">
                <label>Product Attribute: </label>
                <input
                className="form-control"
                type="text"
                name="property"
                placeholder="Indicate whether a product will have size or colors. Indicate one attribute at a time and enter values in next field."
                onChange={(e) => handleChange(e)}
                />
                </div>
               
              
                <div className="form-group">
                    <div className="value-input">
                    <label> Edit Values for Attribute: </label>
                    <input
                        className="form-control"
                        type="text"
                        name="value"
                        placeholder={val}
                        onChange={handleInputChangeVal}
                    />
                   
                    <button
                    type="button"
                    onClick={(e) => setVal([...val, newVal])}
                    >
                    Add to Values
                    </button> 
                    </div>
                    <div className="value-dropdown">
                    <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Attributes</InputLabel>
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
                </div> 
               
                
                <div className="form-group">
                <label>Second Product Attribute: </label>
                <input
                className="form-control"
                type="text"
                name="property2"
                placeholder="Indicate whether a product will have size or colors. Indicate one attribute at a time and enter values in next field."
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="form-group">
                    <div className="value-input"> 
                    <label>Edit Values for Attribute: </label> 
                    <input
                    className="form-control"
                    type="text"
                    name="value2"
                    placeholder={val2}
                    onChange={handleInputChangeVal2}
                    />
                    
                   
                    
                    

                    <button
                    type="button"
                    onClick={(e) => setVal2([...val2, newVal2])}
                    >
                   Add to Values
                    </button>
                   
                    </div>
                    <div className="value-dropdown">
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Second Atrributes</InputLabel>
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
                </div>
                <div className="form-group">
                <label>Event Name: </label>
                <input
                className="form-control"
                type="text"
                name="eventName"
                placeholder="Event Name (Must Be Exact)"
                onChange={(e) => handleChange(e)}
                />
                </div>        

                <div>
                    <button className="is-black submit nomad-btn " type="submit">Create New Product</button>
                </div>
                
            </form>
            </div>
        </Layout>
    )
}

export default CreateProduct 