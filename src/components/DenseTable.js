import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from "dayjs";

function getFormattedDate(inputDate) {
    return dayjs(inputDate).format("DD-MMM-YY");
}

export default function DenseTable(practices) {
    const checkBoolValue = (boolValue) => {
        if (boolValue) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table" padding="checkbox">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">SSIP</TableCell>
                        <TableCell align="center">SPP</TableCell>
                        <TableCell align="center">Chanting</TableCell>
                        <TableCell align="center">PF</TableCell>
                        <TableCell align="center">HKM</TableCell>
                        <TableCell align="center">SCS</TableCell>
                        <TableCell align="center">RR</TableCell>
                        <TableCell align="center">BG Count</TableCell>
                        <TableCell align="center">BG/CC/SB</TableCell>
                        <TableCell align="center">SP Count</TableCell>
                        <TableCell align="center">SP Post</TableCell>
                        <TableCell align="center">OT Count</TableCell>
                        <TableCell align="center">Others</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {practices.practices.map((row) => (
                        <TableRow
                            key={row.id}
                            hover={true}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="center" size="small">
                                {getFormattedDate(row.practiceDate)}
                            </TableCell>

                            <TableCell align="center">{checkBoolValue(row.ssip)}</TableCell>
                            <TableCell align="center" style={{"color": '&:row.spp?"#DBF3C6":"#EE9999"'}}>{checkBoolValue(row.spp)}</TableCell>
                            <TableCell align="center">{row.chanting}</TableCell>
                            <TableCell align="center">{row.pf}</TableCell>
                            <TableCell align="center">{row.hkm}</TableCell>
                            <TableCell align="center">{row.scs}</TableCell>
                            <TableCell align="center">{row.rr}</TableCell>
                            <TableCell align="center">{row.bgCount}</TableCell>
                            <TableCell align="center">{row.bg}</TableCell>
                            <TableCell align="center">{row.spPostCount}</TableCell>
                            <TableCell align="center">{row.sp}</TableCell>
                            <TableCell align="center">{row.otCount}</TableCell>
                            <TableCell align="center">{row.ot}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}