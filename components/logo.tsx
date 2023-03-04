import classes from "./logo.module.css";
import { createElement, FC, ReactNode } from "react";

interface LogoProps {
    tag: string;
    transparent?:boolean;
    autoFontSize?:boolean;
}


function Logo(props: LogoProps) {
    const {transparent, autoFontSize} = props;
    const Wrapper: FC<{ className: string; children?: ReactNode }> = ({ children, className }) => {
        return createElement(props.tag, { className }, children);
    }

    const CustomElement = Wrapper.bind(null);

    const transparentClass = transparent ? classes.transparent:"";
    const autoFontSizeClass = autoFontSize ? classes.autoFontSize:"";

    return (
        <CustomElement className={`${classes.logo} ${transparentClass} ${autoFontSizeClass}`}>
            <p>
                Bao <span className={classes.logoChar}>包</span>
            </p>
        </CustomElement>
    );
}

export default Logo;