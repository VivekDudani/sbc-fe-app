import {gql, useMutation, useQuery} from "@apollo/client";
import {useState} from "react";
import dayjs from "dayjs";
import {Box, Button, Container, Dialog, DialogActions, DialogContent, Grid, Stack} from "@mui/material";
import DatePicker from "./components/DatePicker";
import SelectAutoWidth from "./AutoWidthSelect";
import TextInput from "./components/TextInput";
import LabelCheckbox from "./components/LabelCheckbox";
import DialogTitle from "@mui/material/DialogTitle";
import AutoCompleteWithCreate from "./components/AutoCompleteWithCreate";
import TextField from "@mui/material/TextField";
import {GET_PRACTICES_BY_DATE, getFormattedDate} from "./DisplayPractices";

const ADD_UPDATE_PRACTICE = gql`
    mutation CreateOrUpdateDailyPractice($userName: String!, $fullName: String!, $practiceDate: Date!, $ssip: Boolean, $spp: Boolean,
        $chanting: Int, $hkm: Int, $scs: Int, $pf: Int, $rr: Int, $bgCount: Int, $bg: String, $spPostCount: Int, $spPost: String,
        $otCount: Int,$others: String, $isUserAuthenticated: Boolean, $userCreatedBy: String) {
        createOrUpdateDailyPractice(userName:$userName, fullName:$fullName, practiceDate:$practiceDate, ssip:$ssip, spp:$spp,
            chanting:$chanting, hkm:$hkm, scs:$scs, pf:$pf, rr:$rr, bgCount:$bgCount, bg:$bg, spPostCount:$spPostCount,
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

const GET_USERS_CREATED_BY = gql`
    query GetAllUsersByUserCreatedByField($userName: String!) {
        getAllUsersByUserCreatedByField(userName: $userName) {
            id
            userName
            fullName
            isActive
            isAuthenticated
            userCreatedBy {
                userName
            }
        }
    }
