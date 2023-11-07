const getFeeDetails = (min, max) => {
    const str = min == "0" ?
        "Free" : max == min ?
        `${min} PHP` : `${min} - ${max} PHP` 

    return str
}

export default getFeeDetails