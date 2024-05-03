// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import footer from "../assets/footer.jpg";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers"

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  const password = fetchData("password");

  return { userName, password }
}

const Main = () => {
  const { userName, password } = useLoaderData()

  return (
    <div className="layout">
      <Nav userName={userName} />


      <main>
        <Outlet />
      </main>
      <img src={footer} alt="" />
    </div>
  )
}
export default Main