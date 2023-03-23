import { useState } from "react";

function App() {
   return (
      <div className="App">
         <div>Homepage (/)</div>
         <a href={`${import.meta.env.VITE_BACKEND}/login`}>Login to spotify</a>
      </div>
   );
}

export default App;
