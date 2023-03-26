import axios from "axios";

export function getAccessToken() {
   const token_expiration = 3600 * 1000;
   const urlParams = new URLSearchParams(window.location.search);
   const queryParams = {
      spotify_access_token: urlParams.get("access_token"),
      spotify_refresh_token: urlParams.get("refresh_token"),
      spotify_expires_in: urlParams.get("expires_in"),
   };

   //Three Possibilities
   //1. User has just logged. Nothing in local storage, so need to set items from query params
   //2. There is already a valid localstorage item, so use that
   //3. 1 hour has passed, so we need to refresh the token and use that

   //3.
   if (Date.now() - localStorage.getItem("spotify_time_now") > token_expiration) {
      refreshToken();
   }

   //2.
   else if (Object.values(queryParams).includes(null)) {
      return localStorage.getItem("spotify_access_token");
   }

   //1.
   else {
      localStorage.setItem("spotify_access_token", urlParams.get("access_token"));
      localStorage.setItem("spotify_refresh_token", urlParams.get("refresh_token"));
      localStorage.setItem("spotify_expires_in", urlParams.get("expires_in"));
      localStorage.setItem("spotify_time_now", Date.now());

      return localStorage.getItem("spotify_access_token");
   }
}

async function refreshToken() {
   try {
      const { data } = await axios.get(
         `${import.meta.env.VITE_BACKEND}/refresh_token?refresh_token=${localStorage.getItem("spotify_refresh_token")}`
      );

      localStorage.setItem("spotify_access_token", data.access_token);
      localStorage.setItem("spotify_time_now", Date.now());
      window.location.reload(); // Reload the page for localStorage updates to be reflected (?????)
      return;
   } catch (err) {
      console.error(err);
   }
}
