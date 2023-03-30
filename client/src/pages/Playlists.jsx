import { useQuery } from "@tanstack/react-query";
import { Box, Grid, Typography } from "@mui/material";
import { getPlaylists } from "../api";

export default function Playlists() {
   const playlistQuery = useQuery({
      queryKey: ["playlistData"],
      queryFn: getPlaylists,
   });

   if (playlistQuery.isLoading) return "Loading...";

   if (playlistQuery.isError) return "An error has occurred";

   return (
      <>
         <Typography variant="h5" textAlign="left">
            Your Playlists
         </Typography>
         <Grid mt="2rem" container justifyContent={"center"} gap={7}>
            {playlistQuery.data.items.length === 0
               ? "None"
               : playlistQuery.data.items.map((item, i) => (
                    <Grid item key={i}>
                       <Box
                          component="img"
                          width={{ xs: 110, sm: 150, md: 170, lg: 220 }}
                          height={{ xs: 110, sm: 150, md: 170, lg: 220 }}
                          src={item.images[0].url}
                          alt={item.name}
                          loading="lazy"
                       />
                       <Typography variant="subtitle1">{item.name}</Typography>
                    </Grid>
                 ))}
         </Grid>
      </>
   );
}
