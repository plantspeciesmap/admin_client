import { Drawer, Button ,Space, Avatar, Select, Flex, Center } from '@mantine/core';
import User from '../models/user'
import React, {useEffect, useRef} from "react";

export default function UserModal({ isOpen,  currentUserRef, onClickCloseModal, onClickEdit }) {
    const userRef = useRef(User.empty())
    useEffect(()=>{
            userRef.current = currentUserRef ? currentUserRef.current : null;
    },[isOpen])
    return (
        <>
            <Drawer
                tt="capitalize"
                opened={isOpen}
                onClose={onClickCloseModal}
                title={"Edit User Role"}
                overlayProps={{ opacity: 0.5, blur: 4 }}
                style={{fontFamily: "Helvetica"}}
                withAsterisk
            >
                <Space h="xl" />
                <Flex>
                    <Center>
                <Avatar size={30} src={currentUserRef.current ? currentUserRef.current.avatar : ""} radius={30} />
                    <p style={{marginLeft: "15px", fontFamily: "Helvetica"}}>{currentUserRef.current ? currentUserRef.current.name : ""}</p>
                    </Center>
                </Flex>
                <Space h="xl" />
                <Select
                    label="Edit Role"
                    placeholder="Select A Role"
                    data = {[
                        {value: 'contributor', label: 'CONTRIBUTOR'},
                        {value: 'admin', label: 'ADMIN'},
                        {value: 'public', label: 'PUBLIC'}
                    ]}
                    defaultValue={currentUserRef.current?.role}
                    onChange={(e) => {userRef.current.role = e}}
                    withAsterisk
                />
                <Space h="md" />

                <Button variant="outline"
                        onClick={ ()=>{onClickEdit(userRef.current)} }
                >
                    UPDATE
                </Button>

            </Drawer>
        </>
    );
}