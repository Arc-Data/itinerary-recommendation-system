const AddBusiness = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="profile--main-container">
            <form action="POST" onSubmit={handleSubmit} className="business--form">
                <div className="form-section">General Information</div>
                <div className="form-section">Location Details</div>
            </form>
        </div>
    )
}

export default AddBusiness