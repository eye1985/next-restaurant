import Image from "next/image";
import classes from "./hero.module.css";

interface HeroProps {
    title: string;
}

function Hero(props: HeroProps) {
    const { title } = props;
    return (
        <header className={classes.header}>
            <Image
                src={"/assets/img/bun.jpg"}
                alt="bun"
                fill={true}
                style={{
                    objectFit: "cover",
                }}
            />

            <h1 className={classes.h1}>{title}</h1>
        </header>
    );
}

export default Hero;
