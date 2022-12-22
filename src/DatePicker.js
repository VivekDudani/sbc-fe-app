import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";

export default function DatePicker (props) {
    const handleChange = (newValue) => {
        console.log(newValue.toLocaleString());
        props.setDate(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label="Practice Date"
                inputFormat="DD/MM/YYYY"
                value={props.data}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}