import React, {useState, useEffect, useRef} from "react";
import {
    Avatar,
    Badge,
    Button,
    Table,
    Group,
    Text,
    ActionIcon,
    Anchor,
    ScrollArea,
    Pagination,
    Center,
    useMantineTheme, Space,
} from '@mantine/core';
import {IconDownload, IconPencil} from '@tabler/icons-react';
import GlobalController from "../controllers/controller";

import toast from "react-hot-toast";
import UserModal from "./UserModal";

const jobColors = {
    admin: 'blue',
    contributor: 'cyan',
    public: 'pink',
};

const MAX_ENTRIES_PER_PAGE = 10;

export function UserTable () {
    const controller = GlobalController.getInstance().userController;
    const [data, setData] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [totalEntries, setTotalEntries] = useState(10);
    const currentRecord = useRef(null);
    const [isOpenNewUserModal, setIsOpenNewUserModal] = useState(false)

    const editRole = (ref) => {
        updateUser(ref, ref.role);
    }
    const updateUser = (record, newRole) => {
        controller.updateRole(record, newRole).then((res) => {
            if(res.success) {
                toast.success(res.message);
                controller.fetch_all().then((newData) => {
                    setData(newData.data);
                })
            } else {
                toast.error(res.message);
            }
        });
    }

    useEffect(() => {
        setTotalEntries(data.length);
    }, [data])
    
    useEffect(() => {
        controller.fetch_all().then((newData) => {
            setData(newData.data);
            setTotalEntries(newData.length);
            // setTimeout((e) => {
            //     setTotalEntries(data.length);
            // }, 1000)
        })
    }, []);

    const theme = useMantineTheme();
    const rows = data.map((item, idx) => (
        (idx < currPage*MAX_ENTRIES_PER_PAGE && idx >= (currPage - 1)*MAX_ENTRIES_PER_PAGE) ?
            (<tr key={item.id}>
            <td>
                <Group spacing="sm">
                    <Avatar size={30} src={item.avatar} radius={30} />
                    <Text fz="sm" fw={500}>
                        {item.name}
                    </Text>
                </Group>
            </td>

            <td>
                <Badge
                    color={jobColors[item.role.toLowerCase()]}
                    variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}
                >
                    {item.role}
                </Badge>
            </td>
            <td>
                <Anchor component="button" size="sm">
                    {item.email}
                </Anchor>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    {item.points}
                </Text>
            </td>
            <td>
                <Text fz="sm" c="dimmed">
                    <ActionIcon onClick={()=>{
                        GlobalController.getInstance().reportController.downloadForUser(item.id);
                    }}>
                        <IconDownload size="1rem" stroke={1.5} />
                    </ActionIcon>
                </Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Button onClick={
                        () => {
                            currentRecord.current = item;
                            setIsOpenNewUserModal(true);
                        }
                    }
                            variant="white">
                        <ActionIcon>
                            <IconPencil size="1rem" stroke={1.5} />
                        </ActionIcon>
                    </Button>
                </Group>
            </td>
        </tr>) : null
    ));

    return (
        <>
        <ScrollArea>
            <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Points</th>
                    <th>Report</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
            <UserModal
                isOpen = {isOpenNewUserModal}
                currentUserRef={currentRecord}
                onClickCloseModal={()=>setIsOpenNewUserModal(false)}
                onClickEdit={(e)=>editRole(e)}
            />
            <Space h="lg" />
            <Space h="lg" />
            <Center>
            <Pagination total={Math.ceil(totalEntries/MAX_ENTRIES_PER_PAGE)} value={currPage} onChange={setCurrPage} />
            </Center>
        </>
    );
}