import classes from "./menu-list.module.css";
import MenuItem, { TextSide } from "@/components/menu/menu-item";

function MenuList() {
    return (
        <ul className={classes.menuList}>
            <MenuItem
                price={8}
                title="Bunger"
                image="beef-bun.jpg"
                alt="bunger"
                desc="Asian Fusion Beef Buns - A unique twist on traditional steamed buns, these buns are filled with juicy, tender beef in an Asian-inspired sauce. Blending the best of both worlds, these buns offer a fusion of flavors in every bite. Perfect for those looking for something new and exciting, try our Asian Fusion Beef Buns today."
                textSide={TextSide.Right}
            />

            <MenuItem
                price={6}
                title="Plain pig"
                image="pig-bun.jpg"
                alt="plain pig"
                desc="Pig shaped plain Steamed Buns - A staple of Chinese cuisine, these simple yet irresistible buns are made with a light and fluffy dough, steamed to a tender texture. Perfect on their own or as a blank canvas for your favorite fillings, these plain steamed buns are a must-have for any dim sum lover."
                textSide={TextSide.Left}
            />

            <MenuItem
                price={7}
                title="The classic"
                image="steamed-bun.jpg"
                alt="steamed bun"
                desc="Steamed Pork Buns - Soft, fluffy buns filled with succulent pork and savory seasonings, steamed to perfection. A classic dim sum dish, these buns offer a warm and satisfying bite in every mouthful. Try them today and experience the authentic flavors of traditional Chinese cuisine."
                textSide={TextSide.Right}
                imagePosition="0 75%"
            />

            <MenuItem
                price={2}
                title="Xiao long bao - Soup dumpling"
                image="xiaolong.jpg"
                alt="xiao long bun"
                desc="Xiao Long Bao - These traditional Chinese steamed buns hailing from Shanghai feature a delicate pastry wrapping filled with a mouthwatering blend of savory pork, ginger, garlic and flavorful broth. Served hot in bamboo steaming baskets, these soup dumplings are a must-try for all dim sum enthusiasts"
                textSide={TextSide.Left}
            />
        </ul>
    );
}

export default MenuList;
