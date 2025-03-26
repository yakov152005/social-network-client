import { format, differenceInHours, differenceInMinutes, differenceInDays } from 'date-fns';

export default function formatNotificationDate(date) {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffMinutes = differenceInMinutes(now, notificationDate);
    const diffHours = differenceInHours(now, notificationDate);
    const diffDays = differenceInDays(now, notificationDate);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return format(notificationDate, "MMM d, h:mm a");
}
