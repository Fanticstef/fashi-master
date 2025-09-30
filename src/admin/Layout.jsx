
import Sidebar from '../components/Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-lg-3 mb-3 mb-lg-0">
                        <Sidebar />
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout
