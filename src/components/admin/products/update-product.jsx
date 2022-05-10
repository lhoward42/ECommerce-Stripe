import { ProductsContext } from "../../../context/products-context";
import { useContext, useEffect, useState } from "react";
import Layout from "../../shared/layout";
import { useParams, useNavigate } from 'react-router-dom';




const UpdateProduct = (props) => {
    const { products } = useContext(ProductsContext);
    const { updateProduct, product, setProduct, setTitle, setDescription, setPrice, setImageUrl, 
    setProperty, setVal, setProperty2, setVal2, val, val2, newVal, newVal2, handleInputChangeVal,
    handleRemoveVal, handleInputChangeVal2, handleRemoveVal2, handleChangeVal, handleChangeVal2  } = useContext(ProductsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    

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
        setProperty2(product.property2);
        setVal2(product.value2);
        console.log(product);

    }, [id, navigate, products, product, setProduct, setTitle, setDescription, setPrice, setImageUrl, setProperty, setVal, setProperty2, setVal2])

    // const handleChange = (e) => {
    //     const { options } = e.target;
       
    //     const newValues = [...options]
    //     .filter(option => option.selected)
    //     .map(x => x.value);
    //     console.log("New Values", newValues);
       
    //     const removed = val.filter(element => 
    //         newValues.includes(element)
    //     )
    //     setRemoveValues(removed)
    //     console.log(removed)
    // }
    

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
                    size="8"
                    onChange={handleChangeVal2}
                    >
                    {val2.map((v, i) => (
                        <option value={v} key={i}>{v}</option>
                            )
                        )}
                    </select>
                </div>

                </div>

                <div>
                    <button type="submit">Update Product</button>
                </div>

                </div>
            </form>
            </div>
        </Layout>
    )
}

export default UpdateProduct