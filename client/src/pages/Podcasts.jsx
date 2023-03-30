import { Box, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPodcasts } from "../api";

export default function Podcasts() {
   const podcastQuery = useQuery({
      queryKey: ["podcastData"],
      queryFn: getPodcasts,
   });

   if (podcastQuery.isLoading) return "Loading...";

   if (podcastQuery.isError) return "An error has occurred";

   return (
      <>
         <Typography variant="h5" textAlign="left">
            Your Podcasts
         </Typography>
         <Grid mt="2rem" container justifyContent={"center"} gap={7}>
            {podcastQuery.data.items.length === 0
               ? "None"
               : podcastQuery.data.items.map((item, i) => (
                    <Grid item key={i}>
                       <Box
                          component="img"
                          width={{ xs: 110, sm: 150, md: 170, lg: 220 }}
                          height={{ xs: 110, sm: 150, md: 170, lg: 220 }}
                          src={item.show.images[1].url}
                          alt={item.show.name}
                          loading="lazy"
                       />
                       <Typography variant="subtitle1">{item.show.name}</Typography>
                    </Grid>
                 ))}
         </Grid>
      </>
   );
}
