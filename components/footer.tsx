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
                    Monday - closed
                </p>

                <p>
                    Tuesday - 10:00 - 21:00
                </p>


            </Layout>
        </footer>
    );
}

export default Footer;
