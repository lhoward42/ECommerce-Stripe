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
import { DeviceSize } from '../../utils/DeviceSize';
import { useMediaQuery } from 'react-responsive';

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
    setQty(1);
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
          <InputLabel  id="demo-multiple-name-label">Qty</InputLabel>
          <Select
            className='select'
            input={<OutlinedInput label="Qty"  />}
            
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

      const isTablet = useMediaQuery({ maxWidth: DeviceSize.tablet });

  return (
    <div>
      <Button color='primary'
       variant="contained" 
       onClick={handleOpen} sx={{ margin: '1rem 0'}}
       >
         Get {title} for {eventName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}

        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: isTablet ? 250 : 500 }}>
          <h2 id="parent-modal-title">{title}</h2>
          <p id="parent-modal-description">
            
            
            <h2>$ {(Math.round(price * qty * 100)/100).toFixed(2)}</h2>
            {populateQuantities(1, 100)}
            {/* select menu for first set of attributes */}    
            <Box sx={{ display:'flex', justifyContent: 'start', alignItems: 'center'}}>  
            {hasValueAttributes(product) && (
               
                    <FormControl size="small">
                      <InputLabel id="demo-multiple-name-label">{property}</InputLabel>
                    <Select
                    sx={{ width: 100, marginTop: '.4rem', marginBottom: '.8rem' }} 
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
                      <InputLabel id="demo-multiple-name-label">{property2}</InputLabel>
                    <Select 
                    sx={{ width: 100, marginTop: '.4rem', marginLeft: '.8rem', marginBottom: '.8rem' }}
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
                </Box> 

                {!isInCart(product, cartItems, "", "") && !hasValueAttributes(product) ? (   
                        <Button
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        sx={{ marginTop: '1rem', opacity: '85%'}}
                        className='button nomad-btn'
                        onClick={() => addProdWAttribute(product, "", "", qty)}>
                            ADD TO CART</Button> 
                    ) : <></> }
                    {isInCart(product, cartItems, "", "") && !hasValueAttributes(product) ? (
                        <Button 
                        color='secondary'
                        variant='contained'
                        sx={{ marginTop: '1rem' }}
                        className='button nomad-btn'
                        id='btn-white-outline'
                        onClick={() => update(product, "", "", qty)}>
                            UPDATE CART</Button> 
                    ) : <></>
                        }
                    { 
                        !isInCart(product, cartItems, selectedAttribute, "")
                         && hasValueAttributes(product)  && selectedAttribute && !hasValueAttributes2(product) ? ( 

                        <Button 
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        
                        sx={{ marginTop: '1rem', opacity: '85%'}}
                        className='button nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute, "", qty)}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                        
                       {isInCart(product, cartItems, selectedAttribute, "") && hasValueAttributes(product) && !hasValueAttributes2(product) && selectedAttribute && !hasValueAttributes2(product) ? (
                        <Button 
                        color='secondary'
                        variant='contained'
                        className='button nomad-btn'
                        sx={{ marginTop: '1rem' }}
                        id='btn-white-outline'
                        onClick={() => update(product, selectedAttribute, "", qty)}>
                            UPDATE CART</Button> 
                    ) :                
                        <></>}

                        {!isInCart(product, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(product) && selectedAttribute && hasValueAttributes2(product) && selectedAttribute2 ? (   
                        <Button 
                        color='primary'
                        variant='contained'
                        id='btn-white-outline'
                        sx={{ marginTop: '1rem', opacity: '85%'}}
                        className='button nomad-btn'
                        onClick={() => addProdWAttribute(product, selectedAttribute, selectedAttribute2, qty)}>
                            ADD TO CART</Button> 
                    ) :
                        <></> }
                        {isInCart(product, cartItems, selectedAttribute, selectedAttribute2) && hasValueAttributes(product) && selectedAttribute && hasValueAttributes2(product) && selectedAttribute2 ? (
                        <Button 
                        color='secondary'
                        variant='contained'
                        className='button nomad-btn'
                        id='btn-white-outline'
                        sx={{ marginTop: '1rem' }}
                        onClick={() => update(product, selectedAttribute, selectedAttribute2, qty)}>
                            UPDATE CART</Button> 
                    ) : 
                        <></>}
          </p>
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}