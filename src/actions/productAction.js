import { GET_PRODUCT_DATA, GET_PRODUCT_DATA_FAILED, FAVORITE_PRODUCTS, CHECKOUT_PRODUCTS, SEARCH_PRODUCTS, CLEAR_CHECKOUT, REMOVE_CHECKOUT_ONE_PRODUCTS, REMOVE_ALL_PRODUCT_FROM_CHECKOUT} from '../type';

export const getProductData = () => async dispatch => {
    try {
        const response = await fetch('https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all');
           const data = await response.json();
        dispatch({
            type: GET_PRODUCT_DATA,
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: GET_PRODUCT_DATA_FAILED,
            payload: {
                error: error
            }
        })
    }
};

export const favoriteProduct = (product) => {
    return{
        type: FAVORITE_PRODUCTS,
        payload: {
            product
        }
    }
};

export const checkoutProducts = (product) => {
    return{
        type: CHECKOUT_PRODUCTS,
        payload: {
            product
        }
    }
}

export const removeOneProduct = (product) => {
    return{
        type: REMOVE_CHECKOUT_ONE_PRODUCTS,
        payload: {
            product
        }
    }
}

export const removeCheckoutAllProduct = (product) => {
    return{
        type: REMOVE_ALL_PRODUCT_FROM_CHECKOUT,
        payload: {
            product
        }
    }
}

export const searchProduct = (value) => {
    return{
        type: SEARCH_PRODUCTS,
        payload: {
            value
        }
    }
}

export const clearCheckoutProducts = () => {
    return{
        type: CLEAR_CHECKOUT,
        payload: {
            
        }
    }
}