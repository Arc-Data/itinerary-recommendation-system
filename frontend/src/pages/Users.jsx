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
                <form className="container">
                    <input 
                        type="text"
                        placeholder="Search for user..."
                        className="search--bar" 
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
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                {userElements}
            </table>
        </>
    );
}

export default Users
