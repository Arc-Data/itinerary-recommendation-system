import { useState } from 'react'
import CreateNav from '../components/CreateNav'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 

const CreateTrip = () => {
    const [formData, setFormData] = useState({
        startDate: '',
        budget: '',
        endDate: '',
        numberOfPeople: 1,
    });

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='create'>
            <CreateNav />
            <div className="create--main-content">
                <div className="create--form-container">
                    <form className='create--form' onSubmit={handleSubmit}>
                        <div className='create--form-title'>Trip Details</div>
                        <div className='create--form-content'>
                            <div className='create--form-row'>
                                <label htmlFor="startDate" className="create--form-label">Start Date</label>
                                <DatePicker
                                    selected={formData.startDate}
                                    onChange={(date) => handleChange('startDate', date)}
                                    className='create--form-input'
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    placeholderText="Select a date"
                                    name="startDate"
                                    id="startDate"
                                />
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="budget" className='create--form-label'>Budget per Person</label>
                                <div className='create--currency'>
                                    <input
                                        type="number"
                                        name="budget"
                                        className='create--form-input budget'
                                        placeholder="100.00"
                                        value={formData.budget}
                                        onChange={(e) => handleChange('budget', e.target.value)}
                                        id="budget"
                                    />
                                    <div className='create--currency-indicator'>PHP</div>
                                </div>
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="endDate" className='create--form-label'>End Date</label>
                                <DatePicker
                                    selected={formData.endDate}
                                    onChange={(date) => handleChange('endDate', date)}
                                    className='create--form-input'
                                    dateFormat="yyyy-MM-dd"
                                    isClearable
                                    placeholderText="Select a date"
                                    name="endDate"
                                    id="endDate"
                                />
                            </div>
                            <div className='create--form-row'>
                                <label htmlFor="numberOfPeople" className='create--form-label'>Number of People</label>
                                <input
                                    type="number"
                                    name="numberOfPeople"
                                    className='create--form-input'
                                    min="1"
                                    placeholder='1'
                                    value={formData.numberOfPeople}
                                    onChange={(e) => handleChange('numberOfPeople', e.target.value)}
                                    id="numberOfPeople"
                                />
                            </div>
                        </div>
                        <div className='create--form-footer'>
                            <button className='create--form-button' type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateTrip