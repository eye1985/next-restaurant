import classes from "./footer.module.css";
import Layout from "@/layout/layout";

function Footer() {
    return (
        <footer className={classes.footer}>
            <Layout>
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
            </Layout>
        </footer>
    );
}

export default Footer;
