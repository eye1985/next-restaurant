import Image from "next/image";
import classes from "./hero.module.css";
import Logo from "@/components/logo";

function Hero() {
    return (
        <header className={classes.header}>
            <Image
                src={"/assets/img/bun.jpg"}
                alt="bun"
                sizes="(min-width: 720px) 1000px,
                    250px"
                priority
                fill
                style={{
                    objectFit: "cover",
                }}
            />

            <Logo tag="h1" />
        </header>
    );
}

export default Hero;
