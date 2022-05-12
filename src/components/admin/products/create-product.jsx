import { useContext } from "react";
import { ProductsContext } from "../../../context/products-context";
import Layout from "../../shared/layout";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

function getStyles(val, removeVal, theme) {
    return {
      fontWeight:
        removeVal.indexOf(val) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const CreateProduct = () => {
    const { handleChange, createNewProduct, setVal, setVal2, val, val2, newVal, newVal2, handleInputChangeVal,
    handleRemoveVal, handleInputChangeVal2, handleRemoveVal2,removeVal, removeVal2, handleChangeSelect,
    handleChangeSelect2, MenuProps } = useContext(ProductsContext);
    
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
                <label>Image URL: </label>
                <input
                className="form-control"
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                onChange={(e) => handleChange(e)}
                />
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
              
                <div className="form-group">
                <label> Edit Values for Attribute: </label>
                <input
                className="form-control"
                type="text"
                name="value"
                placeholder={val}
                onChange={handleInputChangeVal}
                />
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
         </div>
                <button
                type="button"
                onClick={handleRemoveVal}
                > 
                Remove 
                </button>

               <button
               type="button"
               onClick={(e) => setVal([...val, newVal])}
               >
                Add to Values
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
                    <label>Edit Values for Attribute: </label> 
                    <input
                    className="form-control"
                    type="text"
                    name="value2"
                    placeholder={val2}
                    onChange={handleInputChangeVal2}
                    />
                    <div>
                    <button
                    type="button"
                    onClick={handleRemoveVal2}
                    > Remove </button>

                    <button
                    type="button"
                    onClick={(e) => setVal2([...val2, newVal2])}
               >
                   Add to Values
               </button>
               </div>
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

                </div>

                <div>
                    <button type="submit">Create New Product</button>
                </div>
                </div>
            </form>
            </div>
        </Layout>
    )
}

export default CreateProduct 