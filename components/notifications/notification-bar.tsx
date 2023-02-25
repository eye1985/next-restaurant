import classes from "./notification-bar.module.css";

interface NotificationBarProps {
    title?: string;
    message: string;
}

function NotificationBar(props: NotificationBarProps) {
    const { title, message } = props;
    return (
        <div className={classes.notificationBar}>
            {title ? <strong>{title}</strong> : null}
            <p>{message}</p>
        </div>
    );
}

export default NotificationBar;
