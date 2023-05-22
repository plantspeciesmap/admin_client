import '../styles/globals.css'
import {Toaster} from "react-hot-toast";
import {AppShell} from "@mantine/core";
import NavbarSimpleColored from "../components/Navbar";
import {Main} from "next/document";
import {IconLoader, IconPlant2, IconSocial, IconTrash, IconUsers} from "@tabler/icons-react";

const data = [
    { link: '/', label: 'Trees', icon: IconPlant2 },
    { link: '/contributions/accepted', label: 'Accepted Contributions', icon: IconSocial },
    { link: '/contributions/', label: 'Pending Contributions', icon: IconLoader },
    { link: '/contributions/rejected', label: 'Rejected Contributions', icon: IconTrash },
    { link: '/users', label: 'Users', icon: IconUsers }
];


export default function App({ Component, pageProps }) {
  return(
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
  </>)
}
