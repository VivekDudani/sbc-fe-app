import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {gapi} from "gapi-script";
import Button from "@mui/material/Button";

const clientId = '773779419187-vq3ct5ff3tlhtv9q0gv67j5mvdnd6agp.apps.googleusercontent.com';

// '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GLogout() {
    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: clientId,
            plugin_name: "chat",
        });
    });

    const onSuccess = () => {
        console.log('Logged out successfully');
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div>
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={onSuccess}
                    render={renderProps => (
                        <Button onClick={renderProps.onClick} style={{backgroundColor:"#1976d2", color:"#fff"}}>LOGOUT
                        </Button>
                    )}
                />
            </div>
        </main>
    );
}

export default GLogout;