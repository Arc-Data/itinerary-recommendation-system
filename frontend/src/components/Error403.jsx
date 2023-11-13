const Error403 = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <p className="error-code">Error 403</p>
                <p className="error-title">Access forbidden</p>
                <p className="error-subtext">You tried to access a page you did not have prior authorization for.</p>
                <button className="error-btn">Go Back</button>
            </div>
            <img 
                src="/exclamation.svg"
                height={160} 
                width={160}/>
        </div>
    )
}

export default Error403