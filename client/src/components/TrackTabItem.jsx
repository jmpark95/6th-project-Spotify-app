import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function TrackTabItem({ query }) {
   return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
         {query.data.items.map((item, i) => (
            <React.Fragment key={i}>
               <ListItem>
                  <ListItemAvatar>
                     <Avatar src={item.album.images[2].url} alt="song-image" />
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.artists[0].name} />
                  <ListItemText primary={item.duration_ms} />
               </ListItem>
            </React.Fragment>
         ))}
      </List>
   );
}
