import classes from "@/components/reservation/number-selector.module.css";
import {ChangeEvent} from "react";
import FormLabel from "@/components/form/form-elements/form-label";
import FormRow from "@/components/form/form-elements/form-row";

interface NumberSelectorProps{
    onChange: (event:ChangeEvent<HTMLSelectElement>)=>void;
    guests:number;
}

function NumberSelector(props:NumberSelectorProps) {
    const selectId = "numberOfPeople";
    return (
        <FormRow>
            <FormLabel htmlFor={selectId}>Total guests</FormLabel>
            <select
                onChange={props.onChange}
                className={classes.selectInput}
                id={selectId}
                defaultValue="2"
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
            </select>
        </FormRow>
    );
}

export default NumberSelector;
