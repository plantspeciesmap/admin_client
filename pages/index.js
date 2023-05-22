import {Button, Center} from "@mantine/core";
import Link from "next/link";
import {IconMail} from "@tabler/icons-react";
import {useEffect, useState} from "react";
import ApiClient from "../controllers/api_client";

export default function home(){
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(()=>{
        setLoggedIn(ApiClient.isLoggedIn())
    }, [])

    return(
        <>
            {
                loggedIn ?
                    <Center h={400}>
                    <Link href="/trees">
                        <Button leftIcon={<IconMail size="1rem" />}>
                            Go to dashboard
                        </Button>
                    </Link>
                </Center>
                    :
                    <Center h={400}>
                        <Link href="https://plant.tanmoy.online/auth/google">
                            <Button leftIcon={<IconMail size="1rem" />}>
                                Login with mail
                            </Button>
                        </Link>
                    </Center>
            }
        </>
    );
}
