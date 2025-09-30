import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { fetchMainCategorysRequest } from "../../redux/slice/maincategory/mainCategorySlice"
import { fetchSubCategorysRequest } from "../../redux/slice/subcategory/subCategorySlice"
import { fetchBrandsRequest } from "../../redux/slice/brand/brandSlice"


const FilterRender = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const { mainCategorys } = useSelector(state => state.mainCategory)
    const { subCategorys } = useSelector(state => state.subCategory)
    const { brands } = useSelector(state => state.brand)

    useEffect(() => {
        dispatch(fetchMainCategorysRequest())
        dispatch(fetchSubCategorysRequest())
        dispatch(fetchBrandsRequest())
    }, [dispatch])

    return (
        <>
            <div className="filter-widget">
                <h4 className="fw-title">Categories</h4>
                <ul className="filter-catagories">
                    {mainCategorys.length > 0 ? (
                        <>
                            <li><Link to='/product'>All</Link></li>
                            {mainCategorys?.map(mainCategory => (
                                <li key={mainCategory._id}>
                                    <Link to={`/product?${(() => {
                                        const params = new URLSearchParams(location.search)
                                        params.set("category", mainCategory._id)
                                        return params.toString()
                                    })()}`}>{mainCategory.name}</Link>
                                </li>
                            ))}
                        </>
                    ) : (
                        <li>Not any categories <br /> available</li>
                    )}
                </ul>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Sub Categories</h4>
                <ul className="filter-catagories">
                    {subCategorys.length > 0 ? (
                        <>
                            <li><Link to='/product'>All</Link></li>
                            {subCategorys?.map(subCategory => (
                                <li key={subCategory._id}>
                                    <Link to={`/product?${(() => {
                                        const params = new URLSearchParams(location.search)
                                        params.set("subCategory", subCategory._id)
                                        return params.toString()
                                    })()}`}>{subCategory.name}</Link>
                                </li>
                            ))}
                        </>
                    ) : (
                        <li>Not any sub categories <br /> available</li>
                    )}
                </ul>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Brand</h4>
                <div className="fw-brand-check">
                    {brands.length > 0 ? (
                        <>
                            <Link to={`/product?${(() => {
                                const params = new URLSearchParams(location.search)
                                params.delete("brand")
                                return params.toString()
                            })()}`}
                                style={{ color: '#636363' }}>
                                <div className="">
                                    <label>
                                        All
                                    </label>
                                </div>
                            </Link>
                            {brands?.map(brand => {
                                const updateParams = new URLSearchParams(location.search)
                                updateParams.set("brand", brand._id)
                                const newSearch = updateParams.toString()

                                return (
                                    <Link to={`/product?${newSearch}`} key={brand._id} style={{ color: '#636363' }}>
                                        <div>
                                            <label className="shop-brand-list">
                                                {brand.name}
                                            </label>
                                        </div>
                                    </Link>
                                )
                            })}
                        </>
                    ) : (
                        <div>Not any brands <br /> available</div>
                    )}
                </div>
            </div>
            {/* Price */}
            <div className="filter-widget">
                <h4 className="fw-title">Price</h4>
                {/* <div className="filter-range-wrap">
                                    <div className="range-slider">
                                        <div className="price-input">
                                            <input type="text" placeholder="&#8377; 100" id="minamount" />
                                            <input type="text" placeholder="&#8377; 10,000" id="maxamount" />
                                        </div>
                                    </div>
                                    <div className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                                        data-min="33" data-max="98">
                                        <div className="ui-slider-range ui-corner-all ui-widget-header"></div>
                                        <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                        <span tabindex="0" className="ui-slider-handle ui-corner-all ui-state-default"></span>
                                    </div>
                                </div> */}
                <a href="#" className="filter-btn">Filter</a>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Color</h4>
                <div className="fw-color-choose">
                    <div className="cs-item">
                        <input type="radio" id="cs-black" />
                        <label className="cs-black" htmlFor="cs-black">Black</label>
                    </div>
                    <div className="cs-item">
                        <input type="radio" id="cs-violet" />
                        <label className="cs-violet" htmlFor="cs-violet">Violet</label>
                    </div>
                    <div className="cs-item">
                        <input type="radio" id="cs-blue" />
                        <label className="cs-blue" htmlFor="cs-blue">Blue</label>
                    </div>
                    <div className="cs-item">
                        <input type="radio" id="cs-yellow" />
                        <label className="cs-yellow" htmlFor="cs-yellow">Yellow</label>
                    </div>
                    <div className="cs-item">
                        <input type="radio" id="cs-red" />
                        <label className="cs-red" htmlFor="cs-red">Red</label>
                    </div>
                    <div className="cs-item">
                        <input type="radio" id="cs-green" />
                        <label className="cs-green" htmlFor="cs-green">Green</label>
                    </div>
                </div>
            </div>
            <div className="filter-widget">
                <h4 className="fw-title">Size</h4>
                <div className="fw-size-choose">
                    <div className="sc-item">
                        <input type="radio" id="s-size" />
                        <label htmlFor="s-size">s</label>
                    </div>
                    <div className="sc-item">
                        <input type="radio" id="m-size" />
                        <label htmlFor="m-size">m</label>
                    </div>
                    <div className="sc-item">
                        <input type="radio" id="l-size" />
                        <label htmlFor="l-size">l</label>
                    </div>
                    <div className="sc-item">
                        <input type="radio" id="xs-size" />
                        <label htmlFor="xs-size">xs</label>
                    </div>
                </div>
            </div>
            {/* Tags */}
            {/* <div className="filter-widget">
                                <h4 className="fw-title">Tags</h4>
                                <div className="fw-tags">
                                    <a href="#">Towel</a>
                                    <a href="#">Shoes</a>
                                    <a href="#">Coat</a>
                                    <a href="#">Dresses</a>
                                    <a href="#">Trousers</a>
                                    <a href="#">Men's hats</a>
                                    <a href="#">Backpack</a>
                                </div>
                            </div> */}
        </>
    )
}


const ProductLayout = ({ children }) => {
    return (
        <>
            <section className="product-shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <FilterRender />
                        </div>
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductLayout
