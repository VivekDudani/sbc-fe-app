import {Box, TextField} from "@mui/material";

export default function TextInput (props) {

    const handleBlurEvent = (e) => {
        props.setInput(e.target.value)
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label={props.name} variant="outlined" size="small"
                       onBlur={handleBlurEvent} defaultValue={props.data} margin="dense"/>
        </Box>
    )
}