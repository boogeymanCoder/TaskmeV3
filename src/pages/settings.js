import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingsNotifications } from "../components/settings/settings-notifications";
import { SettingsPassword } from "../components/settings/settings-password";
import CheckAuth from "src/components/auth/CheckAuth";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { SettingsEmail } from "src/components/settings/settings-email";

const Settings = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (user && user.providerData[0].providerId == "password") {
      setShowUpdate(true);
    }
  }, [user]);

  return (
    <CheckAuth>
      <Head>
        <title>Settings | TaskME</title>
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
            Settings
          </Typography>
          <SettingsNotifications />

          {showUpdate && (
            <Box sx={{ pt: 3 }}>
              <SettingsEmail />
            </Box>
          )}
          {showUpdate && (
            <Box sx={{ pt: 3 }}>
              <SettingsPassword />
            </Box>
          )}
        </Container>
      </Box>
    </CheckAuth>
  );
};

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
