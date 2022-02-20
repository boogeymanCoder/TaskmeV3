import Head from "next/head";
import { Box, Container, Grid, LinearProgress, Pagination } from "@mui/material";
import { products } from "../__mocks__/products";
import { DashboardLayout } from "../components/dashboard-layout";
import CheckAuth from "src/components/auth/CheckAuth";
import { TaskListToolbar } from "src/components/task/task-list-toolbar";
import { TaskCard } from "src/components/task/task-card";
import NewTask from "src/components/task/NewTask";
import { useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import { useListVals } from "react-firebase-hooks/database";

const Tasks = () => {
  const database = getDatabase();
  const [openNewTask, setOpenNewTask] = useState(false);
  const [values, loading, error] = useListVals(ref(database, "tasks"));

  useEffect(() => {
    console.log({ values, loading, error });
  }, [values, loading, error]);

  return (
    <CheckAuth>
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
              {products.map((task) => (
                <Grid item key={task.id} xs={12}>
                  <TaskCard task={task} />
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
    </CheckAuth>
  );
};

Tasks.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Tasks;
