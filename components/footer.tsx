import classes from "./footer.module.css";
import Layout from "@/layout/layout";

function Footer() {
    return (
        <footer className={classes.footer}>
            <Layout>

                <strong>
                    Opening hours
                </strong>

                <p>
                    Sunday - Monday - closed
                </p>

                <p>
                    Tuesday - Friday - 10:00 - 21:00
                </p>

                <p>
                    Saturday - 12:00 - 21:00
                </p>
            </Layout>
        </footer>
    );
}

export default Footer;
