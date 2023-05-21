import { Container, Button, Grid, TextInput } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useDebouncedValue } from '@mantine/hooks';
import { useEffect, useState, useRef } from 'react';
import TreeDrawer from './TreeDrawer';
import AddEditTreeModal from './AddEditTreeModal';
import GlobalController from "../controllers/controller";
import toast from "react-hot-toast";

const PAGE_SIZE = 2;

// TODO: fix blank search query, not consistent
// TODO: fix after add/edit page returns to first page but pagination bar is not updated
export default function TreeTable() {
  const controller = GlobalController.getInstance().treeController;
  const [trees, setTrees] = useState([]);
  const currentRecord = useRef(null);
  const [page, setPage] = useState(1);
  const [searchrecords, setSearchRecords] = useState(trees);
  const [rows, setRows] = useState(searchrecords.slice(0, PAGE_SIZE));
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 500);
  let [isOpenNewTreeModal, setIsOpenNewTreeModal] = useState(false)
  let [isEditTreeModal, setIsEditTreeModal] = useState(false)    

  const loadPage = (page) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRows(searchrecords.slice(from, to));
    console.log("loadpage/src", searchrecords);
  }

  const submitNewTree = (record) => {
    controller.create(record).then((res) => {
        if (res.success) {
            setTrees([...trees, res.record])
            setIsOpenNewTreeModal(false);
            toast.success("New tree added");
        } else {
            toast.error("Tree not added, please try again.");
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
            toast.success("Tree updated");
        } else {
            toast.error("Tree not updated, please try again.");
        }
    })
  }

  useEffect(()=>{
    controller.fetch_all().then((records)=>{
        setTrees(records);
        // debugger;
        console.log("controller called", records);
        console.log("TREES STATE", trees);
    });
  }, []);

  useEffect(() => {
    loadPage(page);
  }, [page, trees]);

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
    loadPage(1);
  }, [debouncedQuery, trees]);

  return (
    <Container py="sm">
      <Grid align="center" mb="md">
        <Grid.Col xs={8} sm={9}>
          <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col xs={4} sm={3}>          
          <Button variant="light"
            onClick={()=>{
                setIsOpenNewTreeModal(true);
                setIsEditTreeModal(false);
            }}
          >
            Add New
          </Button>
        </Grid.Col>
      </Grid>
      <DataTable
        withBorder
        records={rows}
        columns={[
          { accessor: 'name', width: 40 },
          { accessor: 'scientificName', width: 60 },
          {
            accessor: 'description',
            width: 120,
            render: ( text ) => (text.description.length >= 50) ? text.description.substring(0, 50)+"..."  : text.description
          },
          {
            accessor: 'action',
            textAlignment: 'right',
            width: 40,
            render: (tree) => 
              <Button variant="light"
                onClick={()=>{
                    currentRecord.current = tree;
                    setIsOpenNewTreeModal(true);
                    setIsEditTreeModal(true);
                }}
              >
                EDIT
              </Button>
          },
        ]}
        totalRecords={searchrecords.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        // uncomment the next line to use a custom loading text
        loadingText="Loading..."
        // uncomment the next line to display a custom text when no records were found
        noRecordsText="No records found"
        // uncomment the next line to use a custom pagination text
        paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
      />
        <TreeDrawer
          isOpen = {isOpenNewTreeModal}
          isEdit={isEditTreeModal}
          currentTreeRef={currentRecord}
          onClickCloseModal={()=>setIsOpenNewTreeModal(false)}
          onClickSave={(e)=>submitNewTree(e)}
          onClickEdit={(e)=>editTree(e)}
        />
    </Container>
  );
}