import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getProfile, getPlaylists, getAlbums, getFollowedArtists, getPodcasts } from "../api";

export default function Profile() {
   const queryClient = useQueryClient();

   const profileQuery = useQuery({
      queryKey: ["profileData"],
      queryFn: getProfile,
   });

   const playlistQuery = useQuery({
      queryKey: ["playlistData"],
      queryFn: getPlaylists,
   });

   const albumQuery = useQuery({
      queryKey: ["albumData"],
      queryFn: getAlbums,
   });

   const followedArtistsQuery = useQuery({
      queryKey: ["followedArtistsData"],
      queryFn: getFollowedArtists,
   });

   const podcastQuery = useQuery({
      queryKey: ["podcastData"],
      queryFn: getPodcasts,
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
      profileQuery.error ||
      playlistQuery.error ||
      albumQuery.error ||
      followedArtistsQuery.error ||
      podcastQuery.error
   )
      return "An error has occurred";

   return (
      <>
         <h1>Profile</h1>
         {profileQuery.data.email}
         {profileQuery.data.display_name}
         {profileQuery.data.followers.total} followers
         {profileQuery.data.product} account
         {profileQuery.data.explicit_content.filter_enabled
            ? "You have explicit content disabled"
            : "You have explicit content enabled"}
         {/* {profileQuery.data.images.url} */}
         <a href={profileQuery.data.external_urls.spotify} target="_blank">
            ur official spotify url
         </a>
         <h1>Playlists</h1>
         <div>You have {playlistQuery.data.total} playlists</div>
         <h1>Podcasts</h1>
         <div>{podcastQuery.data.total}</div>
         <h1>Saved albums</h1>
         <div>{albumQuery.data.total}</div>
         <h1>Followed artists</h1>
         <div>{followedArtistsQuery.data.artists.total}</div>
      </>
   );
}
