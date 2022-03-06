import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import CheckAuth from "/src/components/auth/CheckAuth";
import AccountCheck from "/src/components/account/AccountCheck";

function Customers() {
  return (
    <CheckAuth>
      <AccountCheck>
        <Head>
          <title>Customers | TaskME</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={customers} />
            </Box>
          </Container>
        </Box>
      </AccountCheck>
    </CheckAuth>
  );
}
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
