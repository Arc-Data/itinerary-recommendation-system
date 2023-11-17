import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import relativeTime from "dayjs/plugin/relativeTime"

const timeToNow = (datetime) => {
    dayjs.extend(utc)
    dayjs.extend(relativeTime)
    
    return dayjs(datetime).fromNow()
}

export default timeToNow