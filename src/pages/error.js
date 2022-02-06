import RedirectPage from "src/components/redirect-page";

export default function Error({ title, message }) {
  return (
    <RedirectPage
      title={title || "Something went wrong"}
      mainText="Password Recovered"
      secondaryText={message || "Were working on it and we'll get it fixed as soon as we can."}
      image="/static/images/undraw_injured_9757.svg"
      buttonMessage="Go back to dashboard"
      continueUrl="/"
    />
  );
}
