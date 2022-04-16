import Head from "next/head";
import { Box, Container, Grid, LinearProgress, Pagination } from "@mui/material";
import { products } from "../../__mocks__/products";
import { DashboardLayout } from "../../components/dashboard-layout";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";
import { TaskListToolbar } from "/src/components/task/task-list-toolbar";
import { TaskCard } from "/src/components/task/task-card";
import NewTask from "/src/components/task/NewTask";
import { useEffect, useState } from "react";
import { getDatabase, ref } from "firebase/database";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";
import SnackbarErrorMessage from "/src/components/SnackbarErrorMessage";
import { useRouter } from "next/router";

const Task = () => {
  return (
    <CheckAuth>
      <TaskPage />
    </CheckAuth>
  );
};

/**
 * This page shows the user the task that has been selected.
 */
export const TaskPage = () => {
  const router = useRouter();
  const { query } = router;
  const { uid } = query;
  console.log({ uid });

  const database = getDatabase();
  const [task, taskLoading, taskError] = useObjectVal(ref(database, `tasks/${uid}`), {
    keyField: "uid",
  });

  useEffect(() => {
    console.log({ task, taskLoading, taskError });
  }, [task, taskLoading, taskError]);

  if (taskLoading || !task || taskError) return <LinearProgress />;

  return (
    <>
      <AccountCheck>
        <Head>
          <title>Task | TaskME</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <TaskCard taskData={task} />
        </Box>
        <SnackbarErrorMessage error={taskError} />
      </AccountCheck>
    </>
  );
};

Task.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Task;
