import classes from "./footer.module.css";
import ContainerLayout from "@/layout/containerLayout";

function Footer() {
    return (
        <footer className={classes.footer}>
            <ContainerLayout>
                <div className={classes.flex}>
                    <article className={classes.openingHours}>
                        <h2>
                            Opening hours
                        </h2>

                        <p>
                            Sunday - Monday - closed
                        </p>

                        <p>
                            Tuesday - Friday - 10:00 - 21:00
                        </p>

                        <p>
                            Saturday - 12:00 - 21:00
                        </p>
                    </article>

                    <article>
                        <h2>
                            Visit us at
                        </h2>
                        <address>
                            Bao street 1009 <br />
                            6001 Bao city
                        </address>
                    </article>
                </div>
            </ContainerLayout>
        </footer>
    );
}

export default Footer;
