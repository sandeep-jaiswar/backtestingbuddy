export const toUnix = (date: Date) => {
    return date.toISOString().replace("T", " ").substring(0, 19);
}
