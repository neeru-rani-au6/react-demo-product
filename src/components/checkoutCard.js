import * as React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { checkoutProducts, removeCheckoutAllProduct, removeOneProduct } from '../actions/productAction';
import { useDispatch } from 'react-redux';


export default function CheckoutCardComponent({ item, discount }) {
    const dispatch = useDispatch();

    return (
        <>
          {discount &&
                <Typography component="div" variant="h6" style={{marginTop:'20px'}}>
                   You got these free items.
                </Typography>
            }
        <Grid columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='checkoutcard'>
            <Grid item xs={5}>
                <Typography component="div" variant="h6">
                    {item.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
                    {item.description}
                </Typography>
            </Grid>
            <Grid item xs={4}>
                <Stack direction="row" spacing={2}>
                    {!discount &&
                        <AddIcon onClick={() => dispatch(checkoutProducts(item))} className='checkoutcardicons' style={{ background: '#7FD287' }} />
                    }
                    <Typography>
                        {item.quantity}
                    </Typography>
                    {!discount &&
                        <RemoveIcon onClick={() => dispatch(removeOneProduct(item))} className='checkoutcardicons' style={{ background: '#E86F6F' }} />
                    }
                </Stack>
                {!discount &&
                    <Chip label={(item.available >= 10) ? 'Available' : 'Only ' + item.available + ' left'} variant="filled" size="small" style={{ background: (item.available >= 10) ? '#7FD287' : '#FF9345' }} className='item-availability' />
                }
            </Grid>
            <Grid item xs={2}>
                £ {item.totalAmount}
            </Grid>
            {!discount &&
                <Grid item xs={1}>
                    <CloseIcon className='checkoutcardicons' onClick={() => dispatch(removeCheckoutAllProduct(item))} style={{ background: '#7FD287' }} />
                </Grid>
            }
        </Grid>
        </>
    );
}
