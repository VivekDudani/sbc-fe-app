import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {TextField} from "@mui/material";
import {MobileDatePicker} from "@mui/x-date-pickers";
import {getWeekStartAndEndDate} from './DisplayPractices'

export default function DatePicker (props) {
    const handleChange = (newValue) => {
        // console.log(newValue.toLocaleString());
        props.setDate(newValue);
    };

    const {fd, ld} = getWeekStartAndEndDate();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                label="Practice Date"
                inputFormat="DD/MM/YYYY"
                value={props.data}
                onChange={handleChange}
                minDate={fd}
                maxDate={ld}
                renderInput={(params) => <TextField {...params} size="small" sx={{maxWidth: 120}} />}
            />
        </LocalizationProvider>
    )
}