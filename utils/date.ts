import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
const region = "Europe/Oslo";

export const dayjsNorway = (time: string | Date) => {
    return dayjs(time).tz(region);
};

export const localToNorwegianTime = (time:string) => {
    let t = dayjs(time);

    const day = t.format("DD");
    const month = t.format("MM");
    const year = t.format("YYYY");
    const hour = t.format("HH");
    const minute = t.format("mm");

    return dayjsNorway(new Date())
        .set("date", parseInt(day))
        .set("month", parseInt(month) - 1)
        .set("year", parseInt(year))
        .set("hour", parseInt(hour))
        .set("minute", parseInt(minute))
        .toDate();
}

export const fromISOToDate = (time: string) => {
    let t = dayjsNorway(time);

    const day = t.format("DD");
    const month = t.format("MM");
    const year = t.format("YYYY");
    const hour = t.format("HH");
    const minute = t.format("mm");

    return dayjs(new Date())
        .set("date", parseInt(day))
        .set("month", parseInt(month) - 1)
        .set("year", parseInt(year))
        .set("hour", parseInt(hour))
        .set("minute", parseInt(minute))
        .toDate();
};
