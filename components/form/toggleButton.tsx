import { InputHTMLAttributes, KeyboardEventHandler, useRef } from "react";
import classes from "./toggleButton.module.css";

interface ToggleButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    amount?: number;
}

function ToggleButton(props: ToggleButtonProps) {
    const { label, type, id, amount, ...restProps } = props;
    const radioRef = useRef<HTMLInputElement>(null);

    const enterHandler: KeyboardEventHandler = (event) => {
        if (event.key === "Enter") {
            if (radioRef.current) {
                radioRef.current.checked = true;
            }
        }
    };

    return (
        <div className={classes.toggleButton}>
            <input id={id} type="radio" ref={radioRef} {...restProps} />
            <label htmlFor={id} tabIndex={0} onKeyUp={enterHandler}>
                <span>
                    {label}
                </span>
                {amount ? (
                    <span className={classes.amount}>
                        <span>{amount}</span>
                    </span>
                ) : null}
            </label>
        </div>
    );
}

export default ToggleButton;
