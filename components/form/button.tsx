import { ButtonHTMLAttributes } from "react";
import classes from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    full?: boolean;
    primary?:boolean;
    danger?:boolean;
}

function Button(props: ButtonProps) {
    const { className, children, full,primary,danger, ...restProps } = props;
    let buttonClass = "";
    if (className) {
        buttonClass = className;
    }

    if (full) {
        buttonClass += ` ${classes.full}`;
    }

    if(primary){
        buttonClass += ` ${classes.primary}`;
    }

    if(danger){
        buttonClass += ` ${classes.danger}`;
    }

    return (
        <button className={`${classes.button} ${buttonClass}`} {...restProps}>
            {children}
        </button>
    );
}

export default Button;
