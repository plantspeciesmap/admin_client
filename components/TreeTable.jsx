import {Container, Button, Grid, TextInput, Title, Space, Flex} from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, useRef } from 'react';
import TreeDrawer from './TreeDrawer';
import GlobalController from "../controllers/controller";
import toast from "react-hot-toast";

const PAGE_SIZE = 16;

// TODO: fix blank search query, not consistent
// TODO: fix after add/edit page returns to first page but pagination bar is not updated
export default function TreeTable() {
  const controller = GlobalController.getInstance().treeController;
  const [trees, setTrees] = useState([]);
  const currentRecord = useRef(null);
  const [page, setPage] = useState(1);
  const [searchRecords, setSearchRecords] = useState(trees);
  const [rows, setRows] = useState(searchRecords.slice(0, PAGE_SIZE));
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 500);
  let [isOpenNewTreeModal, setIsOpenNewTreeModal] = useState(false)
  let [isEditTreeModal, setIsEditTreeModal] = useState(false)    

  const loadPage = (page) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRows(searchRecords.slice(from, to));
    console.log("loadpage/src", searchRecords);
  }

  const submitNewTree = (record) => {
    controller.create(record).then((res) => {
        if (res.success) {
            setTrees([...trees, res.data])
            setIsOpenNewTreeModal(false);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    })
  }

const editTree = (record) => {
    controller.update(record).then((res) => {
        if (res.success) {
            setTrees(trees.map((e) => {
                if (e.id === record.id) {
                    return record;
                }
                return e;
            }))
            setIsOpenNewTreeModal(false);    
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    })
  }

  useEffect(()=>{
    controller.fetch_all().then((records)=>{
        setTrees(records.data);
    });
  }, []);

  useEffect(() => {
    loadPage(page);
  }, [page, searchRecords]);

  useEffect(() => {
    setSearchRecords(
      trees.filter(({ name, scientificName, description }) => {
        if(debouncedQuery === '') {
          return true;
        } else if (`${name} ${scientificName} ${description}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())) {
          return true;
        }
        return false;
      })
    );
    console.log(debouncedQuery, debouncedQuery.length);
    setPage(1);
  }, [debouncedQuery, trees]);

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
                <Button variant="outline"
                        onClick={() => {
                            setIsOpenNewTreeModal(true);
                            setIsEditTreeModal(false);
                        }}
                >
                    Add New
                </Button>
            </Flex>
            {/*<Grid align="center" mb="md">*/}
            {/*    <Grid.Col xs={8} sm={9}>*/}

            {/*    </Grid.Col>*/}
            {/*    <Grid.Col xs={4} sm={3}>*/}

            {/*    </Grid.Col>*/}
            {/*</Grid>*/}
            <DataTable
                withBorder
                records={rows}
                columns={[
                    {accessor: 'name', width: 40},
                    {accessor: 'scientificName', width: 60},
                    {
                        accessor: 'description',
                        width: 120,
                        render: (text) => (text.description.length >= 50) ? text.description.substring(0, 50) + "..." : text.description
                    },
                    {
                        accessor: 'action',
                        textAlignment: 'center',
                        width: 40,
                        render: (tree) =>
                            <Button variant="outline"
                                    onClick={() => {
                                        currentRecord.current = tree;
                                        setIsOpenNewTreeModal(true);
                                        setIsEditTreeModal(true);
                                    }}
                            >
                                EDIT
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
            <TreeDrawer
                isOpen={isOpenNewTreeModal}
                isEdit={isEditTreeModal}
                currentTreeRef={currentRecord}
                onClickCloseModal={() => setIsOpenNewTreeModal(false)}
                onClickSave={(e) => submitNewTree(e)}
                onClickEdit={(e) => editTree(e)}
            />
        </Container>
    );
}