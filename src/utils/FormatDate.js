import {differenceInHours, differenceInMinutes, format} from "date-fns";

export default function FormatDate(dateString) {
        try {
                const date = new Date(dateString);
                const now = new Date();
                const diffMinutes = differenceInMinutes(now, date);
                const diffHours = differenceInHours(now, date);


                if (diffMinutes < 1) return "Just now";
                if (diffMinutes < 60) return `${diffMinutes}m ago`;
                if (diffHours < 24) return `${diffHours}h ago`;

                return format(date, "MMM d");
        } catch (error) {
                return "Unknown date";
        }
};