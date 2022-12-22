import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useGlobalContext} from "./context";
import {NativeSelect} from "@mui/material";

export default function SelectAutoWidth(props) {
    const handleChange = (event) => {
        props.setData(event.target.value);
    };
    // const {
    //     val,
    //     handleChange
    // } = useGlobalContext()

    const {name} = props;
    // console.log(name)
    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
                <InputLabel variant="standard" htmlFor="uncontrolled-native"
                            id="simple-select-autowidth-label">{props.name}</InputLabel>
                <NativeSelect
                    // labelId="simple-select-autowidth-label"
                    id="simple-select-autowidth"
                    value={props.data}
                    onChange={handleChange}
                    // autoWidth
                    label={props.name}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    {/*<MenuItem value="">*/}
                    {/*    <em>None</em>*/}
                    {/*</MenuItem>*/}
                    {/*<MenuItem value={0}>0</MenuItem>*/}
                    {/*<MenuItem value={1}>1</MenuItem>*/}
                    {/*<MenuItem value={2}>2</MenuItem>*/}
                    {/*<MenuItem value={3}>3</MenuItem>*/}
                    {/*<MenuItem value={4}>4</MenuItem>*/}
                    {/*<MenuItem value={5}>5</MenuItem>*/}
                    {/*<MenuItem value={6}>6</MenuItem>*/}
                    {/*<MenuItem value={7}>7</MenuItem>*/}
                    {/*<MenuItem value={8}>8</MenuItem>*/}
                    {/*<MenuItem value={9}>9</MenuItem>*/}
                    {/*<MenuItem value={10}>10</MenuItem>*/}
                </NativeSelect>
            </FormControl>
        </>
    );
}