// import { FetchApi } from "./Pages/FetchApi/FetchApi";


import { Nav } from "./Components/Navbar/Nav";
import Tables from "./Components/Tables.js/Tables";
import { AxiosPostRequest } from "./Pages/FetchApi/AxiosPostRequest";
// import { FetchApiRee } from "./Pages/FetchApi/FetchApiRee";
// import {Counter} from "./Pages/CounterApp/Counter";



function App() {
  return (
    <>
      <div>

        {/* <Nav /> */}
        {/* <FetchApiRee /> */}
        {/* <FetchApi /> */}
        <AxiosPostRequest />
        {/* <Tables /> */}
        {/* <Counter /> */}
      </div>
    </>
  );
}

export default App;
