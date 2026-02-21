

export default (time : number) : string => {

    const date = new Date(time);

    const formattedTime = date.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return formattedTime;
}