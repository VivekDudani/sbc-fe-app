import React from 'react';
import {gapi} from "gapi-script";
import {GoogleLogin} from 'react-google-login';
// refresh token

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
// '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

function GLogin() {
    gapi.load("client:auth2", () => {
        gapi.client.init({
            clientId: clientId,
            plugin_name: "chat",
        });
    });

    const onSuccess = (res) => {
        // console.log('GLogin Success: User profile:', res.profileObj);
        localStorage.setItem("user", JSON.stringify(res?.profileObj));
        window.location.reload();
        // refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('GLogin failed: res:', res);
        alert(
            `Failed to login. Please retry again.`
        );
    };

    return (
        <>
            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="LOGIN WITH GOOGLE"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        style={{marginTop: '100px', alignSelf: 'center', padding: 10}}
                        isSignedIn={true}
                    />
                </div>
            </main>
        </>
    );
}

export default GLogin;