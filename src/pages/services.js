import { LinearProgress } from "@material-ui/core";
import { Container, Grid, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import Head from "next/head";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals } from "react-firebase-hooks/database";
import AccountCheck from "src/components/account/AccountCheck";
import CheckAuth from "src/components/auth/CheckAuth";
import { DashboardLayout } from "src/components/dashboard-layout";
import OfferForm from "src/components/offer/OfferForm";
import { ServiceCard } from "src/components/service/ServiceCard";
import ServiceForm from "src/components/service/ServiceForm";
import ServiceListToolbar from "src/components/service/ServiceToolbar";
import { setOffer } from "src/services/offer";
import { setService, updateService, deleteService } from "src/services/service";

const Services = () => {
  return (
    <CheckAuth>
      <ServicesPage />
    </CheckAuth>
  );
};

export function ServicesPage() {
  const database = getDatabase();
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [newServiceOpen, setNewServiceOpen] = useState(false);
  const [editServiceOpen, setEditServiceOpen] = useState(false);
  const [editServiceInitialValues, setEditServiceInitialValues] = useState(null);
  const [services, servicesLoading, servicesError] = useListVals(ref(database, "services"), {
    keyField: "uid",
  });
  const [newOfferOpen, setNewOfferOpen] = useState(false);
  const [serviceToOffer, setServiceToOffer] = useState();

  async function handleAddOffer(values) {
    console.log({ values });
    return setOffer({ ...values, owner: user?.uid, service: serviceToOffer.uid })
      .then((res) => {
        setServiceToOffer(null);
        return setNewOfferOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setServiceToOffer(null);
        return err;
      });
  }

  async function handleAddService(values) {
    console.log({ values });
    console.log("before add service:", { user });
    return setService({ ...values, owner: user?.uid })
      .then((res) => {
        setNewServiceOpen(false);
        return res;
      })
      .catch((err) => console.log(err));
  }

  async function handleEditService(values) {
    console.log({ editServiceInitialValues, values });
    return updateService(editServiceInitialValues.uid, values)
      .then((res) => {
        console.log({ res });
        setEditServiceInitialValues(undefined);
        setEditServiceOpen(false);
        return res;
      })
      .catch((err) => console.log({ err }));
  }

  async function handleDeleteService(uid) {
    return deleteService(uid);
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
            {services && !servicesLoading && !servicesError && (
              <Box sx={{ pt: 3 }}>
                <Grid container spacing={3}>
                  {console.log({ services })}
                  {services.map((service) => (
                    <Grid item key={service.uid} xs={12}>
                      <ServiceCard
                        serviceData={service}
                        onEdit={() => {
                          setEditServiceOpen(true);
                          setEditServiceInitialValues({
                            title: service.title,
                            details: service.details,
                            tags: service.tags,
                            currency: service.currency,
                            price: service.price,
                            uid: service.uid,
                            createdAt: service.createdAt,
                          });
                        }}
                        onDelete={() => handleDeleteService(service.uid)}
                        onOffer={() => {
                          setServiceToOffer(service);
                          setNewOfferOpen(true);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
            {(!services || servicesLoading || servicesError) && <LinearProgress />}
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
      <OfferForm
        open={newOfferOpen}
        title="New Offer"
        onClose={() => setNewOfferOpen(false)}
        onSubmit={handleAddOffer}
        onCancel={() => setNewOfferOpen(false)}
      />
      <ServiceForm
        open={newServiceOpen}
        title="New Service"
        onClose={() => setNewServiceOpen(false)}
        onSubmit={handleAddService}
        onCancel={() => setNewServiceOpen(false)}
      />
      {console.log("service:", editServiceInitialValues)}
      {editServiceInitialValues && (
        <ServiceForm
          open={editServiceOpen}
          title="Edit Service"
          onClose={() => {
            setEditServiceInitialValues(undefined);
            setEditServiceOpen(false);
          }}
          onSubmit={handleEditService}
          onCancel={() => {
            setEditServiceInitialValues(undefined);
            setEditServiceOpen(false);
          }}
          initialValues={editServiceInitialValues}
        />
      )}
    </>
  );
}

Services.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Services;
