import Image from "next/image";
import classes from "@/components/menu/menu-item.module.css";
import { MouseEventHandler } from "react";
import {Properties} from "csstype";

export enum TextSide {
    Left = "left",
    Right = "right",
}

interface MenuItemProps {
    image: string;
    alt: string;
    desc: string;
    handler: MouseEventHandler;
    textSide: TextSide;
    imagePosition?:string
}

function MenuItem(props: MenuItemProps) {
    const { textSide, imagePosition } = props;

    const descClassName =
        textSide === TextSide.Right
            ? `${classes.menuItem__desc} ${classes.menuItem__descRight}`
            : `${classes.menuItem__desc} ${classes.menuItem__descLeft}`;

    const liClass =
        textSide === TextSide.Right
            ? `${classes.menuItem__li} ${classes.menuItem__liDirRowReverse}`
            : `${classes.menuItem__li}`;

    const styleAttr:Properties<string> = {
        objectFit: "cover",
    }

    if(imagePosition){
        styleAttr.objectPosition = imagePosition;
    }

    return (
        <li className={liClass}>
            <Image
                src={`/assets/img/${props.image}`}
                alt={`${props.alt}`}
                fill={true}
                style={styleAttr}
            />

            <div className={descClassName}>
                <p>{props.desc}</p>

                <p>
                    6 pieces - 10$
                    <br />
                    10 pieces - 15$
                </p>

                <button onClick={props.handler}>Add to cart</button>
            </div>
        </li>
    );
}

export default MenuItem;
