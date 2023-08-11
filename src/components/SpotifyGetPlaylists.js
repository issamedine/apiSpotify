import React, { useState, useEffect } from 'react'
import axios from 'axios'

function SpotifyGetPlaylists() {
    const [token, setToken] = useState("")
    const [data, setData] = useState("")

    const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists"
    useEffect(() => {
      if(localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"))
      }
    }, [])

    const handleGetPlaylist = () => {
        axios.get(PLAYLISTS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setData(response.data)
        }).catch(error => {
            console.log(error)
        })
    }
    
  return (
    <div>
        <div>SpotifyGetPlaylists</div>
        <button onClick={() => handleGetPlaylist()}>get playlist</button>
    </div>
  )
}

export default SpotifyGetPlaylists