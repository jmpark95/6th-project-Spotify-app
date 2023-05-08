import axios from "axios";

export function getAccessToken() {
   const token_expiration = 3600 * 1000;
   const urlParams = new URLSearchParams(window.location.search);
   const queryParams = {
      spotify_access_token: urlParams.get("access_token"),
      spotify_refresh_token: urlParams.get("refresh_token"),
      spotify_expires_in: urlParams.get("expires_in"),
   };

   if (
      Date.now() - localStorage.getItem("spotify_time_now") > token_expiration &&
      localStorage.getItem("spotify_time_now") !== null
   ) {
      return refreshToken();
   }

   if (localStorage.getItem("spotify_access_token") && localStorage.getItem("spotify_access_token") !== "undefined") {
      return localStorage.getItem("spotify_access_token");
   }

   if (queryParams["spotify_access_token"]) {
      for (const property in queryParams) {
         localStorage.setItem(property, queryParams[property]);
      }

      localStorage.setItem("spotify_time_now", Date.now());
      return localStorage.getItem("spotify_access_token");
   }

   return null;
}

async function refreshToken() {
   try {
      const { data } = await axios.get(
         `${import.meta.env.VITE_BACKEND}/refresh_token?refresh_token=${localStorage.getItem("spotify_refresh_token")}`
      );

      localStorage.setItem("spotify_access_token", data.access_token);
      localStorage.setItem("spotify_time_now", Date.now());
      window.location.reload();

      return localStorage.getItem("spotify_access_token");
   } catch (err) {
      console.error(err);
   }
}

export function logout() {
   localStorage.clear();
   window.location = window.location.origin;
}

export function capitalizeFirstLetter(str) {
   const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
   return capitalized;
}

export function msToMinAndSec(ms) {
   const minutes = Math.floor(ms / 60000);
   const seconds = ((ms % 60000) / 1000).toFixed(0);
   return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
