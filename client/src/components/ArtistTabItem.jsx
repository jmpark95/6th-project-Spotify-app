import { Box, Grid, Typography } from "@mui/material";

export default function ArtistTabItem({ query }) {
   return (
      <Grid mt="2rem" container justifyContent={"center"} gap={7}>
         {query.data.items.length === 0
            ? "Not Available"
            : query.data.items.map((item, i) => (
                 <Grid item key={i}>
                    <Box
                       component="img"
                       borderRadius="50%"
                       width={{ xs: 110, sm: 150, md: 170, lg: 200 }}
                       height={{ xs: 110, sm: 150, md: 170, lg: 200 }}
                       src={item.images[1].url}
                       alt={item.name}
                       loading="lazy"
                    />
                    <Typography variant="subtitle1">{item.name}</Typography>
                 </Grid>
              ))}
      </Grid>
   );
}
