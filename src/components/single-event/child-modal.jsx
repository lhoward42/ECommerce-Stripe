import * as React from 'react';
import { CartContext } from '../../context/cart-context';
import { isInCart, hasValueAttributes, hasValueAttributes2 } from '../../helpers';
import { 
    OutlinedInput,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Container,
    Button,
    CardMedia,
    Box,
    Modal
} from '@mui/material'
import { ProductsContext } from '../../context/products-context';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal(props) {
    const { addProdWAttribute, cartItems, update } = React.useContext(CartContext);
    const { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category, eventName,qty, setQty } = props;
    const product = { title, imageUrl, price, id, description, metadata, value, property, value2, property2, category, eventName, qty, setQty };
    const [open, setOpen] = React.useState(false);
    const [selectedAttribute, setSelectedAttribute ] = React.useState(null);
    const [selectedAttribute2, setSelectedAttribute2 ] = React.useState(null);
    // const [quantity, setQuantity] = (1);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
    setOpen(false);
    };
    const select = async (e) => {
        //this needs a switch case for metadata 1 and 2
        await setSelectedAttribute(e.target.value)
        console.log(e.target.value, selectedAttribute);
      }
      const select2 = async (e) => {
        //this needs a switch case for metadata 1 and 2
        await setSelectedAttribute2(e.target.value)
        console.log(e.target.value, selectedAttribute2);
      }


    const { MenuProps } = React.useContext(ProductsContext);
    const populateQuantities = (start, end) => {
        return (
          <FormControl sx={{ width: 100 }}>
          <InputLabel id="demo-multiple-name-label">Qty</InputLabel>
          <Select
            className='select'
            input={<OutlinedInput label="Qty" />}
            placeholder='Qty'
            value={qty ? qty : "Qty"}
            onChange={onChangeQty}
            MenuProps={MenuProps}
          >
            {Array(end - start + 1)
              .fill()
              .map((_, idx) => (
                <MenuItem key={start + idx} value={start + idx}>
                  {" "}
                  {start + idx}{" "}
                </MenuItem>
              ))}
          </Select>
      </FormControl>
        );
      };    
      const onChangeQty = (e) => {
        setQty(e.target.value);
      };

  return (
    <div>
      <Button onClick={handleOpen}>Get Tickets For {eventName}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">{title}</h2>
          <p id="parent-modal-description">
            {populateQuantities(1, 100)}
            {/* select menu for first set of attributes */}       
            {hasValueAttributes(product) && (
               
                    <FormControl size="small">
                        <p>{title}</p>
                    <Select
                    sx={{ width: 100, marginTop: '.5rem', margin: '1rem' }} 
                    onChange={select}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute}
                    MenuProps={MenuProps}
                    >
                        {value !== [] && value.map(v => 
                        <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                  </FormControl> ) }
                  {hasValueAttributes2(product) && 
                    <FormControl size="small">
                    <Select 
                    sx={{ width: 100 }}
                    onChange={select2}
                    labelId="demo-multiple-name-label"
                    value={selectedAttribute2}
                    MenuProps={MenuProps}
                    >
                        {product.value2 !== null && product.value2.map(v =>
                         <MenuItem key={v} value={v}> {v} </MenuItem>)}
                    </Select>
                 </FormControl>
                }
                {!isInCart(product, cartItems, "", "") && !hasValueAttributes(product) ? (   
                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={() => addProdWAttribute(product, "", "", qty)}>
                            ADD TICKET TO CART</button> 
                    ) : <></> }
                    {isInCart(product, cartItems, "", "") && !hasValueAttributes(product) ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(product, "", "", qty)}>
                            UPDATE TICKET IN CART</button> 
                    ) : <></>
                        }
                    { 
                        !isInCart(product, cartItems, selectedAttribute, "")
                         && hasValueAttributes(product)  && selectedAttribute && !hasValueAttributes2(product) ? ( 

                        <button 
                        className='button btn-increase nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute, "", qty)}>
                            ADD {product.title} TO CART</button> 
                    ) :
                        <></> }
                        
                       {isInCart(product, cartItems, selectedAttribute, "") && hasValueAttributes(product) && !hasValueAttributes2(product) && selectedAttribute && !hasValueAttributes2(product) ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(product, selectedAttribute, "", qty)}>
                            UPDATE CART</button> 
                    ) :                
                        <></>}

                        {!isInCart(product, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(product) && selectedAttribute && hasValueAttributes2(product) && selectedAttribute2 ? (   
                        <button 
                        className='button is-black nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty)}>
                            ADD TO {product.title} CART</button> 
                    ) :
                        <></> }
                        {isInCart(product, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(product) && selectedAttribute && hasValueAttributes2(product) && selectedAttribute2 ? (
                        <button 
                        className='button is-white nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(product, selectedAttribute, selectedAttribute2, qty)}>
                            UPDATE CART</button> 
                    ) : 
                        <></>}
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}