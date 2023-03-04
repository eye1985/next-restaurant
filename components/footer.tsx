import classes from "./footer.module.css";
import ContainerLayout from "@/layout/containerLayout";
import Logo from "@/components/logo";

function Footer() {
    return (
        <footer className={classes.footer}>
            <ContainerLayout>
                <div className={classes.footerLayout}>
                    <div>
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

                    <div className={classes.footerLogoContainer}>
                        <Logo tag="div" transparent />
                    </div>
                </div>
            </ContainerLayout>
        </footer>
    );
}

export default Footer;
