import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import illustration from "../assets/illustration.jpg";

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>Create a personal budget today!</h1>
        <p>This budget is specifically designed for you. Create an account to get started!</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Username"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            aria-label="Your Password"
            autoComplete="given-password"
          />
          <input type="hidden" name="_action" value="newUser" data-cy="newUserAction" />
<button type="submit" className="btn btn--dark" data-cy="createAccountButton">
  <span>Create Account</span>
</button>

        </Form>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Username"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            aria-label="Your Password"
            autoComplete="given-password"
          />
          <input type="hidden" name="_action" value="oldUser" data-cy="newUserAction" />
          <button type="submit" className="btn btn--dark " data-cy="loginButton" >
            <span>Log In</span>
          </button>
        </Form>
      </div>
      <img src={illustration} alt="Pig with money" width={600} />
    </div>
  );
};

export default Intro;
