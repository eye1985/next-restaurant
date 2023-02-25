import { FormEvent, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import ContainerLayout from "@/layout/containerLayout";
import HeaderTitle from "@/components/header-title";
import LoginPanel from "@/components/login/login-panel";
import FormElements from "@/components/form/form-elements/form-elements";
import Button from "@/components/form/button";
import CenterAlign from "@/layout/center-align";
import widthClasses from "../styles/utils/width.module.css";
import spacingClasses from "../styles/utils/spacing.module.css";
import errorClasses from "../styles/utils/error.module.css";
import FormLabel from "@/components/form/form-elements/form-label";
import FormRow from "@/components/form/form-elements/form-row";
import FormInput from "@/components/form/form-elements/form-input";
import { ColorRing } from "react-loader-spinner";
import {GetServerSidePropsContext} from "next";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(
        "Error logging in, please try again later"
    );

    const [useLoader, setUseLoader] = useState(false);

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        setUseLoader(true);

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res && res.url) {
            setIsError(false);
            await router.push(res.url);
        } else {
            if (res?.error) {
                setErrorMessage(res.error);
            }
            setIsError(true);
        }

        setUseLoader(false);
    };

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login page for Bao" />
            </Head>
            <ContainerLayout>
                <CenterAlign>
                    <main className={widthClasses.w100}>
                        <HeaderTitle center>Login</HeaderTitle>
                        <LoginPanel>
                            <form onSubmit={submitHandler}>
                                <FormElements>
                                    <FormRow>
                                        <FormLabel htmlFor="username">
                                            Username
                                        </FormLabel>
                                        <FormInput
                                            id="username"
                                            type="text"
                                            innerRef={usernameRef}
                                        />
                                    </FormRow>
                                    <FormRow>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <FormInput
                                            id="password"
                                            type="password"
                                            innerRef={passwordRef}
                                        />
                                    </FormRow>

                                    {isError ? (
                                        <p className={errorClasses.errorText}>
                                            {errorMessage}
                                        </p>
                                    ) : null}

                                    <Button
                                        className={spacingClasses.mt20}
                                        full
                                        primary
                                        disabled={useLoader}
                                    >
                                        <CenterAlign>
                                            {useLoader ? null:"Login"}
                                            <ColorRing
                                                visible={useLoader}
                                                height="18"
                                                width="18"
                                                ariaLabel="blocks-loading"
                                                wrapperClass="blocks-wrapper"
                                                colors={[
                                                    "#fff",
                                                    "#fff",
                                                    "#fff",
                                                    "#fff",
                                                    "#fff",
                                                ]}
                                            />
                                        </CenterAlign>
                                    </Button>
                                </FormElements>
                            </form>
                        </LoginPanel>
                    </main>
                </CenterAlign>
            </ContainerLayout>
        </>
    );
}

export async function getServerSideProps(context:GetServerSidePropsContext){
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions
    );

    if(session){
        return {
            redirect: {
                destination: "/admin",
                permanent: false,
            },
        }
    }

    return {
        props:{}
    }
}

export default Login;
