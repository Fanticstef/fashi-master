import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import FaqPage from "./pages/FaqPage"
import PageNotFound from "./pages/PageNotFound"
import ProductPage from "./pages/ProductPage"
import ContactUsPage from "./pages/ContactUsPage"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ShoppingCartPage from "./pages/ShoppingCartPage"

// admin
import AdminHome from "./admin/home/AdminHome"
import MainCategory from "./admin/mainCategory/MainCategory"
import AddMainCategory from "./admin/mainCategory/AddMainCategory"
import UpdateMainCategory from "./admin/mainCategory/UpdateMainCategory"
import SubCategory from "./admin/subCategory/SubCategory"
import Brand from "./admin/brand/Brand"
import AddBrand from "./admin/brand/AddBrand"
import AddSubCategory from "./admin/subCategory/AddSubCategory"
import UpdateSubCategory from "./admin/subCategory/UpdateSubCategory"
import UpdateBrand from "./admin/brand/UpdateBrand"
import Product from "./admin/product/Product"
import AddProduct from "./admin/product/AddProduct"
import UpdateProduct from "./admin/product/UpdateProduct"
import ProductDetails from "./components/ProductDetails"
import User from "./admin/user/User"
import UpdateProfile from "./pages/profile/UpdateProfile"
import ProfilePage from "./pages/profile/ProfilePage"
import WishlistPage from "./pages/profile/WishlistPage"
import CheckoutPage from "./pages/checkout/CheckoutPage"
import UpdateDetails from "./pages/checkout/UpdateDetails"
import Confirmation from "./pages/Confirmation"
import OrderPage from "./pages/profile/OrderPage"
import OrderDetailsPage from "./pages/profile/OrderDetailsPage"
import NewsLetter from "./admin/newsLetter/NewsLetter"
import UpdateNewsLetter from "./admin/newsLetter/UpdateNewsLetter"



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/:_id" element={<OrderDetailsPage />} />
        <Route path="/user-details/:_id" element={<UpdateDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:_id" element={<UpdateProfile />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin */}
        {localStorage.getItem('role') === "admin" && (
          <>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/maincategory" element={<MainCategory />} />
            <Route path="/admin/maincategory/create" element={<AddMainCategory />} />
            <Route path="/admin/maincategory/update/:_id" element={<UpdateMainCategory />} />

            <Route path="/admin/subcategory" element={<SubCategory />} />
            <Route path="/admin/subcategory/create" element={<AddSubCategory />} />
            <Route path="/admin/subcategory/update/:_id" element={<UpdateSubCategory />} />

            <Route path="/admin/brand" element={<Brand />} />
            <Route path="/admin/brand/create" element={<AddBrand />} />
            <Route path="/admin/brand/update/:_id" element={<UpdateBrand />} />

            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/product/create" element={<AddProduct />} />
            <Route path="/admin/product/update/:_id" element={<UpdateProduct />} />

            <Route path="/admin/news-letter" element={<NewsLetter />} />
            <Route path="/admin/news-letter/update/:_id" element={<UpdateNewsLetter />} />

            <Route path="/admin/user" element={<User />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
