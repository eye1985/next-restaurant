import Image from "next/image";
import classes from "./hero.module.css";
import Logo from "@/components/logo";


function Hero() {
    return (
        <header className={classes.header}>
            <Image
                src={"/assets/img/bun.jpg"}
                alt="bun"
                priority
                fill={true}
                style={{
                    objectFit: "cover",
                }}
            />

            <Logo tag="h1" />
        </header>
    );
}

export default Hero;
