import React, { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getTopArtists, getTopArtistsMedium, getTopArtistsShort } from "../api";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import ArtistTabItem from "../components/ArtistTabItem";

export default function Artists() {
   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const [topArtistQuery, topArtistMediumQuery, topArtistShortQuery] = useQueries({
      queries: [
         {
            queryKey: ["topArtistsData"],
            queryFn: getTopArtists,
         },
         {
            queryKey: ["topArtistsMediumData"],
            queryFn: getTopArtistsMedium,
         },
         {
            queryKey: ["topArtistsShortData"],
            queryFn: getTopArtistsShort,
         },
      ],
   });

   if (topArtistQuery.isLoading || topArtistMediumQuery.isLoading || topArtistShortQuery.isLoading) return "Loading...";

   if (topArtistQuery.error || topArtistMediumQuery.error || topArtistShortQuery.error) return "An error has occurred";

   return (
      <>
         <Grid container flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="center">
            <Typography item="true" variant="h5" mb={{ xs: "1rem", sm: "0" }}>
               Top Artists
            </Typography>
            <Tabs
               textColor="secondary"
               indicatorColor="secondary"
               item="true"
               value={value}
               onChange={handleChange}
               aria-label="tabs"
            >
               <Tab label="All Time" {...a11yProps(0)} />
               <Tab label="6 Months" {...a11yProps(1)} />
               <Tab label="1 Month" {...a11yProps(2)} />
            </Tabs>
         </Grid>

         <TabPanel value={value} index={0}>
            <ArtistTabItem query={topArtistQuery} />
         </TabPanel>
         <TabPanel value={value} index={1}>
            <ArtistTabItem query={topArtistMediumQuery} />
         </TabPanel>
         <TabPanel value={value} index={2}>
            <ArtistTabItem query={topArtistShortQuery} />
         </TabPanel>
      </>
   );
}

function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`tabpanel-${index}`}
         aria-labelledby={`tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography component="div">{children}</Typography>
            </Box>
         )}
      </div>
   );
}

TabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
   };
}
