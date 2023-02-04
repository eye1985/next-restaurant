import classes from "./menu-list.module.css";
import MenuItem, { TextSide } from "@/components/menu/menu-item";
import { MouseEvent } from "react";

function MenuList() {
    const handler = (event: MouseEvent) => {
        console.log(event);
    };

    return (
        <ul className={classes.menuList}>
            <MenuItem
                image="beef-bun.jpg"
                alt="beef bun"
                desc="Our best seller beef bun with our homemade bbw sauce."
                textSide={TextSide.Right}
                handler={handler}
            />

            <MenuItem
                image="pig-bun.jpg"
                alt="pig bun"
                desc="Pig shaped bun with a sweet filling. Perfect for kids."
                textSide={TextSide.Left}
                handler={handler}
            />

            <MenuItem
                image="steamed-bun.jpg"
                alt="steamed bun"
                desc="Classic steamed bun filled with homemade pork meat."
                textSide={TextSide.Right}
                imagePosition="0 75%"
                handler={handler}
            />

            <MenuItem
                image="xiaolong.jpg"
                alt="xiao long bun"
                desc="Soup filled dumpling"
                textSide={TextSide.Left}
                handler={handler}
            />
        </ul>
    );
}

export default MenuList;
