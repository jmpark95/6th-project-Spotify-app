import express from "express";
import dotenv from "dotenv";
import querystring from "node:querystring";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const port = 8000 || process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generateRandomString = (length) => {
   let string = "";
   const possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   for (let i = 0; i < length; i++) {
      string += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
   }
   return string;
};
const state = generateRandomString(16);

app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/login", (req, res) => {
   const queryString = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
      state,
      scope: "user-library-read user-library-modify user-read-playback-position user-read-currently-playing user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public",
   });

   res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
});

app.get("/callback", async (req, res) => {
   //if state returned from query is different to initial state for some reason
   if (state !== req.query.state) {
      return res.status(500).json({ message: "Something has gone wrong" });
   }

   //if the user doesnt accept request or if error occurs
   if (req.query.error) {
      return res.status(403).json({ message: "Access denied" });
   }

   //if state matches and we've received authorization code
   if (req.query.code && state === req.query.state) {
      try {
         const { data } = await axios({
            method: "POST",
            url: "https://accounts.spotify.com/api/token",
            headers: {
               Authorization: `Basic ${new Buffer.from(
                  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
               ).toString("base64")}`,
               "Content-Type": "application/x-www-form-urlencoded",
            },
            data: {
               grant_type: "authorization_code",
               code: req.query.code,
               redirect_uri: process.env.REDIRECT_URI,
            },
         });

         const queryString = querystring.stringify({
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in,
         });

         res.redirect(`/?${queryString}`);
      } catch (err) {
         console.error(err);
         res.redirect("http://minpark-spotifyapp.up.railway.app");
      }
   }
});

app.get("/refresh_token", async (req, res) => {
   try {
      const { data } = await axios({
         method: "POST",
         url: "https://accounts.spotify.com/api/token",
         data: {
            grant_type: "refresh_token",
            refresh_token: req.query.refresh_token,
         },
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString(
               "base64"
            )}`,
         },
      });

      res.send(data);
   } catch (err) {
      res.send(err);
   }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
