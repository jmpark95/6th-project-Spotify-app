import express from "express";
import dotenv from "dotenv";
import querystring from "node:querystring";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 8000 || process.env.PORT;
const state = generateRandomString(16);
app.use(cors());

function generateRandomString(length) {
   let string = "";
   const possibleCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   for (let i = 0; i < length; i++) {
      string += possibleCharacters.charAt(
         Math.floor(Math.random() * possibleCharacters.length)
      );
   }
   return string;
}

app.get("/login", (req, res) => {
   const queryString = querystring.stringify({
      client_id: process.env.CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REDIRECT_URI,
      state,
      scope: "playlist-read-private playlist-read-collaborative user-follow-read user-read-email",
   });

   res.redirect(`https://accounts.spotify.com/authorize?${queryString}`);
});

app.get("/callback", async (req, res) => {
   if (state !== req.query.state) {
      return res.status(500).json({ message: "Something has gone wrong" });
   } else if (req.query.error) {
      return res.status(403).json({ message: "Access denied" });
   } else {
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

      res.cookie("spotify_access_token", data.access_token, {
         httpOnly: true,
         maxAge: data.expires_in * 1000,
         secure: true,
      });
      res.cookie("spotify_refresh_token", data.refresh_token, {
         httpOnly: true,
         secure: true,
      });
      res.redirect("http://localhost:5173");
   }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
