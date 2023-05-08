import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { msToMinAndSec } from "../utils";
import React from "react";

export default function TrackTabItem({ query }) {
   return (
      <List sx={{ width: "100%", maxWidth: 800, display: "inline-block", bgcolor: "background.paper" }}>
         {query.data.items.map((item, i) => (
            <React.Fragment key={i}>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar src={item.album.images[2].url} alt="song-image" />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.artists[0].name} />
                  <ListItemText primary={msToMinAndSec(item.duration_ms)} sx={{ textAlign: "right" }} />
               </ListItem>
            </React.Fragment>
         ))}
      </List>
   );
}
