import { combineReducers } from "@reduxjs/toolkit";

import mainCategoryReducer from "./slice/maincategory/mainCategorySlice";
import subCategoryReducer from "./slice/subcategory/subCategorySlice";
import brandReducer from "./slice/brand/brandSlice";
import ProductReducer from "./slice/product/productSlice";
import UserReducer from "./slice/user/userSlice";
import CartReducer from "./slice/cart/cartSlice";
import WishlistReducer from "./slice/wishlist/wishlistSlice";
import CheckoutReducer from "./slice/checkout/checkoutSlice";
import NewsLetterReducer from "./slice/newsLetter/newsLetterSlice";
import contactReducer from "./slice/contact/contactSlice";


const rootReducer = combineReducers({
    mainCategory: mainCategoryReducer,
    subCategory: subCategoryReducer,
    brand: brandReducer,
    product: ProductReducer,
    user: UserReducer,
    cart: CartReducer,
    wishlist: WishlistReducer,
    checkout: CheckoutReducer,
    newsLetter: NewsLetterReducer,
    contact: contactReducer,
})

export default rootReducer