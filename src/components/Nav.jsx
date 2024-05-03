// rrd imports
import { Form, NavLink } from "react-router-dom"

// assets
import logomark from "../assets/logomark.jpg"

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={50} />
        <span>My Personal Budget</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Log out of account?")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Log Out</span>
            </button>

          </Form>
        )
      }
    </nav>
  )
}
export default Nav