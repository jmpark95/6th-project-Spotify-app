import axios from "axios";

//Bug no.1 this was causing a bug for some reason?? Sending "Bearer null" every time
// axios.defaults.baseURL = "https://api.spotify.com/v1";
// axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("spotify_access_token")}`;
// axios.defaults.headers["Content-Type"] = "application/json";

//Bug no.2 Can't make separate headers variable and reuse for axios requests? Causing bug. As a result, code is not DRY

// Profile page
export async function getProfile() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
}

export async function getPlaylists() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
}

export async function getAlbums() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/albums",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
}

export async function getFollowedArtists() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/following?type=artist",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
}

export async function getPodcasts() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/shows",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
}

//Artists page
export async function getTopArtists() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/artists?time_range=long_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}

export async function getTopArtistsMedium() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/artists?time_range=medium_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}

export async function getTopArtistsShort() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/artists?time_range=short_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}

//Tracks page
export async function getTopTracks() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=long_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}

export async function getTopTracksMedium() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}

export async function getTopTracksShort() {
   const response = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=short_term",
      headers: {
         Authorization: `Bearer ${localStorage.getItem("spotify_access_token")}`,
         "Content-Type": "application/json",
      },
   });

   return response.data;
}
