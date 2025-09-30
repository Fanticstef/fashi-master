import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <div className="container-fluid custom-padding">
                <div className="row text-center">
                    <h1>404</h1>
                    <h3>Oop! That page can't be found</h3>
                    <p>It looks like nothing was found at this location. Maybe try a search?</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link to={'/'} className="primary-btn">Go to Home</Link>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
