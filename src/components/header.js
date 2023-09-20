import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchProduct } from '../actions/productAction';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function HeaderComponent() {
    const dispatch = useDispatch();
    const checkoutProduct = useSelector((state) => state.products.checkoutProduct);
    const favorites = useSelector((state) => state.products.favorites);
    const [smallView, setSmallView] = React.useState(null);
    const isMobileMenuOpen = Boolean(smallView);

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const navigate = useNavigate();

    const handleMobileMenuClose = () => {
        setSmallView(null);
    };

    const handleMobileMenuOpen = (event) => {
        setSmallView(event.currentTarget);
      };

    const renderMobileMenu = (
        <Menu
            anchorEl={smallView}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
             <MenuItem>
                <IconButton size="large" aria-label="" color="inherit" onClick={() => navigate('/')}>
                    <Badge badgeContent={favorites.length} color="error">
                        <HomeIcon className='icons' style={{ color: '#585858' }} />
                    </Badge>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton size="large" aria-label="" color="inherit">
                    <Badge badgeContent={favorites.length} color="error">
                        <FavoriteIcon className='icons' style={{ color: '#E86F6F' }} />
                    </Badge>
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label=""
                    color="inherit"
                >
                    <Avatar className='icons' />
                </IconButton>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label=""
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => navigate('/checkout')}
                >
                    <Badge badgeContent={checkoutProduct.length} color="error">
                        <ShoppingCartIcon className='icons' style={{ color: '#585858' }} />
                    </Badge>
                </IconButton>
            </MenuItem>
        </Menu>
    );


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className='header' position="static">
                <Toolbar style={{ margin: '10px 0', padding: 0 }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        GROCERIES
                    </Typography>
                    <Search className='search-products'>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e) => dispatch(searchProduct(e.target.value))}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }}/>
                    <Grid sx={{ display: { xs: 'none', md: 'flex' } }}> 
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={favorites.length} color="error">
                                <FavoriteIcon className='icons' style={{ color: '#E86F6F' }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Avatar className='icons' />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show new notifications"
                            color="inherit"
                            onClick={() => navigate('/checkout')}
                        >
                            <Badge badgeContent={checkoutProduct.length} color="error">
                                <ShoppingCartIcon className='icons' style={{ color: '#585858' }} />
                            </Badge>
                        </IconButton>
                    </Grid>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
