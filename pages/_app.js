import '../styles/globals.css'
import {Toaster} from "react-hot-toast";
import {AppShell, Button, Center, Container} from "@mantine/core";
import NavbarSimpleColored from "../components/Navbar";
import {Main} from "next/document";
import {IconLoader, IconPlant2, IconSocial, IconTrash, IconUsers} from "@tabler/icons-react";
import {getCookies} from "cookies-next";
import {useState} from "react";
import {IconMail} from "@tabler/icons-react";
import Link from "next/link";

const data = [
    { link: '/', label: 'Trees', icon: IconPlant2 },
    { link: '/contributions/accepted', label: 'Accepted Contributions', icon: IconSocial },
    { link: '/contributions/pending', label: 'Pending Contributions', icon: IconLoader },
    { link: '/contributions/rejected', label: 'Rejected Contributions', icon: IconTrash },
    { link: '/users', label: 'Users', icon: IconUsers }
];


export default function App({ Component, pageProps }) {
    const [isLogin, setIsLogin] = useState(false);
  return(
      (isLogin) ?
        <>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
            <AppShell
              navbar={<NavbarSimpleColored navData={data} width={{ base: 300 }} />}
            >
              <Component {...pageProps} />
            </AppShell>

            <Center>
                <Link href="https://plant.tanmoy.online/auth/google">
                    <Button leftIcon={<IconMail size="1rem" />}>
                        Login with mail
                    </Button>
                </Link>
            </Center>
        </> :
          <Center h={400}>
              <Link href="https://plant.tanmoy.online/auth/google">
                  <Button leftIcon={<IconMail size="1rem" />}>
                      Login with mail
                  </Button>
              </Link>
          </Center>
  )
}

function handleLogin() {
    controller.login(loginRef.current.email).then(res => {
        setIsOpenLoginSignupModal(false);
        setAlertModalTitle(res.success ? "Magic Link Sent" : "Login Failed");
        setAlertModalDescription(res.message);
        setTimeout(() => {
            setIsOpenAlertModal(true);
        }, 100)
    })
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const cookies = getCookies({ req });
    let loggedIn = false;
    if(cookies.token){
        loggedIn = true;
    }
    return {
        props: {
            loggedIn
        },
    };
}