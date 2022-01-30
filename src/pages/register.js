import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const Register = () => {
  const [showError, setShowError] = useState(false);

  const auth = getAuth();
  const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  useEffect(() => {
    if (emailError) setShowError(true);
  }, [emailError]);

  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string()
        .max(255)
        .required("Password is required")
        .matches(/.{8,}/, "Password must have at eight characters")
        .matches(/[0-9]+/, "Password must have at least one [0-9] numerical character")
        .matches(/[a-z]+/, "Password must have at least one [a-z] lower case alphabet")
        .matches(/[A-Z]+/, "Password must have at least one [A-Z] upper case alphabet")
        .matches(/[^a-zA-Z0-9]+/, "Password must have at least one [!$*...] special character"),
      policy: Yup.boolean().oneOf([true], "This field must be checked"),
    }),
    onSubmit: (values) => {
      return createUserWithEmailAndPassword(values.email, values.password);
    },
  });

  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Use your email to create a new account
              </Typography>
            </Box>

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              required
            />

            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>{formik.errors.policy}</FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      {emailUser && (
        <Snackbar open={true}>
          <Alert severity="success" sx={{ width: "100%" }}>
            <Typography variant="p" component="p" color="inherit">
              Account successfully created! - <Link href="/login">Sign in</Link>
            </Typography>
          </Alert>
        </Snackbar>
      )}
      {emailError && (
        <Snackbar open={showError}>
          <Alert severity="error" sx={{ width: "100%" }} onClose={(e) => setShowError(!showError)}>
            <Typography variant="p" component="p" color="inherit">
              {emailError.message}
            </Typography>
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Register;
