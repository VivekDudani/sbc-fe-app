import {Box, Container, Grid} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CopyrightIcon from '@mui/icons-material/Copyright';

const about = "Be a Supreme Swan ~ a Paramhansa. Separate truth from the insubstantiality of delusion.\n" +
    "SoulPeace will help you, guide you to hear your Inner Voice & explore your own path towards the \"Ultimate Truth\".\n" +
    "Come & Dive into the Ocean of amazing Spiritual Knowledge, Positivity, Freedom of Thoughts & to attain \"SOUL PEACE\" through \"Love for the Creator\".";


export default function Footer() {
    return <footer style={{position:'fixed', left:0, bottom:2, right:0}}>
        <Box px={{ xs:2, sm:3}} py={{xs:2, sm:3}} marginTop={"48px"} bgcolor={"#36344d"} color={"#dadce0"}
             fontSize={"13px"} fontWeight={400} opacity={0.7}
        >
            <Container maxWidth="xl">
                <Grid container spacing={5}>
                    <Grid item xs={10} sm={4} >
                        <Box color="inherit">Help</Box>
                        <Box>Contact</Box>
                        <Box>Support</Box>
                    </Grid>
                    <Grid item xs={10} sm={4} >
                        <Box color="inherit">
                            <FacebookIcon/>
                        </Box>
                        <Box color="inherit">
                            <YouTubeIcon/>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} paddingTop={2}>
                        <Box>{about}</Box>
                        <Box paddingTop={1}>
                            SoulPeace &reg; {new Date().getFullYear()}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </footer>
}