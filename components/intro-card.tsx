import classes from "./intro-card.module.css";
import Image from "next/image";

export enum Direction {
    Right = "right",
    Left = "left",
}

interface IntroCardProps {
    imageSrc: string;
    alt: string;
    desc: string[];
    direction: Direction;
    textAlign?: Direction;
}

function IntroCard(props: IntroCardProps) {
    const { imageSrc, desc, alt, direction, textAlign } = props;

    const gridClass =
        direction === Direction.Left
            ? `${classes.ltr} ${classes.grid}`
            : `${classes.rtl} ${classes.grid}`;
    const textClass =
        textAlign === Direction.Left
            ? `${classes.textLeft} ${classes.text}`
            : classes.text;

    return (
        <div className={classes.introCard}>
            <div className={gridClass}>
                <div className={classes.imgWrapper}>
                    <Image
                        src={`/assets/img/${imageSrc}`}
                        alt={alt}
                        fill
                        sizes="(min-width: 720px) 500px,
                                33vw"
                        style={{
                            objectFit: "cover",
                        }}
                    />
                </div>
                <article className={textClass}>
                    {desc.map((text, index) => (
                        <p key={index + "_introCardText"}>{text}</p>
                    ))}
                </article>
            </div>
        </div>
    );
}

export default IntroCard;
