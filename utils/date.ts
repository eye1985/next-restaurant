import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const region = "Europe/Oslo";

export const dayjsNorway = (time:string|Date) => {
    return dayjs(time).tz(region);
}
export const formatDate = (time:string, format:string) =>{
    return dayjsNorway(time).format(format);
}
