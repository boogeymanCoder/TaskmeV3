import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getFirestore, doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { createAccount } from "../../services/user";

import { useFormik } from "formik";
import * as Yup from "yup";

export const AccountProfileDetails = (props) => {
  const firestore = getFirestore();

  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  const [account, accountLoading, accountError] = useDocumentData(
    doc(firestore, "accounts", user ? user.uid : "dummy"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      email: "",
      contact: "",
      gender: "Male",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().max(255).required("Name is required"),
      address: Yup.string().max(255).required("Address is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      contact: Yup.string().max(255).required("Contact is required"),
      gender: Yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
    }),
    onSubmit: async (values) => {
      return createAccount(user.uid, values).catch((err) => {
        console.log({ err });
        setShowError(true);
        setError(err);
      });
    },
  });

  const [error, setError] = useState();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!accountLoading && account) {
      return formik.setValues({
        fullname: account.fullname,
        address: account.address,
        email: account.email,
        contact: account.contact,
        gender: account.gender,
        image: account.image,
      });
    }
    if (!accountLoading && !account) {
      return formik.setValues({
        fullname: user && user.displayName ? user.displayName : "",
        address: "",
        email: user && user.email ? user.email : "",
        contact: "",
        gender: "Male",
        image: user.photoURL,
      });
    }
  }, [accountLoading]);

  return (
    <form onSubmit={formik.handleSubmit} noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                fullWidth
                helperText={formik.touched.fullname && formik.errors.fullname}
                label="Full Name"
                name="fullname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.fullname}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  error={Boolean(formik.touched.gender && formik.errors.gender)}
                  fullWidth
                  helperText={formik.touched.gender && formik.errors.gender}
                  label="Gender"
                  name="gender"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.gender}
                  variant="outlined"
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.address}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.email}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                error={Boolean(formik.touched.contact && formik.errors.contact)}
                fullWidth
                helperText={formik.touched.contact && formik.errors.contact}
                label="Contact Number"
                name="contact"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.contact}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            disabled={userLoading || accountLoading}
            type="submit"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
