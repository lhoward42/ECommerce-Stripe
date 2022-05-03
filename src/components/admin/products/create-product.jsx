import { useContext, useState } from "react";
import { ProductsContext } from "../../../context/products-context";
import Layout from "../../shared/layout";


const CreateProduct = () => {
    const { handleChange, createNewProduct } = useContext(ProductsContext);

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
                <label>Product Attributes: </label>
                <input
                className="form-control"
                type="text"
                name="property"
                placeholder="Indicate whether a product will have size or colors. Indicate one attribute at a time and enter values in next field."
                onChange={(e) => handleChange(e)}
                />
                </div>
                <div className="form-group">
                <label> Add Values for Attributes: </label>
                <input
                className="form-control"
                type="text"
                name="value"
                placeholder="Separate each value with comma. eg. Small, Medium, Large"
                onChange={(e) => handleChange(e)}
                />
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