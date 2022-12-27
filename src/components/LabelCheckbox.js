import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";

export default function LabelCheckbox(prop) {
    const handleChange = (event) => {
        prop.setData(event.target.checked)
    }

    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={prop.data} onChange={handleChange}
                    // size="small"
                                                     inputProps={{'aria-label': 'controlled'}}/>}
                                  label={prop.label} labelPlacement="end"/>
            </FormGroup>
        </>
    )
}