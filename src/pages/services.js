import Head from "next/head";
import React from "react";
import AccountCheck from "src/components/account/AccountCheck";
import CheckAuth from "src/components/auth/CheckAuth";
import { DashboardLayout } from "src/components/dashboard-layout";

export default function Services() {
  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Services | TaskME</title>
        </Head>
        <h1>Services</h1>
      </AccountCheck>
    </CheckAuth>
  );
}

Services.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