`;

function resetPracticeValues({
                                 setSsip, setSpp, setChanting, setPf, setHkm, setScs, setRr,
                                 setBgCount, setSpCount, setOtCount, setBgText, setSpText, setOtText
                             }) {
    setSsip(false)
    setSpp(false)
    setChanting(0);
    setPf(0);
    setHkm(0);
    setScs(0);
    setRr(0);
    setBgCount(0);
    setSpCount(0);
    setOtCount(0);
    setBgText('');
    setSpText('');
    setOtText('');
}

function GetUsersCreatedByCurrentUser(userName) {
    const {loading, error, data} = useQuery(GET_USERS_CREATED_BY, {
        variables: {userName: userName},
    });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.log(error.message);
        return [];
        // return <p>Error : {error.message}</p>;
    }

    return data.getAllUsersByUserCreatedByField;
}

const TextFieldNum = (props) => {
    return (
        <TextField
            autoFocus
            sx={{maxWidth: 75}}
            // margin="dense"
            id="text-field-number"
            onChange={(event) =>
                props.setData(event.target.value)
            }
            label="Chanting"
            type="number"
            value={props.data}
            variant="outlined"
            size="small"
            InputProps={{inputProps: {min: 0, max: 1000}}}
        />
    )
}

export default function AddPractices(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [dateVal, setDateValue] = useState(dayjs(new Date()));

    let loggedInUserDetails = props.userDetails;
    let allCreatedUsers = GetUsersCreatedByCurrentUser(loggedInUserDetails.email);

    const [selectedUser, setSelectedUser] = useState(null);
    const [createdUserValue, setCreatedUserValue] = useState({
        fullName: '',
        userName: '',
    });

    const [ssip, setSsip] = useState(false);
    const [spp, setSpp] = useState(false);
    const [chanting, setChanting] = useState(0);
    const [pf, setPf] = useState(0);
    const [hkm, setHkm] = useState(0);
    const [scs, setScs] = useState(0);
    const [rr, setRr] = useState(0);
    const [bgCount, setBgCount] = useState(0);
    const [bgText, setBgText] = useState('');
    const [spCount, setSpCount] = useState(0);
    const [spText, setSpText] = useState('');
    const [otCount, setOtCount] = useState(0);
    const [otText, setOtText] = useState('');

    const otherUserSelected = selectedUser!== null && selectedUser!== undefined && selectedUser.toString().trim() !== "";

    const handleSubmitPractice = (e) => {
        // e.preventDefault();
        addPractice({
            variables: {
                practiceDate: getFormattedDate(dateVal),
                userName: otherUserSelected===false ? loggedInUserDetails.email : selectedUser.userName,
                // userName: 'VivekD',
                fullName: otherUserSelected===false ? loggedInUserDetails.name : selectedUser.fullName,
                // fullName: loggedInUserDetails.name,
                ssip: ssip,
                spp: spp,
                chanting: chanting,
                pf: pf,
                hkm: hkm,
                scs: scs,
                rr: rr,
                bgCount: bgCount,
                bg: bgText,
                spPostCount: spCount,
                spPost: spText,
                otCount: otCount,
                others: otText,
                // isUserAuthenticated: false,
                isUserAuthenticated: selectedUser === null ? true : loggedInUserDetails.email !== null,
                userCreatedBy: selectedUser === null ? null : loggedInUserDetails.email
            }
        }).then(r => {
            console.log(r)
            if (r.errors) {
                alert(r.errors.message)
            } else {
                alert("Practice Added Successfully.");
                resetPracticeValues({
                    setSsip, setSpp, setChanting, setPf, setHkm, setScs, setRr, setBgCount, setSpCount, setOtCount,
                    setBgText, setSpText, setOtText
                });
            }
        });
    };

    const [addPractice, {data, loading, error}] = useMutation(ADD_UPDATE_PRACTICE, {
        refetchQueries: [
            {query: GET_PRACTICES_BY_DATE},
            'GetPracticesByDateRange',
            {query: GET_USERS_CREATED_BY},
            'GetAllUsersByUserCreatedByField'
        ]
    });
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    let componentSpacing = 3;
    let componentPaddingT = 2;

    return (
        <Box sx={{display: 'flex', minWidth: 90}} paddingLeft={2}>
            <Container maxWidth="1g">
                <Grid container spacing={1} flexWrap="wrap">
                    <Button variant="contained" size="large" fontSize="small"
                            onClick={handleClickOpen}>Add Your Practice</Button>
                    <Dialog open={open}
                            onClose={handleClose}
                    >
                        <DialogTitle variant="h5" id="add-practice-dialogue-title" align="center">
                            {"Add Your Practice"}
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    // m: 'auto',
                                    width: 'fit-content',
                                    paddingTop: 2
                                }}
                            >
                                <Grid item>
                                    <Stack direction="row" spacing={1}>
                                        <DatePicker data={dateVal} setDate={setDateValue}/>
                                    </Stack>
                                    <Stack direction="row" spacing={1} paddingTop={componentPaddingT}>
                                        <AutoCompleteWithCreate allCreatedUsers={allCreatedUsers}
                                                                selectUser={selectedUser}
                                                                setSelectUser={setSelectedUser}
                                                                userDetailsValue={createdUserValue}
                                                                setUserDetailsValue={setCreatedUserValue}/>
                                    </Stack>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={1}>
                                        <LabelCheckbox label={'SSIP'} data={ssip} setData={setSsip}/>
                                        <LabelCheckbox label={'SPP'} data={spp} setData={setSpp}/>
                                    </Stack>
                                    <Stack direction="row" spacing={componentSpacing} paddingTop={componentPaddingT}>
                                        <SelectAutoWidth name={'PF'} data={pf} setData={setPf}/>
                                        <TextFieldNum data={chanting} setData={setChanting}/>
                                    </Stack>
                                    <Stack direction="row" spacing={componentSpacing} paddingTop={componentPaddingT}>
                                        <SelectAutoWidth name={'HKM'} data={hkm} setData={setHkm}/>
                                        <SelectAutoWidth name={'SCS'} data={scs} setData={setScs}/>
                                        <SelectAutoWidth name={'RR'} data={rr} setData={setRr}/>
                                    </Stack>
                                    <Stack direction="row" spacing={componentSpacing} paddingTop={componentPaddingT}>
                                        <SelectAutoWidth name={'Count'} data={bgCount} setData={setBgCount}/>
                                        <TextInput name={'BG/CC/SB'} data={bgText} setInput={setBgText}/>
                                    </Stack>
                                    <Stack direction="row" spacing={componentSpacing} paddingTop={componentPaddingT}>
                                        <SelectAutoWidth name={'Count'} data={spCount} setData={setSpCount}/>
                                        <TextInput name={'SP Post'} data={spText} setInput={setSpText}/>
                                    </Stack>
                                    <Stack direction="row" spacing={componentSpacing} paddingTop={componentPaddingT}>
                                        <SelectAutoWidth name={'Count'} data={otCount} setData={setOtCount}/>
                                        <TextInput name={'Others'} data={otText} setInput={setOtText}/>
                                    </Stack>
                                </Grid>
                            </Box>
                        </DialogContent>
                        <DialogActions style={{alignSelf: "center"}}>
                            <Button variant="contained" size="small" fontSize="small" onClick={handleSubmitPractice}>
                                Add
                            </Button>
                            <Stack paddingLeft={15}>
                                <Button variant="contained" size="small" fontSize="small" autoFocus
                                        onClick={handleClose}>
                                    Close
                                </Button>
                            </Stack>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Container>
        </Box>
    );
}