import { ButtonHTMLAttributes, ReactElement } from "react";
import classes from "./button.module.css";
import { ColorRing } from "react-loader-spinner";
import CenterAlign from "@/layout/center-align";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    full?: boolean;
    primary?: boolean;
    danger?: boolean;
    renderComponent?: (btnClass: string) => ReactElement;
    loader?: boolean;
}

function Button(props: ButtonProps) {
    const {
        className,
        children,
        full,
        primary,
        danger,
        loader,
        renderComponent,
        ...restProps
    } = props;
    let buttonClass = "";
    if (className) {
        buttonClass = className;
    }

    if (full) {
        buttonClass += ` ${classes.full}`;
    }

    if (primary) {
        buttonClass += ` ${classes.primary}`;
    }

    if (danger) {
        buttonClass += ` ${classes.danger}`;
    }

    return renderComponent ? (
        renderComponent(classes.button)
    ) : (
        <button className={`${classes.button} ${buttonClass}`} {...restProps}>
            <CenterAlign>
                {loader ? (
                    <ColorRing
                        visible={loader}
                        height="18"
                        width="18"
                        ariaLabel="blocks-loading"
                        wrapperClass="blocks-wrapper"
                        colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                    />
                ) : (
                    children
                )}
            </CenterAlign>
        </button>
    );
}

export default Button;
