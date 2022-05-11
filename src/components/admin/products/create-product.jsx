import { useContext, useState } from "react";
import { ProductsContext } from "../../../context/products-context";
import Layout from "../../shared/layout";


const CreateProduct = () => {
    const { handleChange, createNewProduct, setVal, setVal2, val, val2, newVal, newVal2, handleInputChangeVal,
        handleRemoveVal, handleInputChangeVal2, handleRemoveVal2, handleChangeVal, handleChangeVal2 } = useContext(ProductsContext);
    
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
                {/* <label> Add Values for Attribute: </label>
                <input
                className="form-control"
                type="text"
                name="value"
                placeholder="Separate each value with comma. eg. Small, Medium, Large"
                onChange={(e) => handleChange(e)}
                /> */}
                <div className="form-group">
                <label> Edit Values for Attribute: </label>
                <input
                className="form-control"
                type="text"
                name="value"
                placeholder="set values"
                onChange={handleInputChangeVal}
                />
                <div>
                <button
                type="button"
                onClick={handleRemoveVal}
                > Remove </button>
               <button
               type="button"
               onClick={(e) => setVal([...val, newVal])}
               >
                Add to Values
               </button>
               </div>
                    <div className="select is-multiple is-medium">
                        <select 
                        multiple
                        aria-multiselectable="true"
                        size="8"
                        onChange={handleChangeVal}
                        >
                        {val.map((v, i) => (
                            <option value={v} key={i}>{v}</option>
                                )
                            )}
                        </select>
                    </div>
               
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
                <label> Add Values for Second Attribute: </label>
                {/* <input
                className="form-control"
                type="text"
                name="value2"
                placeholder="Separate each value with comma. eg. Small, Medium, Large"
                onChange={(e) => handleChange(e)}
                /> */}
                  <div className="form-group">
                    <label>Edit Values for Attribute: </label> 
                    <input
                    className="form-control"
                    type="text"
                    name="value2"
                    placeholder="add value"
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
                <div className="select is-multiple is-medium">
                    <select 
                    multiple 
                    onChange={handleChangeVal2}
                    >
                    {val2.map((v, i) => (
                        <option value={v} key={i}>{v}</option>
                            )
                        )}
                    </select>
                </div>

                </div>
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