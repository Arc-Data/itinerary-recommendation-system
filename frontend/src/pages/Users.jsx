import searchIcon from '/images/search.png';

function Users(props) {
    const userElements = Object.values(props.users).map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>View User</td>
        </tr>
    ))

    return (
        <>
            <div>
                <form className="admin--container">
                    <img className='search--icon' src={searchIcon} alt="Search Icon" />
                    <input 
                        type="text"
                        placeholder="Search for user..."
                        className="admin--search--bar" 
                    />
                    <button 
                        className="btn search"
                        type="button"
                    >
                        Search
                    </button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="font16">ID</th>
                        <th className="font16">First Name</th>
                        <th className="font16">Last Name</th>
                        <th className="font16">Email</th>
                        <th className="font16">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userElements}
                </tbody>
            </table>
        </>
    );
}

export default Users
