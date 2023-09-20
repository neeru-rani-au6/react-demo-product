import { GET_PRODUCT_DATA, GET_PRODUCT_DATA_FAILED, FAVORITE_PRODUCTS, CHECKOUT_PRODUCTS, SEARCH_PRODUCTS, CLEAR_CHECKOUT, REMOVE_CHECKOUT_ONE_PRODUCTS, REMOVE_ALL_PRODUCT_FROM_CHECKOUT } from '../type';

const initialState = {
    productData: [],
    error: '',
    favorites: [],
    checkoutProduct: [],
    searchValue: '',
    discountedItems: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_DATA:
            return {
                ...state,
                productData: action.payload
            }
        case GET_PRODUCT_DATA_FAILED:
            return {
                ...state,
                error: action.payload
            }
        case FAVORITE_PRODUCTS:
            const favorite = action.payload.product;
            const favProducts = [...state.favorites];
            const favIndex = favProducts.findIndex(item => item.id === favorite.id);
            if (favIndex > -1) {
                favProducts.splice(favIndex, 1);
            } else {
                favProducts.push(favorite);
            }
            return {
                ...state,
                favorites: favProducts,
            }
        case CHECKOUT_PRODUCTS:
            const data = action.payload.product;
            const checkoutProducts = [...state.checkoutProduct];
            const discountedItems = [...state.discountedItems];
            const index = checkoutProducts.findIndex(item => item.id === data.id);
            const price = Number(data.price.replace('£', ''));
            if (index > -1) {
                checkoutProducts[index].quantity += 1;
                checkoutProducts[index].totalAmount = Number((price * checkoutProducts[index].quantity).toFixed(2));
                if (data.name === 'Coca-Cola' && checkoutProducts[index].quantity >= 6 && (checkoutProducts[index].quantity % 6 === 0)) {
                    const freeItems = Math.floor((data.quantity + 1) / 6);
                    // checkoutProducts[index].quantity += freeItems;
                    const itemIndex = discountedItems.findIndex((item) => item.id === data.id);
                    if (itemIndex > -1) {
                        discountedItems[itemIndex].quantity = freeItems;
                        discountedItems[itemIndex].totalAmount = Number((price * freeItems).toFixed(2));
                    } else {
                        discountedItems.push({
                            ...data,
                            quantity: freeItems,
                            totalAmount: Number((price * freeItems).toFixed(2))
                        })
                    }
                }
                if(data.name === "Croissants" && checkoutProducts[index].quantity >= 3 && (checkoutProducts[index].quantity % 3 === 0)){
                    const coffeeItem = state.productData.find(item => item.name === "Coffee");
                    const free = Math.floor((data.quantity + 1) /3);
                    const coffeeItemIndex = discountedItems.findIndex((item) => item.id === coffeeItem.id);
                    if(coffeeItemIndex > -1){
                        discountedItems[coffeeItemIndex].quantity = free;
                        discountedItems[coffeeItemIndex].totalAmount = Number((price * free).toFixed(2));
                    }
                    else {
                        discountedItems.push({
                            ...coffeeItem,
                            quantity: free,
                            totalAmount: Number((price * free).toFixed(2))
                        })
                    }
                }
            } else {
                data.quantity = 1;
                data.totalAmount = price;
                checkoutProducts.push(data);
            }
            return {
                ...state,
                checkoutProduct: checkoutProducts,
                discountedItems,
            }
        case REMOVE_CHECKOUT_ONE_PRODUCTS:
            const removeData = action.payload.product;
            const itemPrice = Number(removeData.price.replace('£', ''));
            const removeCheckoutOneProducts = [...state.checkoutProduct];
            const allDiscountedItems = [...state.discountedItems];
            const removeOneProdIndex = removeCheckoutOneProducts.findIndex(item => item.id === removeData.id);
            removeCheckoutOneProducts[removeOneProdIndex].quantity -= 1;
            removeCheckoutOneProducts[removeOneProdIndex].totalAmount = Number((itemPrice * removeCheckoutOneProducts[removeOneProdIndex].quantity).toFixed(2));;
            if (removeCheckoutOneProducts[removeOneProdIndex].quantity === 0) {
                removeCheckoutOneProducts.splice(removeOneProdIndex, 1);
            }

            if (removeData.name === 'Coca-Cola') {
                if(removeCheckoutOneProducts[removeOneProdIndex].quantity >= 6) {
                    const freeItems = Math.floor((removeData.quantity) / 6);
                    // checkoutProducts[index].quantity += freeItems;
                    const itemIndex = allDiscountedItems.findIndex((item) => item.id === removeData.id);
                    allDiscountedItems[itemIndex].quantity = freeItems;
                    allDiscountedItems[itemIndex].totalAmount = Number((itemPrice * freeItems).toFixed(2));
                } else if(removeCheckoutOneProducts[removeOneProdIndex].quantity < 6 && allDiscountedItems.some(item=>item.id===removeData.id)){
                    allDiscountedItems.splice(removeOneProdIndex, 1);
                }
            }

            if(removeData.name === "Croissants"){
                const coffeeItem = state.productData.find(item => item.name === "Coffee");
                const coffeeItemIndex = allDiscountedItems.findIndex((item) => item.id === coffeeItem.id);
                if(removeCheckoutOneProducts[removeOneProdIndex].quantity >= 3) {
                    const freeItems = Math.floor((removeData.quantity) / 3);
                    // checkoutProducts[index].quantity += freeItems;
                    const itemIndex = allDiscountedItems.findIndex((item) => item.id === coffeeItem.id);
                    allDiscountedItems[itemIndex].quantity = freeItems;
                    allDiscountedItems[itemIndex].totalAmount = Number((itemPrice * freeItems).toFixed(2));
                } else if(removeCheckoutOneProducts[removeOneProdIndex].quantity < 3 && allDiscountedItems.some(item=>item.id===coffeeItem.id)){
                    allDiscountedItems.splice(coffeeItemIndex, 1);
                }
            }

            return {
                ...state,
                checkoutProduct: removeCheckoutOneProducts,
                discountedItems: allDiscountedItems,
            }
        case REMOVE_ALL_PRODUCT_FROM_CHECKOUT:
            const removeAllProduct = action.payload.product;
            const removeCheckoutProducts = [...state.checkoutProduct];
            const discountedItem = [...state.discountedItems];
            const removeProIndex = removeCheckoutProducts.findIndex(item => item.id === removeAllProduct.id);
            if (removeProIndex > -1) {
                removeCheckoutProducts.splice(removeProIndex, 1);
            }
            if (removeAllProduct.name === 'Coca-Cola') {
                const removeDiscountIndex = state.discountedItems.findIndex(item => item.id === removeAllProduct.id);
                if(removeDiscountIndex > -1){
                    discountedItem.splice(removeDiscountIndex,1);
                }

            }
            if(removeAllProduct.name === "Croissants" ) {
                const coffeeItemRemove = state.productData.find(item => item.name === "Coffee");
                const coffeeItemRemoveInd = state.discountedItems.findIndex(item => item.id === coffeeItemRemove.id);
                if(coffeeItemRemoveInd > -1){
                    discountedItem.splice(coffeeItemRemoveInd,1);
                }
            }

            return {
                ...state,
                checkoutProduct: removeCheckoutProducts,
                discountedItems: discountedItem
            }
        case SEARCH_PRODUCTS:
            return {
                ...state,
                searchValue: action.payload.value
            }
        case CLEAR_CHECKOUT:
            return {
                ...state,
                checkoutProduct: [],
                discountedItems: []
            }

        default:
            return state;
    }
}


export default productReducer;