import {AppBar, Box, Grid, Stack, Toolbar, Typography} from "@mui/material";
import logo from "../soulpeace-logo-small-white.svg";
import GLogout from "../login/GLogout";
import * as React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

function Header() {
    const displayDesktop = () => {
        return <Toolbar>Hi From Desktop Header</Toolbar>;
    };
    const navItems = [
        // {name:'Home', link:"/home", comp:Link},
        // {name:'About', link:"/home", comp:Link},
        {name:'', link:"", comp:GLogout}
        ];

    return (
        <AppBar className="App-header" component="nav" >
            <Toolbar>
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    {/*<img src={logo} alt="#" style={{height: 50}}/>*/}
                    SoulPeace
                </Typography>

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map(({name, link,  comp}) => (
                        <Button key={name} sx={{ color: '#fff' }} component={comp} to={link}>
                            {name}
                        </Button>
                    ))}
                    {/*<Button component={GLogout}/>*/}
                </Box>

                {/*<Typography color="inherit" type="title">*/}
                {/*    <Stack direction="row" spacing={4} padding={1}>*/}
                {/*        <img src={logo} alt="#" style={{height: 50}}/>*/}
                {/*        <h1>SoulPeace</h1>*/}
                {/*        <Grid alignItems={"flex-end"}>*/}

                {/*            <GLogout/>*/}
                {/*        </Grid>*/}
                {/*    </Stack>*/}
                {/*</Typography>*/}
            </Toolbar>
            {/*<header className="App-header" style={{fontStyle:'bold'}}>*/}
            {/*</header>*/}
        </AppBar>
    );
}

export default Header;