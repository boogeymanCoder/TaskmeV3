import { logOutAccount } from "src/services/user";
import RedirectPage from "../redirect-page";

const EmailVerifiedMessage = () => (
  <RedirectPage
    title="Email Verified"
    mainText="Your email has been verified"
    secondaryText="You can now sign in with your new account"
    image="/static/images/undraw_subscriber_re_om92.svg"
    onContinue={(e) => logOutAccount()}
    buttonMessage="Login"
    continueUrl="/login"
  />
);

export default EmailVerifiedMessage;
