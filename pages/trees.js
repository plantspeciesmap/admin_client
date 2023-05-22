import {
    IconPlant2, IconUsers, IconSocial, IconLoader, IconTrash,
} from "@tabler/icons-react";
import {AppShell} from "@mantine/core";
import NavbarSimpleColored from "../components/Navbar";
import TreeTable from "../components/TreeTable";
import {getCookies} from "cookies-next";
import {useEffect} from "react";
import GlobalController from "../controllers/controller";


export  default function () {
    return <TreeTable/>;
}

