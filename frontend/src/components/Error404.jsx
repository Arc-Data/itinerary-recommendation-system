const Error404 = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <p className="error-code">Error 404</p>
                <p className="error-title">Page not found</p>
                <p className="error-subtext">The page you are looking for was moved, remove, renamed or might never existed.</p>
                <button className="error-btn">Go Back</button>
            </div>
            <img 
                src="/question.svg"
                height={160} 
                width={160}/>
        </div>
    )
}

export default Error404