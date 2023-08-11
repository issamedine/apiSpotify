import { useEffect, useState } from "react";
import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists";

const App = () => {
  const CLIENT_ID = "7ac4ddaad2164cfa9ff2902de221e05d";
  const CLIENT_SECRET = "7db3338caef74db69c3ba3bc06948c32";
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/callback"

  const SPACE_DELIMITER = "%20"
  const SCOPES = ["user-read-currently-playing", "user-read-playback-state", "playlist-read-private"];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER)

  const [accessToken, setAccessToken] = useState("");
  console.log("issam accessToken", accessToken);

  const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

  useEffect(() => {
    if(window.location.hash) {
      const { access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash)
      
      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  }, [])
  

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }


  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={() => handleLogin()}>click</button>
      <SpotifyGetPlaylists />
    </div>
  );
};

export default App;
