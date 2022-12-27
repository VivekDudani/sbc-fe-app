import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutoCompleteWithCreate({allCreatedUsers, selectUser, setSelectUser, userDetailsValue, setUserDetailsValue}) {
    const [value, setValue] = React.useState(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setUserDetailsValue({
            fullName: '',
            userName: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        title: '',
        year: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setSelectUser({
            fullName: userDetailsValue.fullName,
            userName: userDetailsValue.userName,
        });
        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={selectUser}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setUserDetailsValue({
                                fullName: newValue,
                                userName: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setUserDetailsValue({
                            fullName: newValue.inputValue,
                            userName: '',
                        });
                    } else {
                        setSelectUser(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            fullName: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={allCreatedUsers}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.fullName;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.fullName}</li>}
                sx={{ width: 280 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Select User" size="small"/>}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add new User</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={userDetailsValue.fullName}
                            onChange={(event) =>
                                setUserDetailsValue({
                                    ...userDetailsValue,
                                    fullName: event.target.value,
                                })
                            }
                            label="Full Name"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={userDetailsValue.userName}
                            onChange={(event) =>
                                setUserDetailsValue({
                                    ...userDetailsValue,
                                    userName: event.target.value,
                                })
                            }
                            label="User ID"
                            type="text"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}