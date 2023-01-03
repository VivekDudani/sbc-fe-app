import {gql, useQuery} from "@apollo/client";
import dayjs from "dayjs";
import {Box, Container, Grid, InputAdornment, TextField} from "@mui/material";
import NestedList from "./components/NestedList";
import * as React from "react";
import {useState} from "react";
import {SearchOutlined} from "@mui/icons-material";

const GET_ALL_PRACTICES = gql`
    query GetAllDailyPractices {
        getAllDailyPractices {
            id
            userDetails {
                userName
                fullName
            }
            practiceDate ssip spp chanting hkm scs pf bgCount bg spPostCount sp otCount ot
        }
    }
`;

export const GET_PRACTICES_BY_DATE = gql`
    query GetPracticesByDateRange($startDate: Date!, $endDate: Date!) {
        getPracticesByDateRange(practiceStartDate: $startDate, practiceEndDate: $endDate) {
            userName
            practices {
                id
                userDetails {
                    userName
                    fullName
                    userCreatedBy {
                        userName
                        fullName
                    }
                }
                practiceDate ssip spp chanting hkm scs pf rr bgCount bg spPostCount sp otCount ot
            }
        }
    }
`;

export function getFormattedDate(inputDate) {
    return dayjs(inputDate).format("YYYY-MM-DD");
}

export function getWeekStartAndEndDate() {
    const curr = new Date();
    const dayOfMonth = curr.getDate();
    const dayOfWeek = curr.getDay();
    let first = dayOfMonth - dayOfWeek + 1; // Start from Monday
    if (dayOfWeek === 0) {
        first = dayOfMonth - 6; //handle Sunday as last Day of week
    }
    let last = first + 6;

    const firstDate = new Date(curr.setDate(first));
    const lastDate = new Date(curr.setDate(last));
    return {fd: firstDate, ld: lastDate};
}

function FetchPracticeData() {
    const {fd, ld} = getWeekStartAndEndDate();
    // console.log(getFormattedDate(fd), getFormattedDate(ld));
    // let startDate = "2022-12-11";
    let startDate = getFormattedDate(fd);
    // let endDate = "2022-12-18";
    let endDate = getFormattedDate(ld);

    const {loading, error, data} = useQuery(GET_PRACTICES_BY_DATE, {
        variables: {startDate, endDate},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.getPracticesByDateRange;
}

export function DisplayPractices() {
    const practiceData = Array.from(FetchPracticeData());

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const filteredData = practiceData.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.practices[0].userDetails.fullName.toLowerCase().includes(inputText);
        }
    })

    return (
        // <React.Fragment>
        <Box sx={{flexGrow: 1}} paddingLeft={2} paddingTop={2} paddingRight={2} paddingBottom={3}>
            <Container maxWidth="1g">
                <Grid container spacing={1} paddingBottom={2}>
                    <TextField
                        id="outlined-basic"
                        onChange={inputHandler}
                        variant="outlined"
                        fullWidth
                        label="Search User Practice"
                        size="medium"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <SearchOutlined/>
                            </InputAdornment>,
                        }}
                    />
                </Grid>
                <DisplayPractice practiceData={filteredData}/>
            </Container>
        </Box>
        // </React.Fragment>
    );
}

function DisplayPractice({practiceData}) {
    // console.log(practiceData);
    return practiceData.map(({
                                 userName,
                                 practices
                             }) =>
        (
            <Grid container spacing={1}>
                <NestedList userName={practices.length > 0 ? practices[0].userDetails.fullName : userName}
                            practices={practices}/>
            </Grid>
        ));
}