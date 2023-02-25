import {LabelHTMLAttributes} from "react";
import classes from "@/components/form/form-elements/form-elements.module.css";

function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
    const { className, htmlFor, children } = props;

    let classStr = "";
    if(className){
        classStr = className;
    }

    return (
        <label className={`${classes.formLabel} ${classStr}`} htmlFor={htmlFor} {...props}>
            {children}
        </label>
    );
}

export default FormLabel;