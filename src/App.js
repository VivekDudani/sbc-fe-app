import './App.css';
import * as React from "react";
import {useState} from "react";
import {gql, useQuery} from '@apollo/client';
import {Box, Grid} from "@mui/material";
import dayjs from 'dayjs';
import NestedList from "./components/NestedList";
import AddPractices from "./AddPractices";


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

const GET_PRACTICES_BY_DATE = gql`
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
                practiceDate ssip spp chanting hkm scs pf bgCount bg spPostCount sp otCount ot
            }
        }
    }
`;

function getFormattedDate(inputDate) {
    return dayjs(inputDate).format("YYYY-MM-DD");
}

function getWeekStartAndEndDate() {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay() + 1; // Start from Monday
    const firstDate = new Date(curr.setDate(first));
    const lastDate = new Date(curr.setDate(firstDate.getDate() + 6));
    return {fd: firstDate, ld: lastDate};
}

function DisplayPractices() {
    const {fd, ld} = getWeekStartAndEndDate();
    // console.log(getFormattedDate(fd), getFormattedDate(ld));

    let startDate = "2022-12-11";
    let endDate = "2022-12-18";
    const {loading, error, data} = useQuery(GET_PRACTICES_BY_DATE, {
        variables: {startDate, endDate},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return data.getPracticesByDateRange.map(({
                                                 userName,
                                                 practices
                                             }) =>
        (
            <Box sx={{flexGrow: 1}} paddingLeft={3} paddingTop={1} paddingRight={1} paddingBottom={0.1}>
                <Grid container spacing={1}>
                    <NestedList userName={practices.length > 0 ? practices[0].userDetails.fullName : userName}
                                practices={practices}/>
                </Grid>
            </Box>
        ));
}

let hkc = "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\n\n Hare Rama Hare Rama Rama Rama Hare Hare";

function UserDetails() {

    const [loggedInUser, setLoggedInUser] = useState({
        userID: 'VivekD',
        userName: 'Vivek Dudani'
    });

    return {
        userDetails: loggedInUser,
        setUserDetails: setLoggedInUser
    };
}

function App() {
    return (
        <div>
            <header className="App-header" style={{fontStyle:'bold'}}>
                <h2>SoulPeace SBC Practices</h2>
                <h4 >{hkc}</h4>
            </header>
            {/*<GLogin/>*/}
            <br/>
            {/*<React.Fragment>*/}
            {/*</React.Fragment>*/}
            <div style={{padding: 5}}>
                <AddPractices userDetails={UserDetails().userDetails} setUserDetail={UserDetails().setUserDetails}/>
            </div>
            <DisplayPractices/>
        </div>
    );
}

export default App;
