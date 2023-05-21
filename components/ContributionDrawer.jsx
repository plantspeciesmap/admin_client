import {Drawer, TextInput, Button, Space, Title, Table, Flex, Autocomplete, Text} from '@mantine/core';
import Contribution from '../models/contribution'
import {useEffect, useRef, useState} from "react";
import Tree from "../models/tree";
import GlobalController from "../controllers/controller";
import { toast } from 'react-hot-toast';

export default function ContributionDrawer({ isOpen, currentContributionRef, onClickCloseModal, onClickSave, onClickEdit }) {
    const [selectedTree, setSelectedTree] = useState(Tree.empty());
    const [searchTreeRecords, setSearchTreeRecords] = useState([]);
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
            } else {
                toast.error(res.message);
            }
            // TODO uppdate component of table also
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
                <img src={currentContributionRef.current?.image} width="300px" />
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
                {/*<TextInput*/}
                {/*    placeholder="Suggested tree name of the contribution"*/}
                {/*    label="Name"*/}
                {/*    defaultValue={isEdit ? currentcurrentContributionRef.current.name : currentContributionRef.current.name}*/}
                {/*    onChange={(e)=> {currentContributionRef.current.name = e.target.value}}*/}
                {/*    withAsterisk*/}
                {/*/>*/}
                <Space h="md" />

                {/*<TextInput*/}
                {/*    placeholder="Scientific Name of the contribution"*/}
                {/*    label="Scientific Name"*/}
                {/*    defaultValue={isEdit ? currentcurrentContributionRef.current.scientificName : currentContributionRef.current.scientificName}*/}
                {/*    onChange={(e)=> {currentContributionRef.current.scientificName = e.target.value}}*/}
                {/*    withAsterisk*/}
                {/*/>*/}
                {/*<Space h="md" />*/}
                {/*<TextInput*/}
                {/*    placeholder="Description of the contribution"*/}
                {/*    label="Description"*/}
                {/*    defaultValue={currentcurrentContributionRef.current.description : currentContributionRef.current.description}*/}
                {/*    onChange={(e)=> {currentContributionRef.current.description = e.target.value}}*/}
                {/*/>*/}
                {/*<Space h="xl" />*/}


                {
                    (currentContributionRef.current?.status??"").toLowerCase() === "pending" &&
                    <>
                        <Flex>
                            <Button variant="outline" size="sm">
                                ACCEPT
                            </Button>
                            <Space w="sm" />
                            <Button variant="outline" onClick={rejectContribution}>
                                REJECT
                            </Button>
                        </Flex>
                        {
                            !selectedTree.id ?  <Autocomplete
                                ref={autocompleteRef}
                                label="Your favorite framework/library"
                                placeholder="Pick one"
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
                    </>
                }

            </Drawer>
        </>
    );
}