import { all } from "redux-saga/effects";
import { mainCategorySagas } from "./sagas/mainCategorySaga";
import { BrandSagas } from "./sagas/brandSaga";
import { subCategorySagas } from "./sagas/subCategorySaga";
import { ProductSagas } from "./sagas/productSaga";
import { UserSagas } from "./sagas/userSaga";
import { CartSagas } from "./sagas/cartSaga";
import { wishlistSaga } from "./sagas/wishlistSaga";
import { checkoutSaga } from "./sagas/checkoutSaga";
import { newsLetterSagas } from "./sagas/newsLetterSaga";
import { contactSagas } from "./sagas/contactSaga";


export default function* rootSaga() {
    yield all([
        mainCategorySagas(),
        subCategorySagas(),
        BrandSagas(),
        ProductSagas(),
        UserSagas(),
        CartSagas(),
        wishlistSaga(),
        checkoutSaga(),
        newsLetterSagas(),
        contactSagas(),
    ])
}