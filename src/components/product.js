import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardComponents from './card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HeaderComponent from './header';
import { getProductData } from '../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';


export default function ProductComponent() {
    const dispatch = useDispatch();
    const productData = useSelector((state) => state.products.productData);
    const search = useSelector((state) => state.products.searchValue);

    const [filterBy ,setFilterBy] = useState('all');
    let data;

    if(search){
      data = productData.filter((item) => {
        return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
   }else{
    if(filterBy === 'all'){
        data = productData;
    }else{
        data = productData.filter((item) => item.type === filterBy);
    }

   }
   
    React.useEffect(() => {
        dispatch(getProductData());
      }, [dispatch])

      const filterProduct = (name) => {
        setFilterBy(name);
      };

    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <HeaderComponent />
                <Grid container justifyContent="space-between">
                    <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 5 }} className='filter'>
                        <Chip label="All items" variant='Chip Outlined' onClick={()=> filterProduct('all')} style={{ padding: '15px', background:(filterBy ==='all'? 'rgb(177 173 173)': '') }} />
                        <Chip label="Drinks" variant='Chip Outlined' onClick={()=> filterProduct('drinks')} style={{ padding: '15px', background:(filterBy ==='drinks'? 'rgb(177 173 173)': '') }} />
                        <Chip label="Fruit" variant='Chip Outlined' onClick={()=> filterProduct('fruit')} style={{ padding: '15px', background:(filterBy ==='fruit'? 'rgb(177 173 173)': '') }} />
                        <Chip label="Bakery" variant='Chip Outlined' onClick={()=> filterProduct('bakery')} style={{ padding: '15px', background:(filterBy ==='bakery'? 'rgb(177 173 173)': '') }} />
                    </Stack>
                </Grid>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    className='filter'
                    sx={{ display: { xs: 'none', sm: 'block', fontWeight: 'bold' } }}
                >
                    Tranding Items
                </Typography>
                <Grid container justifyContent='flex-start' spacing={3}>
                        {data?.map((item)=> (
                    <Grid item key={item.id}>
                            <CardComponents key={item.id} item={item} />
                    </Grid>
                        ))}
                </Grid>
            </Box>
        </Container>
    );
}
