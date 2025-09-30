import { Link, useLocation } from "react-router-dom"


const Breadcrumb = ({ data }) => {
    const location = useLocation()
    const pathNames = location.pathname.split("/").filter(Boolean)

    // Pages that require name lookup via _id
    const nameLookupPages = ["product", "profile", "user-details"];

    const isDetailsPage = pathNames.length === 2 && nameLookupPages.includes(pathNames[0])

    const getBreadcrumbName = (segment, index) => {
        if (isDetailsPage && index === 1) {
            const matchedData = data.find(x => x._id === segment)
            if (matchedData) {
                return matchedData.name
            }
        }

        return segment
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return (
        <>
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                {pathNames.map((name, index) => {
                                    const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`
                                    const isLast = index === pathNames.length - 1

                                    const formattedName = getBreadcrumbName(name, index)

                                    return isLast ? (
                                        <span key={routeTo}> {formattedName}</span>
                                    ) : (
                                        <Link key={routeTo} to={routeTo}>
                                            {formattedName}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Breadcrumb
