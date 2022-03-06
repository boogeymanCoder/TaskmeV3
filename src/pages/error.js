import RedirectPage from "/src/components/redirect-page";
import PropTypes from "prop-types";

/**
 * Displays error message to the user.
 */
export default function Error({
  title = "Error",
  mainText = "Something went wrong",
  secondaryText = "Were working on it and we'll get it fixed as soon as we can.",
}) {
  return (
    <RedirectPage
      title={title}
      mainText={mainText}
      secondaryText={secondaryText}
      image="/static/images/undraw_injured_9757.svg"
      buttonText="Go back to dashboard"
      continueUrl="/"
    />
  );
}

Error.propTypes = {
  /**
   * Tab title for the error page.
   */
  title: PropTypes.string,
  /**
   * The title text for the page.
   */
  mainText: PropTypes.string,
  /**
   * Additional information to display to the user.
   */
  secondaryText: PropTypes.string,
};

Error.defaultProps = {
  title: "Error",
  mainText: "Something went wrong",
  secondaryText: "Were working on it and we'll get it fixed as soon as we can.",
};
