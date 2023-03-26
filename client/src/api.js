import axios from "axios";

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("spotify_access_token")}`;
axios.defaults.headers["Content-Type"] = "application/json";

export async function getProfile() {
   return axios.get("/me").then((res) => res.data);
}

export async function getPlaylists() {
   return axios.get("/me/playlists").then((res) => res.data);
}

export async function getAlbums() {
   return axios.get("/me/albums").then((res) => res.data);
}

export async function getFollowedArtists() {
   return axios.get("/me/following?type=artist").then((res) => res.data);
}

export async function getPodcasts() {
   return axios.get("/me/shows").then((res) => res.data);
}
