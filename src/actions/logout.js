// rrd imports
import { redirect } from "react-router-dom";

// helpers
import { deleteItem } from "../helpers";
import { leaveItem } from "../helpers";


export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "userName"
  })
  
  
  // return redirect
  return redirect("/")
}