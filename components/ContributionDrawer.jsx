import {Drawer, TextInput, Button, Space, Title, Table} from '@mantine/core';
import Contribution from '../models/contribution'
import {useEffect, useRef} from "react";

export default function ContributionDrawer({ isOpen, currentContributionRef, onClickCloseModal, onClickSave, onClickEdit }) {
    const contributionRef = useRef(Contribution.empty())
    useEffect(()=>{
        contributionRef.current = currentContributionRef.current;
    },[isOpen])
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
                <Table withColumnBorders withBorder>
                    <img src={contributionRef.current?.} />
                    <tbody>
                        <tr>
                            <td>Provided Name</td>
                            <td>{contributionRef.current?.name??""}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{contributionRef.current?.description??""}</td>
                        </tr>
                        <tr>
                            <td>Contributor</td>
                            <td>{contributionRef.current?.user?.name??""}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>{contributionRef.current?.user?.email??""}</td>
                        </tr>
                        <tr>
                            <td>Submitted On</td>
                            <td>{contributionRef.current?.submittedOn??""}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td style={{
                                color: (contributionRef.current?.status.toLowerCase() === "pending") ? "orange" :
                                    (contributionRef.current?.status.toLowerCase() === "rejected") ? "red" :
                                    (contributionRef.current?.status.toLowerCase() === "accepted") ? "green" :
                                    "blue"
                            }}><b>{(contributionRef.current?.status??"").toUpperCase()}</b></td>
                        </tr>

                    </tbody>
                </Table>
                {/*<TextInput*/}
                {/*    placeholder="Suggested tree name of the contribution"*/}
                {/*    label="Name"*/}
                {/*    defaultValue={isEdit ? currentContributionRef.current.name : contributionRef.current.name}*/}
                {/*    onChange={(e)=> {contributionRef.current.name = e.target.value}}*/}
                {/*    withAsterisk*/}
                {/*/>*/}
                <Space h="md" />

                {/*<TextInput*/}
                {/*    placeholder="Scientific Name of the contribution"*/}
                {/*    label="Scientific Name"*/}
                {/*    defaultValue={isEdit ? currentContributionRef.current.scientificName : contributionRef.current.scientificName}*/}
                {/*    onChange={(e)=> {contributionRef.current.scientificName = e.target.value}}*/}
                {/*    withAsterisk*/}
                {/*/>*/}
                {/*<Space h="md" />*/}
                {/*<TextInput*/}
                {/*    placeholder="Description of the contribution"*/}
                {/*    label="Description"*/}
                {/*    defaultValue={currentContributionRef.current.description : contributionRef.current.description}*/}
                {/*    onChange={(e)=> {contributionRef.current.description = e.target.value}}*/}
                {/*/>*/}
                {/*<Space h="xl" />*/}

                <Button variant="outline"
                        onClick={()=>{onClickEdit(contributionRef.current)}}
                >
                    SUBMIT
                </Button>

            </Drawer>
        </>
    );
}