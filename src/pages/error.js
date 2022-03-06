import RedirectPage from "/src/components/redirect-page";

export default function Error({ title, mainText, secondaryText }) {
  return (
    <RedirectPage
      title={title || "Something went wrong"}
      mainText={mainText || "Something went wrong"}
      secondaryText={
        secondaryText || "Were working on it and we'll get it fixed as soon as we can."
      }
      image="/static/images/undraw_injured_9757.svg"
      buttonText="Go back to dashboard"
      continueUrl="/"
    />
  );
}
