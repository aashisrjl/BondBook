import { Expo, ExpoPushTicket } from "expo-server-sdk";

interface NotificationMessage {
    title: string;
    body: string;
    data?: Record<string, any>;
}

const sendNotification = async (expoPushToken: string, data: NotificationMessage) => {
    const expo = new Expo({ accessToken: process.env.ACCESS_TOKEN });

    const chunks = expo.chunkPushNotifications([{ to: expoPushToken, ...data }]);
    const tickets: ExpoPushTicket[] = [];

    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }

    let response = "";

    for (const ticket of tickets) {
        if (ticket.status === "error") {
            if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
                response = "DeviceNotRegistered";
            }
        }

        if (ticket.status === "ok") {
            response = ticket.id;
        }
    }

    return response;
}