const updateItemOrdering = async (authTokens, locations) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/update-ordering/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${String(authTokens.access)}`
            },
            body: JSON.stringify({ items:locations }),
        })

        const data = await response.json()
        console.log(data)
    }
    catch (error) {
        console.log(error)
    }
}

export default updateItemOrdering