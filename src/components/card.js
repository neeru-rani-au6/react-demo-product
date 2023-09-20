import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CardActions from '@mui/material/CardActions';
import { favoriteProduct, checkoutProducts } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CardComponents({ item }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const [addProduct, setAddProduct] = React.useState(false);

  const orderHandler = (item) => {
    setAddProduct(true)
    dispatch(checkoutProducts(item))
  };
 
  return (
    <Card sx={{ display: 'flex' }} className='card'>
      <CardMedia
        component="img"
        sx={{ width: 151, objectFit: 'contain' }}
        image={item.img}
        alt=""
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }} className='card-content'>
          <Typography component="div" variant='title' style={{ fontWeight: 'bold' }}>
            {item.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontSize: '12px' }}>
            {item.description.length > 50 ? item.description.substring(0, 50) + '...' : item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Chip label={(item.available >= 10) ? 'Available' : 'Only ' + item.available + ' left'} variant="filled" size="small" style={{background: (item.available >= 10) ? '#7FD287': '#FF9345'}} className='item-availability' />
        </CardActions>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, justifyContent: 'end' }} className='card-content'>
          <Typography color="text.secondary" component="div" style={{ paddingRight: '60px' }}>
            {item.price}
          </Typography>
          <IconButton onClick={() => orderHandler(item)} aria-label="previous">
            <ShoppingCartOutlinedIcon style={{ color: '#585858' }} />
          </IconButton>
          <IconButton aria-label="next" onClick={() => dispatch(favoriteProduct(item))}>
            {favorites.some(elem => elem.id === item.id) ?
              <FavoriteIcon style={{ color: '#E86F6F' }} />
              :
              <FavoriteBorderOutlinedIcon style={{ color: '#585858' }} />
            }
          </IconButton>
        </Box>
      </Box>
      <Snackbar anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }} open={addProduct} autoHideDuration={6000} onClose={() => setAddProduct(false)}>
        <Alert onClose={() => setAddProduct(false)} severity="success" sx={{ width: '100%' }}>
          Product Added Successfully!
        </Alert>
      </Snackbar>
    </Card>
  );
}
