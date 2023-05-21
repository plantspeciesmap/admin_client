import React, { useEffect, useState } from 'react';
import { Table, Pagination, Center, TextInput } from '@mantine/core';

export const Tables = () => {
    const maxRows = 4;
    const [activePage, setPage] = useState(1);
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState('');  
    
    const loadPage = (page) => {
        const offset = (page-1) * maxRows;
        let tmp = [];
        for (let i = offset; i < Math.min(elements.length, offset + maxRows); i++) {
            tmp.push(elements[i]);            
        }
        setRows(tmp);
    }
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
      ];
      useEffect(() => {
        loadPage(1);
      }, []);
      
  return (
    <>
        <TextInput
            placeholder="Search by any field"
            mb="md"
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
        />
        <Table striped withBorder withColumnBorders>
            <thead>
                <tr>
                <th>Element position</th>
                <th>Element name</th>
                <th>Symbol</th>
                <th>Atomic mass</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((element) => (
                    <tr key={element.name}>
                    <td>{element.position}</td>
                    <td>{element.name}</td>
                    <td>{element.symbol}</td>
                    <td>{element.mass}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Center mx="auto">
            <Pagination value={activePage} onChange={(x) => {loadPage(x);setPage(x);}} total={elements.length/maxRows +1} withEdges/>
        </Center>
    </>
  )
}
