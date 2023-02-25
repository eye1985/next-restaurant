import {InputHTMLAttributes, Ref} from "react";
import classes from "@/components/form/form-elements/form-elements.module.css";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    innerRef?: Ref<HTMLInputElement>
}
function FormInput(attrs:FormInputProps){
    const {className,innerRef, ...restProps} = attrs;

    let refObj={};
    if(innerRef){
        refObj = {
            ref:innerRef
        }
    }

    return <input className={`${classes.formInput} ${className}`} {...refObj} {...restProps} />
}

export default FormInput;