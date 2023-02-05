import Image from "next/image";
import classes from "@/components/menu/menu-item.module.css";
import fontClasses from "@/styles/utils/font.module.css";
import { Properties } from "csstype";

export enum TextSide {
    Left = "left",
    Right = "right",
}

interface MenuItemProps {
    image: string;
    alt: string;
    title: string;
    desc: string;
    textSide: TextSide;
    price: number;
    imagePosition?: string;
}

function MenuItem(props: MenuItemProps) {
    const { textSide, imagePosition, title, desc, price } = props;

    const descClassName =
        textSide === TextSide.Right
            ? `${classes.menuItem__desc} ${classes.menuItem__ml}`
            : `${classes.menuItem__desc} ${classes.menuItem__mr}`;

    const wrapperClass =
        textSide === TextSide.Right
            ? `${classes.menuItem__li} ${classes.menuItem__liDirRowReverse}`
            : `${classes.menuItem__li}`;

    const styleAttr: Properties<string> = {
        objectFit: "cover",
    };

    if (imagePosition) {
        styleAttr.objectPosition = imagePosition;
    }

    return (
        <li className={classes.menuItem}>
            <div className={wrapperClass}>
                <Image
                    src={`/assets/img/${props.image}`}
                    alt={`${props.alt}`}
                    fill={true}
                    sizes="1000px"
                    style={styleAttr}
                />

                <div className={descClassName}>
                    <h2 className={classes.menuItem__title}>{title}</h2>

                    <p className={fontClasses.italic}>{desc}</p>

                    <p className={classes.menuItem__price}>
                        <span>{price}$ - per bun</span>
                    </p>
                </div>

            </div>
        </li>
    );
}

export default MenuItem;
