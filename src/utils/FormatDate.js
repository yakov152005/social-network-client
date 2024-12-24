export default function FormatDate(dateString){
        const date = new Date(dateString);
        return date.toLocaleString(
            "he-IL", {timeZone: "Asia/Jerusalem"}
        );
}