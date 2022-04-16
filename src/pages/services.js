import { LinearProgress } from "@material-ui/core";
import { Container, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from "firebase/auth";
import Head from "next/head";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AccountCheck from "src/components/account/AccountCheck";
import CheckAuth from "src/components/auth/CheckAuth";
import { DashboardLayout } from "src/components/dashboard-layout";
import ServiceForm from "src/components/service/ServiceForm";
import ServiceListToolbar from "src/components/service/ServiceToolbar";
import { setService } from "src/services/service";

const Services = () => {
  return (
    <CheckAuth>
      <ServicesPage />
    </CheckAuth>
  );
};

export function ServicesPage() {
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [newServiceOpen, setNewServiceOpen] = useState(false);

  async function handleAddService(values) {
    console.log({ values });
    return setService(values, user.uid)
      .then((res) => setNewServiceOpen(false))
      .catch((err) => console.log(err));
  }

  if (userLoading || !user || userError) {
    return <LinearProgress />;
  }

  return (
    <>
      <AccountCheck>
        <Head>
          <title>Services | TaskME</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <ServiceListToolbar handleAddService={() => setNewServiceOpen(true)} />
            {/* <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {console.log({ tasks })}
                {tasks.map((task) => (
                  <Grid item key={task.uid} xs={12}>
                    <TaskCard taskData={task} />
                  </Grid>
                ))}
              </Grid>
            </Box> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pt: 3,
              }}
            >
              <Pagination color="primary" count={3} size="small" />
            </Box>
          </Container>
        </Box>
      </AccountCheck>
      <ServiceForm
        open={newServiceOpen}
        title="New Service"
        onClose={() => setNewServiceOpen(false)}
        onSubmit={handleAddService}
        onCancel={() => setNewServiceOpen(false)}
      />
    </>
  );
}

Services.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Services;
