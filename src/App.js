import './App.css';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Box, Button, Checkbox, FormControlLabel, FormGroup, Grid, Stack} from "@mui/material";
import {useState} from "react";
import CustomizedAccordions from "./AccordianDisplay";
import SelectAutoWidth from "./AutoWidthSelect";
import dayjs from 'dayjs';
import DatePicker from "./DatePicker";
import TextInput from "./TextInput";
import FormDialog from "./FormDialog";
import FacebookLoginComponent from "./FacebookLoginComponent";


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

const ADD_UPDATE_PRACTICE = gql`
    mutation CreateOrUpdateDailyPractice($userName: String!, $fullName: String, $practiceDate: Date!, $ssip: Boolean, $spp: Boolean,
        $chanting: Int, $hkm: Int, $scs: Int, $pf: Int, $bgCount: Int, $bg: String, $spPostCount: Int, $spPost: String,
        $otCount: Int,$others: String, $isUserAuthenticated: Boolean, $userCreatedBy: String) {
        createOrUpdateDailyPractice(userName:$userName, fullName:$fullName, practiceDate:$practiceDate, ssip:$ssip, spp:$spp,
            chanting:$chanting, hkm:$hkm, scs:$scs, pf:$pf, bgCount:$bgCount, bg:$bg, spPostCount:$spPostCount,
            spPost:$spPost, otCount:$otCount, others:$others, isUserAuthenticated:$isUserAuthenticated,userCreatedBy:$userCreatedBy) {
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
`;

function AddPractices() {
    const [dateVal, setDateValue] = useState(dayjs(new Date()));
    const [userId, setUserId] = useState(''); //capture from login
    const [fullName, setFullName] = useState(''); //capture from login
    const [ssip, setSsip] = useState(false);
    const [spp, setSpp] = useState(false);
    const [chanting, setChanting] = useState(0);
    const [pf, setPf] = useState(0);
    const [hkm, setHkm] = useState(0);
    const [scs, setScs] = useState(0);
    const [bgCount, setBgCount] = useState(0);
    const [bgText, setBgText] = useState('');
    const [spCount, setSpCount] = useState(0);
    const [spText, setSpText] = useState('');
    const [otCount, setOtCount] = useState(0);
    const [otText, setOtText] = useState('');

    const handleSubmitPractice = (e) => {
        // e.preventDefault();
        addPractice({
            variables: {
                practiceDate: getFormattedDate(dateVal),
                userName: 'VivekD',
                fullName: 'Vivek Dudani',
                ssip: ssip,
                spp: spp,
                chanting: chanting,
                pf: pf,
                hkm: hkm,
                scs: scs,
                bgCount: bgCount,
                bg: bgText,
                spPostCount: spCount,
                spPost: spText,
                otCount: otCount,
                others: otText,
                isUserAuthenticated: true
            }
        })
        alert("Practice Submitted.");
        // e.target.reset();
    }
    const [addPractice, {data, loading, error}] = useMutation(ADD_UPDATE_PRACTICE);
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <Box sx={{display: 'flex', minWidth: 120}} paddingLeft={2}>
            <Grid container spacing={1} flexWrap="wrap">
                <Grid item xs={8} md={10}>
                    <Stack direction="row" spacing={1}>
                        <DatePicker data={dateVal} setDate={setDateValue}/>
                        <FormDialog setUserIdEvent={setUserId} setFullnameEvent={setFullName}/>
                    </Stack>
                </Grid>
                <Grid item xs={8} md={11}>
                    <Stack direction="row" spacing={1}>
                        <LabelData label={'SSIP'} data={ssip} setData={setSsip}/>
                        <LabelData label={'SPP'} data={spp} setData={setSpp}/>
                        <SelectAutoWidth name={'Chanting'} data={chanting} setData={setChanting}/>
                        <SelectAutoWidth name={'PF'} data={pf} setData={setPf}/>
                        <SelectAutoWidth name={'HKM'} data={hkm} setData={setHkm}/>
                        <SelectAutoWidth name={'SCS'} data={scs} setData={setScs}/>
                    </Stack>
                </Grid>
                <Grid item xs={8} md={11}>
                    <Stack direction="row" spacing={1}>
                        <SelectAutoWidth name={'BG Count'} data={bgCount} setData={setBgCount}/>
                        <TextInput name={'BG/CC/SB'} data={bgText} setInput={setBgText}/>
                        <SelectAutoWidth name={'SP Count'} data={spCount} setData={setSpCount}/>
                        <TextInput name={'SP Post'} data={spText} setInput={setSpText}/>
                        <SelectAutoWidth name={'OT Count'} data={otCount} setData={setOtCount}/>
                        <TextInput name={'Others'} data={otText} setInput={setOtText}/>
                    </Stack>
                    <Button variant="contained" size="small" fontSize="small"
                            onClick={handleSubmitPractice}>Add</Button>
                </Grid>
                {/*</Stack>*/}
            </Grid>
        </Box>
    );
}

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
            <Box sx={{flexGrow: 1}} paddingLeft={2} paddingTop={1} paddingRight={1} paddingBottom={0.1}>
                <Grid container spacing={1}>
                    <Grid item xs={8} md={12}>
                        <CustomizedAccordions
                            userName={practices.length > 0 ? practices[0].userDetails.fullName : userName}
                            practices={practices}/>
                    </Grid>
                </Grid>
            </Box>
        ));
}

function LabelData(prop) {
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

let hkc = "Hare Krishna Hare Krishna Krishna Krishna Hare Hare\n\n Hare Rama Hare Rama Rama Rama Hare Hare";

function App() {
    return (
        <div>
            <h1 className="App-header">SoulPeace SBC Practices 🚀</h1>
            <h3 className="App-c">{hkc}</h3>
            {/*<FacebookLoginComponent/>*/}
            <AddPractices/>
            <DisplayPractices/>
        </div>
    );
}

export default App;
