import React from 'react';
import {GoogleLogout} from 'react-google-login';
import {gapi} from "gapi-script";
import Button from "@mui/material/Button";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
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
        document.cookie = "G_AUTHUSER_H=; G_ENABLED_IDPS=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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