import { Link } from "react-router-dom"

const Business = () => {
    return (
        <div>
            <div className="business--header">
                <p className="header-title">Business</p>
                <Link to="add">
                    <button className="business--btn">
                        <img src="/plus.svg" />
                        <p>Add Business</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Business