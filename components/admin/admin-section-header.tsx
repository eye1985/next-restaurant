import {ReactNode} from "react";
import classes from "./admin-section-header.module.css";

interface SectionHeaderProps{
    children: ReactNode | ReactNode[]
}

function AdminSectionHeader(props:SectionHeaderProps){
    return <h2 className={classes.sectionHeader}>
        {props.children}
    </h2>
}

export default AdminSectionHeader;