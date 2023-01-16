import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {Person} from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DenseTable from "./DenseTable";
import {green, red} from "@mui/material/colors";
import {ListSubheader} from "@mui/material";

const checkCircleIcon = <CheckCircleIcon fontSize="small" sx={{ color: green[500] }}/>;
const crossIcon = <CancelIcon fontSize="small" sx={{ color: red[500] }}/>;

function totalsStyle (boolVal) {
    return {
        color: boolVal ? "green" : "red",
        fontSize: 12,
        fontWeight: 600
    };
}

function getListItemText(boolVal, textVal) {
    return <ListItemText disableTypography={true} primary={textVal} style={totalsStyle(boolVal)}/>;
}

export default function NestedList(props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const lgUser = localStorage.getItem("user");
    const currentUser = JSON.parse(lgUser);
    const totals = props.practiceTotal;

    return (
        <List
            sx={{width: '100%', maxWidth: 1060, paddingBottom:2, bgcolor: 'background.paper'}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            key={props.userName}
            /*subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor: 'whitesmoke', lineHeight: "8px"}}>
                {/!*{currentUser.email}*!/}
                {/!*TOTAL:*!/}
                {/!*<Avatar alt={props.userName} src={currentUser.imageUrl}/>*!/}
            </ListSubheader>
            }*/
        >
            <ListItemButton onClick={handleClick} sx={{bgcolor: 'lightgrey'}}>
                <ListItemIcon>
                    <Person />
                </ListItemIcon>
                <ListItemText primary={props.userName} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ListSubheader component="div" id="nested-list-subheader" sx={{bgcolor: 'whitesmoke', lineHeight: "8px"}}>
                    <ListItemButton>
                        {getListItemText(totals?.ssip, "SSIP")}
                        {getListItemText(totals?.spp, "SPP")}
                        {getListItemText(totals?.chanting, "C")}
                        {getListItemText(totals?.pf, "PF")}
                        {getListItemText(totals?.hkm, "HKM")}
                        {getListItemText(totals?.scs, "SCS")}
                        {getListItemText(totals?.rr, "RR")}
                        {getListItemText(totals?.bg, "BG")}
                        {getListItemText(totals?.sp, "SP")}
                        {getListItemText(totals?.ot, "OT")}
                    </ListItemButton>
                </ListSubheader>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 1, pr: 1 }}>
                        <DenseTable practices={props.practices}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}