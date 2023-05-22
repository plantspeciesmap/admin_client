import { useRouter } from "next/router";
import { setCookie } from 'cookies-next';
import { useEffect } from "react";
import {Center} from "@mantine/core";


function LoginContinuePage({token}){
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (token !== "NA") {
                setCookie("token", token);
                router.push("/trees");
            }else{
                router.push("/");
            }
        }
    }, [router, token])


    return(
        <>
            <Center h={40}>
                Loading...
            </Center>
        </>
    );
}

LoginContinuePage.getInitialProps = async (ctx) => {
    let { token } = ctx.query;
    if (token == null || token == undefined) {
        token = "NA";
    }
    return {token}
};

export default LoginContinuePage;