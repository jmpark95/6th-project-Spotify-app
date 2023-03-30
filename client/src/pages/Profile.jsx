import { Button, Link, Typography, Avatar, Box, ImageList, ImageListItem, useMediaQuery, Grid } from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getProfile, getPlaylists, getAlbums, getFollowedArtists, getPodcasts } from "../api";
import { Link as RouterLink } from "react-router-dom";
import { capitalizeFirstLetter, logout } from "../utils";

export default function Profile() {
   const matches = useMediaQuery("(min-width:600px)");

   const [profileQuery, playlistQuery, albumQuery, followedArtistsQuery, podcastQuery] = useQueries({
      queries: [
         {
            queryKey: ["profileData"],
            queryFn: getProfile,
         },
         {
            queryKey: ["playlistData"],
            queryFn: getPlaylists,
         },
         {
            queryKey: ["albumData"],
            queryFn: getAlbums,
         },
         {
            queryKey: ["followedArtistsData"],
            queryFn: getFollowedArtists,
         },
         {
            queryKey: ["podcastData"],
            queryFn: getPodcasts,
         },
      ],
   });

   if (
      profileQuery.isLoading ||
      playlistQuery.isLoading ||
      albumQuery.isLoading ||
      followedArtistsQuery.isLoading ||
      podcastQuery.isLoading
   )
      return "Loading...";

   if (
      profileQuery.isError ||
      playlistQuery.isError ||
      albumQuery.isError ||
      followedArtistsQuery.isError ||
      podcastQuery.isError
   )
      return "An error has occurred";

   return (
      <>
         <Avatar
            alt="Profile image"
            src={profileQuery.data.images[0].url}
            sx={{ width: 250, height: 250, display: "inline-block" }}
         />
         <Typography variant="h4">
            <Link component={RouterLink} to={profileQuery.data.external_urls.spotify}>
               {profileQuery.data.display_name}
            </Link>
         </Typography>
         <Typography variant="body1">
            Email: <span style={{ color: "rgb(155, 155, 155)" }}>{profileQuery.data.email}</span>
         </Typography>
         <Typography variant="body1">
            Account type:{" "}
            <span style={{ color: "rgb(155, 155, 155)" }}>{capitalizeFirstLetter(profileQuery.data.product)}</span>
         </Typography>
         <Typography variant="body1">
            Explicit content:{" "}
            <span style={{ color: "rgb(155, 155, 155)" }}>
               {profileQuery.data.explicit_content.filter_enabled ? "Disabled" : "Enabled"}
            </span>
         </Typography>
         <Typography variant="body1">
            Followers: <span style={{ color: "rgb(155, 155, 155)" }}>{profileQuery.data.followers.total}</span>
         </Typography>
         <Typography variant="body1">
            Following: <span style={{ color: "rgb(155, 155, 155)" }}>{followedArtistsQuery.data.artists.total}</span>
         </Typography>

         <Box display="flex" justifyContent="center" mt={{ xs: "3rem", sm: "0rem" }}>
            <Button onClick={logout} sx={{ display: { xs: "block", sm: "none" } }}>
               Logout
            </Button>
         </Box>

         {/*how to componetize when returned JSON is of a different format? */}
         <Typography variant="h4" sx={{ mt: "5rem", mb: "1rem" }}>
            Playlists
         </Typography>
         {playlistQuery.data.items.length === 0 ? (
            "None"
         ) : (
            <Grid container justifyContent={"center"} gap={4}>
               {playlistQuery.data.items.map((item, i) => (
                  <Grid item key={i}>
                     <Box
                        component="img"
                        width={{ xs: 100, sm: 130 }}
                        height={{ xs: 100, sm: 130 }}
                        src={item.images[0].url}
                        alt={item.name}
                        loading="lazy"
                     />
                  </Grid>
               ))}
            </Grid>
         )}

         <Typography variant="h4" sx={{ mt: "5rem", mb: "1rem" }}>
            Podcasts
         </Typography>
         {podcastQuery.data.items.length === 0 ? (
            "None"
         ) : (
            <Grid container justifyContent={"center"} gap={4}>
               {podcastQuery.data.items.map((item, i) => (
                  <Grid item key={i}>
                     <Box
                        component="img"
                        width={{ xs: 100, sm: 130 }}
                        height={{ xs: 100, sm: 130 }}
                        src={item.show.images[1].url}
                        alt={item.show.name}
                        loading="lazy"
                     />
                  </Grid>
               ))}
            </Grid>
         )}

         <Typography variant="h4" sx={{ mt: "5rem", mb: "1rem" }}>
            Saved Albums
         </Typography>
         {albumQuery.data.items.length === 0 ? (
            "None"
         ) : (
            <Grid container justifyContent={"center"} gap={4}>
               {albumQuery.data.items.map((item, i) => (
                  <Grid item key={i}>
                     <Box
                        component="img"
                        width={{ xs: 100, sm: 130 }}
                        height={{ xs: 100, sm: 130 }}
                        src={item.album.images[1].url}
                        alt={item.album.name}
                        loading="lazy"
                     />
                  </Grid>
               ))}
            </Grid>
         )}
      </>
   );
}
