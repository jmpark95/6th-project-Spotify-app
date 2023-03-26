import { useEffect, useState } from "react";
import { getAccessToken } from "./utils";
import { Routes, Route, Link } from "react-router-dom";
import Profile from "./pages/Profile";
import Artists from "./pages/Artists";
import Tracks from "./pages/Tracks";
import Podcasts from "./pages/Podcasts";

function App() {
   const [userToken, setUserToken] = useState(null);

   useEffect(() => {
      setUserToken(getAccessToken());
   }, []);

   return (
      <div className="App">
         {userToken ? (
            <>
               <nav>
                  <Link to="/">Profile</Link>
                  <Link to="/artists">Artists</Link>
                  <Link to="/tracks">Tracks</Link>
                  <Link to="/podcasts">Podcasts</Link>
               </nav>

               <Routes>
                  <Route path="/" element={<Profile />}></Route>
                  <Route path="/artists" element={<Artists />}></Route>
                  <Route path="/tracks" element={<Tracks />}></Route>
                  <Route path="/podcasts" element={<Podcasts />}></Route>
               </Routes>
            </>
         ) : (
            <>
               <div>Homepage (/)</div>
               <a href={`${import.meta.env.VITE_BACKEND}/login`}>Login to spotify</a>
            </>
         )}
      </div>
   );
}

export default App;
