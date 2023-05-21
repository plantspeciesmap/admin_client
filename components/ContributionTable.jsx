import {Container, Button, Grid, TextInput, Title, Space, Flex} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, useRef } from 'react';
import ContributionDrawer from './ContributionDrawer';
import GlobalController from "../controllers/controller";
import toast from "react-hot-toast";
import Link from "next/link";

const PAGE_SIZE = 16;

// TODO: fix blank search query, not consistent
// TODO: fix after add/edit page returns to first page but pagination bar is not updated
export default function ContributionTable() {
    const controller = GlobalController.getInstance().contributionController;
    const [contributions, setContributions] = useState([]);
    const currentRecord = useRef(null);
    const [page, setPage] = useState(1);
    const [searchRecords, setSearchRecords] = useState(contributions);
    const [rows, setRows] = useState(searchRecords.slice(0, PAGE_SIZE));
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebouncedValue(query, 500);
    let [isOpenNewContributionModal, setIsOpenNewContributionModal] = useState(false)
    let [isEditContributionModal, setIsEditContributionModal] = useState(false)

    const loadPage = (page) => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRows(searchRecords.slice(from, to));
        console.log("loadpage/src", searchRecords);
    }

    const editContribution = (record) => {
        controller.update(record).then((res) => {
            if (res.success) {
                setContributions(contributions.map((e) => {
                    if (e.id === record.id) {
                        return record;
                    }
                    return e;
                }))
                setIsOpenNewContributionModal(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        })
    }

    useEffect(()=>{
        controller.fetch_all().then((records)=>{
            console.log(records);
            setContributions(records.data);
        });
    }, []);

    useEffect(() => {
        loadPage(page);
    }, [page, contributions]);

    useEffect(() => {
        setSearchRecords(
            contributions.filter(({ name, scientificName, description }) => {
                if(debouncedQuery === '') {
                    return true;
                } else if (`${name} ${scientificName} ${description}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
                    return true;
                }
                return false;
            })
        );
        console.log(debouncedQuery, debouncedQuery.length);
        loadPage(1);
    }, [debouncedQuery, contributions]);

    return (
        <Container py="sm">
            <Flex mb="md" >
                <TextInput
                    // sx={{ flexBasis: '60%' }}
                    placeholder="Search ..."
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    sx={{
                        flex: 1
                    }}
                    mr="sm"
                    radius="md"
                />
            </Flex>
            <DataTable
                withBorder
                records={rows}
                columns={[
                    {accessor: 'name', width: 40},
                    {accessor: 'tree', width: 60, render: (e) => (e.tree && e.tree.name) ? e.tree.name : "Not Assigned"},
                    {
                        accessor: 'description',
                        width: 120,
                        render: (e) => (e.description.length >= 50) ? e.description.substring(0, 50) + "..." : e.description
                    },
                    {
                        accessor: 'location',
                        width: 40,
                        render: (e) => <Link href={`https://www.google.com/maps/search/?api=1&query=${e.latitude},${e.longitude}`}>Location</Link>
                    },
                    {accessor: 'user', width: 60, render: (e) => (e.user && e.user.name) ? e.user.name : "No User"},
                    {
                        accessor: 'action',
                        textAlignment: 'center',
                        width: 40,
                        render: (contribution) =>
                            <Button variant="outline"
                                    onClick={() => {
                                        currentRecord.current = contribution;
                                        setIsOpenNewContributionModal(true);
                                        setIsEditContributionModal(true);
                                    }}
                            >
                                DETAILS
                            </Button>
                    },
                ]}
                totalRecords={searchRecords.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={(p) => setPage(p)}
                // uncomment the next line to use a custom loading text
                loadingText="Loading..."
                // uncomment the next line to display a custom text when no records were found
                noRecordsText="No records found"
                // uncomment the next line to use a custom pagination text
                paginationText={({from, to, totalRecords}) => `Records ${from} - ${to} of ${totalRecords}`}
            />
            <ContributionDrawer
                isOpen={isOpenNewContributionModal}
                isEdit={isEditContributionModal}
                currentContributionRef={currentRecord}
                onClickCloseModal={() => setIsOpenNewContributionModal(false)}
                // onClickSave={(e) => submitNewContribution(e)}
                onClickEdit={(e) => editContribution(e)}
            />
        </Container>
    );
}