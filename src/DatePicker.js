import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";

export default function DatePicker (props) {
    const handleChange = (newValue) => {
        // console.log(newValue.toLocaleString());
        props.setDate(newValue);
    };

    const curr = new Date();
    const first = curr.getDate() - curr.getDay() + 1;
    const firstDate = new Date(curr.setDate(first));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label="Practice Date"
                inputFormat="DD/MM/YYYY"
                value={props.data}
                onChange={handleChange}
                minDate={firstDate}
                renderInput={(params) => <TextField {...params} size="small" sx={{maxWidth: 120}} />}
            />
        </LocalizationProvider>
    )
}