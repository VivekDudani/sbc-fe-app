import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {Stack} from "@mui/material";

export default function FormDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserIdBlurEvent = (e) => {
        if (e.target.value.length > 0) {
            props.setUserIdEvent(e.target.value)
        }
    }

    const handleFullNameBlurEvent = (e) => {
        if (e.target.value.length > 0) {
            props.setFullnameEvent(e.target.value)
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    To subscribe to this website, please enter your email address here. We*/}
                    {/*    will send updates occasionally.*/}
                    {/*</DialogContentText>*/}
                    <Stack direction="column" spacing={2}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userName"
                            label="User ID (Cannot be changed later)"
                            type="text"
                            fullWidth
                            variant="standard"
                            onBlur={handleUserIdBlurEvent}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userFullName"
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onBlur={handleFullNameBlurEvent}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}