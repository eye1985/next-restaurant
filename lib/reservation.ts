export const recursiveFirstAvailableDate = (
    selectedDate: Date,
    days: number,
    check: (date: Date) => boolean
): Date => {
    if (check(selectedDate)) {
        const addedDayDate = new Date(selectedDate);
        addedDayDate.setDate(addedDayDate.getDate() + days);
        return recursiveFirstAvailableDate(addedDayDate, 1, check);
    }

    return selectedDate;
};
