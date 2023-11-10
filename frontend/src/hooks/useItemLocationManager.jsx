const useItemLocationManager = (authTokens) => {
    const access = String(authTokens.access)

    const addItem = async (itemId, dayId, order) => {
        try {
            const requestBody = {
                'location': itemId,
                'day': dayId,
                'order': order
            }

            const response = await fetch("http://127.0.0.1:8000/api/day-item/", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(requestBody)
            })

            if (!response.ok) {
                console.log("Itinerary Item Creation Failed")
                return
            }

            const item = await response.json()
            return item
        }
        catch (error) {
            console.log("Error. " + error)
        }
    }

    const deleteItem = async (id) => {

        try {
            await fetch(`http://127.0.0.1:8000/api/day-item/${id}/delete/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${access}`,
                }
            })
        } 
        catch (error) {
            console.log("Error while deleting itinerary item: ", error)
        }
    }

    const updateItemOrdering = async (locations) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/update-ordering/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                },
                body: JSON.stringify({ items:locations }),
            })
    
            const data = await response.json()
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return {
        addItem,
        deleteItem,
        updateItemOrdering,
    }
}

export default useItemLocationManager