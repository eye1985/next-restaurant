import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {FormattedDate} from "@/interfaces/reservation";

dayjs.extend(utc);
dayjs.extend(timezone);
const region = "Europe/Oslo";

export const dayjsNorway = (time: string | Date) => {
    return dayjs(time).tz(region);
};

export const localToNorwegianTime = (time: string) => {
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
};

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

export const formattedDateObj = (time: string):FormattedDate => {
    const [date, month, year, hour, minute] =
        dayjs(time).format("DD.MM.YYYY.HH.mm").split(".");

    return {
        date:parseInt(date),
        month:parseInt(month),
        year:parseInt(year),
        hour:parseInt(hour),
        minute:parseInt(minute)
    }
};

export const toDateFromFormattedDate = (formattedDate:FormattedDate) => {
    return dayjs(new Date())
        .set("date", formattedDate.date)
        .set("month", formattedDate.month-1)
        .set("year", formattedDate.year)
        .set("hour", formattedDate.hour)
        .set("minute", formattedDate.minute)
}
