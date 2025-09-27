import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet/>
      <Footer />
    </>
  );
}
export default App;