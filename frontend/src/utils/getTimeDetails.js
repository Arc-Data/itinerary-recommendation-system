import dayjs from "dayjs"

const getTimeDetails = (string) => {
    string = string.split(":")
    return dayjs(new Date(2045, 1, 1, ...string)).format("h:mm A")
}

export default getTimeDetails