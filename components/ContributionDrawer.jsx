import {Drawer, TextInput, Button, Space, Title, Table, Flex, Autocomplete, Text, Divider} from '@mantine/core';
import Contribution from '../models/contribution'
import {useEffect, useRef, useState} from "react";
import Tree from "../models/tree";
import GlobalController from "../controllers/controller";
import { toast } from 'react-hot-toast';
import tree from "../models/tree";

export default function ContributionDrawer({ isOpen, currentContributionRef, onClickCloseModal, updateRecord}) {
    const [selectedTree, setSelectedTree] = useState(Tree.empty());
    const newTreeRef = useRef(Tree.empty());
    const [searchTreeRecords, setSearchTreeRecords] = useState([]);
    const [showAddTreeForm, setShowAddTreeForm] = useState(false);
    const contributionController = GlobalController.getInstance().contributionController;
    const treeController = GlobalController.getInstance().treeController;
    const autocompleteRef = useRef(null);


    useEffect(()=>{
        setSearchTreeRecords([]);
    }, [currentContributionRef.current, isOpen]);

    function rejectContribution() {
        let contribution = Contribution.fromJson(currentContributionRef.current.toJSON());
        contribution.status = "REJECTED";
        contributionController.update(contribution).then((res)=>{
            onClickCloseModal();
            if (res.success) {
                toast.success(res.message);
                updateRecord(contribution);
            } else {
                toast.error(res.message);
            }
        })
    }

    function acceptContribution() {
        let contribution = Contribution.fromJson(currentContributionRef.current.toJSON());
        contribution.tree = selectedTree;
        contribution.status = "ACCEPTED";
        contributionController.update(contribution).then((res)=>{
            onClickCloseModal();
            if (res.success) {
                toast.success(res.message);
                updateRecord(contribution);
            } else {
                toast.error(res.message);
            }
        })
    }

    function addTree(){
        treeController.create(newTreeRef.current).then((e)=>{
            if (e.success){
                toast.success(e.message);
                const createdTree = Tree.fromJson(e.data);
                setSelectedTree(createdTree);
                setShowAddTreeForm(false);
            }else{
                toast.error(e.message);
            }
        })
    }

    function autocompleteTree(input_text){
        if(input_text.length > 0){
            treeController.search(input_text).then((res)=>{
                if(res.success){
                    console.log(res.data);
                    setSearchTreeRecords(res.data.map((e)=>Tree.fromJson(e)));
                    console.log("fiile");
                }
            })
        }
    }
    

    
    return (
        <>
            <Drawer
                tt="capitalize"
                opened={isOpen}
                onClose={onClickCloseModal}
                title={"Contribution Details"}
                overlayProps={{ opacity: 0.5, blur: 4 }}
            >
                <Space h="xl" />
                <img src={currentContributionRef.current?.image} width="250px" />
                <Space h="sm" />
                <Table withColumnBorders withBorder>
                    <tbody>
                        <tr>
                            <td>Provided Name</td>
                            <td>{currentContributionRef.current?.name??""}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{currentContributionRef.current?.description??""}</td>
                        </tr>
                        <tr>
                            <td>Contributor</td>
                            <td>{currentContributionRef.current?.user?.name??""}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>{currentContributionRef.current?.user?.email??""}</td>
                        </tr>
                        <tr>
                            <td>Submitted On</td>
                            <td>{currentContributionRef.current?.submittedOn??""}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td style={{
                                color: ((currentContributionRef.current?.status??"").toLowerCase() === "pending") ? "orange" :
                                    ((currentContributionRef.current?.status??"").toLowerCase() === "rejected") ? "red" :
                                    ((currentContributionRef.current?.status??"").toLowerCase() === "accepted") ? "green" :
                                    "blue"
                            }}><b>{((currentContributionRef.current?.status??"")??"").toUpperCase()}</b></td>
                        </tr>

                    </tbody>
                </Table>
                <Space h="md" />
                {
                    (currentContributionRef.current?.status??"").toLowerCase() === "pending" &&
                    <>
                        <Flex
                            direction="column"
                        >
                            <Divider my="sm" />
                            <Button variant="outline" onClick={rejectContribution} color="red">
                                Reject Contribution
                            </Button>
                            <Divider my="sm" />
                            {
                                !selectedTree.id ?  <Autocomplete
                                        ref={autocompleteRef}
                                        label="Assign a Tree"
                                        placeholder="Pick a tree"
                                        itemComponent={(e =>  <div onClick={_=>{
                                            setSelectedTree(e);
                                        }}>
                                            <Text>{e.name}</Text>
                                            <Text size="xs" color="dimmed">
                                                {e.scientificName}
                                            </Text>
                                        </div>)}
                                        data={searchTreeRecords}
                                        onChange={(e)=>{autocompleteTree(e)}}
                                    /> :
                                    <div>
                                        Selected Tree: {selectedTree.name}
                                    </div>
                            }
                            <Space h="md" />
                            <Button variant="outline" size="sm" color="green" disabled={!selectedTree.id} onClick={acceptContribution}>
                                Accept Contribution
                            </Button>
                            <Divider my="sm" />
                            {
                                showAddTreeForm ?
                                    <>
                                        <TextInput
                                            placeholder="Common Name of the tree"
                                            label="Common Name"
                                            defaultValue={currentContributionRef.current.name}
                                            onChange={(e)=> {newTreeRef.current.name = e.target.value}}
                                            withAsterisk
                                        />
                                        <Space h="md" />
                                        <TextInput
                                            placeholder="Scientific Name of the tree"
                                            label="Scientific Name"
                                            onChange={(e)=> {newTreeRef.current.scientificName = e.target.value}}
                                            withAsterisk
                                        />
                                        <Space h="md" />
                                        <TextInput
                                            placeholder="Description of the tree"
                                            label="Description"
                                            defaultValue={currentContributionRef.current.description}
                                            onChange={(e)=> {newTreeRef.current.description = e.target.value}}
                                        />
                                        <Space h="xl" />
                                        <Button variant="outline" size="sm" color="blue" onClick={addTree}>
                                            Add Tree
                                        </Button>
                                    </> :
                                    <Button variant="outline" size="sm" color="blue" onClick={()=>setShowAddTreeForm(true)}>
                                        Add New Tree
                                    </Button>
                        }
                        </Flex>
                    </>
                }

            </Drawer>
        </>
    );
}