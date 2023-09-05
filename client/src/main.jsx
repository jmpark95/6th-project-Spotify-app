import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material/styles";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 20 * 60 * 1000, //20 minutes
         cacheTime: 30 * 60 * 1000,
      },
   },
});

let theme = createTheme();
theme = createTheme({
   palette: {
      background: {
         paper: "#181818",
         default: "#181818",
      },
      text: {
         primary: "#ffffff",
         secondary: "#b3b3b3",
      },
      primary: {
         main: "#040306",
         light: "#191414",
         dark: "#191414",
      },
      secondary: {
         main: "#1db954",
      },
   },

   typography: {
      body1: {
         lineHeight: 2,
      },
      h4: {
         fontWeight: 800,
      },
      h6: {
         fontSize: "0.7rem",
         fontWeight: 200,
         [theme.breakpoints.up("sm")]: {
            fontSize: "1.1rem",
         },
         [theme.breakpoints.up("lg")]: {
            fontSize: "1.4rem",
         },
      },
      fontFamily: ["Poppins, sans-serif"].join(","),
   },

   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               backgroundColor: "#1DB954",
               color: "#ffffff",
               "&:hover": {
                  backgroundColor: "#1DB954",
                  filter: "brightness(90%)",
               },
               padding: "0.7rem 2rem",
               borderRadius: "2rem",
            },
         },
      },
      MuiLink: {
         styleOverrides: {
            root: {
               color: "inherit",
               textDecoration: "none",
            },
         },
      },
   },
});
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById("root")).render(
   <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <BrowserRouter>
            <App />
         </BrowserRouter>
         <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
   </QueryClientProvider>
);
