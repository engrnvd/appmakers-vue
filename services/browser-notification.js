let service = {
    title: "Notification",
    duration: 5000,
    icon: null
};

service.notify = function (message, title) {
    if (title) service.title = title;
    if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
    }
    if (Notification.permission === "granted") {
        create(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                create(message);
            }
        });
    }
};

function create(message) {
    let options = {
        body: message,
        requireInteraction: true
    };
    if (service.icon) options.icon = service.icon;
    let notification = new Notification(service.title, options);
    notification.onclick = function () {
        window.focus();
    };
}

export const BrowserNotification = service;
