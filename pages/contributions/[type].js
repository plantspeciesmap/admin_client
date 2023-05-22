import ContributionTable from "../../components/ContributionTable";
import {useRouter} from "next/router";

export  default function ({type}) {
    return <ContributionTable filterType={type.toUpperCase()} />
}

export async function getServerSideProps({ params: { type } }) {
    return {
        props: {
            type: type
        }
    }
}