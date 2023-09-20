import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HeaderComponent from './header';
import CheckoutCardComponent from './checkoutCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { clearCheckoutProducts } from '../actions/productAction';

export default function CheckoutComponent() {
    const dispatch = useDispatch();
    const checkoutProduct = useSelector((state) => state.products.checkoutProduct);
    const discountedItems = useSelector((state) => state.products.discountedItems);
    const search = useSelector((state) => state.products.searchValue);

    const total = checkoutProduct.reduce((a, c) => a + c.totalAmount, 0);
    const discount = discountedItems.reduce((a, c) => a + c.totalAmount, 0);
    const subtotal = total + discount;

    const [order, setOrder] = React.useState(false);

    let data;
    if (search) {
        data = checkoutProduct.filter((item) => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else {
        data = checkoutProduct
    }

    const orderHandler = () => {
        setOrder(true);
        dispatch(clearCheckoutProducts());
    }

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <HeaderComponent />
                {!checkoutProduct.length ?
                    <Typography variant="h6">
                        You do not have any item.
                    </Typography>
                    :
                    <>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className='filter'
                            sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } }}
                        >
                            Checkout
                        </Typography>

                        <Grid container spacing={1}>
                            {data?.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                    <CheckoutCardComponent item={item} />
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={1}>
                            {discountedItems.length > 0 &&
                                <Typography component="div" variant="h6" style={{ marginTop: '20px' }}>
                                    You got these free items.
                                </Typography>
                            }
                            {discountedItems?.map((item) => (
                                <Grid item xs={12} key={item.id}>
                                    <CheckoutCardComponent item={item} discount={true} />
                                </Grid>
                            ))}
                        </Grid>
                        <TableContainer className='checkout-table'>
                            <Table aria-label="spanning table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={2} />
                                        <TableCell className='checkout-table-cell-text' >Subtotal</TableCell>
                                        <TableCell>£ {subtotal.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} />
                                        <TableCell className='checkout-table-cell-text' >Discount</TableCell>
                                        <TableCell>£ {discount.toFixed(2)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={2} />
                                        <TableCell className='checkout-table-cell-text' >Total</TableCell>
                                        <TableCell>£ {total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="success" onClick={orderHandler}>Checkout</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                }
                <Snackbar anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} open={order} autoHideDuration={6000} onClose={() => setOrder(false)}>
                    <Alert onClose={() => setOrder(false)} severity="success" sx={{ width: '100%' }}>
                        Order Confirmed!
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
}
