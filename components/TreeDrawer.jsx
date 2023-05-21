import { Drawer, TextInput, Button } from '@mantine/core';
import Tree from '../models/tree'
import {useEffect, useRef} from "react";

export default function TreeDrawer({ isOpen, isEdit, currentTreeRef, onClickCloseModal, onClickSave, onClickEdit }) {
    const treeRef = useRef(Tree.empty())
    useEffect(()=>{
        if(isEdit) {
            treeRef.current = currentTreeRef.current;
        } else {
            treeRef.current = Tree.empty();
        }
    },[isOpen, isEdit])
    return (
        <>
            <Drawer
                opened={isOpen}
                onClose={onClickCloseModal}
                title={ isEdit ? "Edit Tree Details" : "Add Tree Details"}
                overlayProps={{ opacity: 0.5, blur: 4 }}
            >
                <TextInput
                    placeholder="Common Name of the tree"
                    label="Common Name"
                    defaultValue={isEdit ? currentTreeRef.current.name : treeRef.current.name}
                    onChange={(e)=> {treeRef.current.name = e.target.value}}
                    withAsterisk
                />
                <TextInput
                    placeholder="Scientific Name of the tree"
                    label="Scientific Name"
                    defaultValue={isEdit ? currentTreeRef.current.scientificName : treeRef.current.scientificName}
                    onChange={(e)=> {treeRef.current.scientificName = e.target.value}}
                    withAsterisk
                />
                <TextInput
                    placeholder="Description of the tree"
                    label="Description"
                    defaultValue={isEdit ? currentTreeRef.current.description : treeRef.current.description}
                    onChange={(e)=> {treeRef.current.description = e.target.value}}
                />

                <Button variant="light"
                        onClick={()=>{isEdit ? onClickEdit(treeRef.current) : onClickSave(treeRef.current)}}
                >
                    SUBMIT
                </Button>
            </Drawer>
        </>
    );
}