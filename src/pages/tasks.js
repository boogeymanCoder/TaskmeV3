import Head from "next/head";
import { Box, Container, Grid, LinearProgress, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { DashboardLayout } from "../components/dashboard-layout";
import CheckAuth from "src/components/auth/CheckAuth";
import AccountCheck from "src/components/account/AccountCheck";
import { TaskListToolbar } from "src/components/task/task-list-toolbar";
import { TaskCard } from "src/components/task/task-card";
import NewTask from "src/components/task/NewTask";
import { useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";
import SnackbarErrorMessage from "src/components/SnackbarErrorMessage";

const Tasks = () => {
  const database = getDatabase();
  const [openNewTask, setOpenNewTask] = useState(false);
  const [tasks, tasksLoading, tasksError] = useListVals(ref(database, "tasks"), {
    keyField: "uid",
  });

  useEffect(() => {
    console.log({ tasks, tasksLoading, tasksError });
  }, [tasks, tasksLoading, tasksError]);

  if (tasksLoading || !tasks) return <LinearProgress />;

  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Tasks | TaskME</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <TaskListToolbar handleAddTask={() => setOpenNewTask(true)} />
            <Box sx={{ pt: 3 }}>
              <Grid container spacing={3}>
                {console.log({ tasks })}
                {tasks.map((task) => (
                  <Grid item key={task.uid} xs={12}>
                    <TaskCard taskData={task} />
                  </Grid>
                ))}
              </Grid>
            </Box>
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
        <NewTask open={openNewTask} handleClose={() => setOpenNewTask(false)} />
        <SnackbarErrorMessage error={tasksError} />
      </AccountCheck>
    </CheckAuth>
  );
};

Tasks.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Tasks;
