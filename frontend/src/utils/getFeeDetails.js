const getFeeDetails = (min, max) => {
    const str = min == "0" ?
        "Free" : max === min ?
        min : `${min} - ${max}` 

    return str
}

export default getFeeDetails