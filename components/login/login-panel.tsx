import classes from "./login-panel.module.css";
import { ReactNode } from "react";

interface LoginPanelProps {
    children: ReactNode | ReactNode[];
}

function LoginPanel({ children }: LoginPanelProps) {
    return <div className={classes.loginPanel}>{children}</div>;
}

export default LoginPanel;
