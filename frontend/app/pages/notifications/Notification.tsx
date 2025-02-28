import React from "react";
import { Text } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Notification = () => {
    const [expoPushToken, setExpoPushToken] = React.useState("");
    const [notification, setNotification] = React.useState<boolean |null>(false);

    const notificationListener = React.useRef<Notifications.Subscription | null>(null);
    const responseListener = React.useRef<Notifications.Subscription | null>(null);

    React.useEffect(() => {
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            const {
                notification: {
                    request: {
                        content: {
                            data: { screen },
                        },
                    },
                },
            } = response;

            // When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
            if (screen) {
                props.navigation.navigate(screen);
            }
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return <Text>Push Notifications Test App</Text>;
};

async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
            console.log("existingStatus", existingStatus);
        }

        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            console.log("finalStatus", finalStatus);
            return;
        }

        // Project ID can be found in app.json | app.config.js; extra > eas > projectId
        // token = (await Notifications.getExpoPushTokenAsync({ projectId: "YOUR_PROJECT_ID" })).data;
        token = (await Notifications.getExpoPushTokenAsync()).data;

        // The token should be sent to the server so that it can be used to send push notifications to the device
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            showBadge: true,
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FE9018",
        });
    }

    return token;
}


export default Notification