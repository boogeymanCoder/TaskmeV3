import RedirectPage from "/src/components/redirect-page";

/**
 * Shown whenever the user accesses a prohibited or unavailable url.
 */
const NotFoundPage = () => (
  <RedirectPage
    title="404"
    mainText="404: The page you are looking for isn’t here"
    secondaryText="You either tried some shady route or you came here by mistake. Whichever it is, try
      using the navigation"
    image="/static/images/undraw_page_not_found_su7k.svg"
    buttonText="Go back to dashboard"
    continueUrl="/"
  />
);

export default NotFoundPage;
