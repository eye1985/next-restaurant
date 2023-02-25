import classes from "./form-error-label.module.css";
interface FormErrorLabelProps {
    message:string;
}
function FormErrorLabel(props:FormErrorLabelProps){

    const {message} = props;

    return (
        <p className={classes.formErrorLabel}>
            {message}
        </p>
    )
}

export default FormErrorLabel;