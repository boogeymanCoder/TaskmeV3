import Head from "next/head";
import { Box, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { AccountProfile } from "../../components/account/account-profile";
import { AccountProfileDetails } from "../../components/account/account-profile-details";
import { DashboardLayout } from "../../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";

const Account = () => {
  const router = useRouter();
  const { id } = router.query;

  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  if (!user && !userLoading && !userError) router.push("/login");
  if (!user || userLoading) return <LinearProgress />;

  return (
    <CheckAuth>
      <AccountPage id={id === "me" ? user.uid : id} publicView={id !== "me" && id !== user.uid} />
    </CheckAuth>
  );
};

/**
 * Allows the user to view and update account information
 */
export const AccountPage = ({ id, publicView }) => {
  console.log("AccountPage: ", { publicView });
  return (
    <CheckAuth>
      <Head>
        <title>Account | TaskME</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile id={id} publicView={publicView} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails id={id} publicView={publicView} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </CheckAuth>
  );
};

AccountPage.PropTypes = {
  /**
   * The users id.
   */
  id: PropTypes.string.isRequired,
  /**
   * Whether the account is on public view.
   */
  publicView: PropTypes.bool.isRequired,
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
