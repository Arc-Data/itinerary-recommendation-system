import CreateNav from '../components/CreateNav'

const CreateTrip = () => {
    return (
        <div className='create'>
            <CreateNav />
            <div className="create--main-content">
                <div className="create--form-container">
                    <form className='create--form'>
                        <div className='create--form-title'>Trip Details</div>
                        <div className='create--form-content'>
                            <div className='create--form-row'>
                                <label htmlFor="start-date" className="create--form-label">Start Date</label>
                                <input type="date" name="start-date" className='create--form-input'/>
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="budget" className='create--form-label'>Budget per Person</label>
                                <div className='create--currency'>
                                    <input type="number" name="budget" className='create--form-input budget' placeholder="100.00"/>
                                    <div className='create--currency-indicator'>PHP</div>
                                </div>
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="end-date" className='create--form-label'>End Date</label>
                                <input type="date" name="end-date" className='create--form-input '/>
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="number-of-people" className='create--form-label'>Number of People</label>
                                <input type="number" name="number-of-people" className='create--form-input' min="1" placeholder='1'/>
                            </div>
                        </div>
                        <div className='create--form-footer'>
                            <button className='create--form-button'>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip