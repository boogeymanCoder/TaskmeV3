import { logOutAccount } from "/src/services/user";
import RedirectPage from "/src/components/redirect-page";

export default function StorybookVerify() {
  return (
    <RedirectPage
      title="Verify Email"
      mainText="Verify Your Email"
      secondaryText="Before being able to use your account you need to verify that this is your email address at https://taskme.vercel.app"
      image="/static/images/undraw_mailbox_re_dvds.svg"
      buttonText="Go to Login"
      onContinue={(e) => logOutAccount()}
      continueUrl="#"
    />
  );
}
