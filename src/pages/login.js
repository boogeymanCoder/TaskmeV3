import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useSignInWithFacebook,
  useSignInWithGithub,
} from "react-firebase-hooks/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckNonAuth from "src/components/auth/CheckNonAuth";
import AlertMessage from "../components/AlertMessage";
import PromptMessage from "src/components/PromptMessage";

const Login = () => {
  const [sendingEmail, setSendingEmail] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(null);
  const [alertPasswordReset, setAlertPasswordReset] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();
  const [signInWithEmailAndPassword, emailUser, emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      return signInWithEmailAndPassword(values.email, values.password);
    },
  });

  useEffect(() => {
    if (emailError || googleError || facebookError || githubError) setShowError(true);
  }, [emailError, googleError, facebookError, githubError]);

  if (emailUser || googleUser || facebookUser || githubUser) {
    console.log({ emailUser, googleUser, facebookUser, githubUser });
    router.push("/");
    return null;
  }

  function forgotPassword() {
    if (email) {
      setSendingEmail(true);
      sendPasswordResetEmail(auth, email)
        .then((res) => {
          setPasswordResetSent(true);
          setAlertPasswordReset(true);
          setEmail(null);
          setSendingEmail(false);
        })
        .catch((err) => {
          setPasswordResetSent(false);
          setAlertPasswordReset(true);
          setError(err.message);
          setEmail(null);
          setSendingEmail(false);
        });
    }
  }

  return (
    <CheckNonAuth>
      <Head>
        <title>Login | TaskME</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container columnSpacing={3} rowSpacing={2}>
              <Grid item xs={12} md={4}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={(e) => signInWithFacebook()}
                  size="large"
                  variant="contained"
                >
                  Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={(e) => signInWithGoogle()}
                  size="large"
                  variant="contained"
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  color="black"
                  fullWidth
                  startIcon={<GitHubIcon />}
                  onClick={(e) => signInWithGithub()}
                  size="large"
                  variant="contained"
                >
                  Github
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
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
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={(e) => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link
              variant="subtitle2"
              underline={sendingEmail ? "none" : "hover"}
              sx={{
                cursor: "pointer",
              }}
              onClick={(e) => setOpen(true)}
              disabled={sendingEmail}
              color={sendingEmail ? "text" : "primary"}
            >
              Forgot password?
            </Link>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      {(emailError || googleError || facebookError || githubError) && (
        <Snackbar open={showError}>
          <Alert severity="error" sx={{ width: "100%" }} onClose={(e) => setShowError(!showError)}>
            <Typography variant="p" component="p" color="inherit">
              {emailError
                ? emailError.message
                : googleError
                ? googleError.message
                : facebookError
                ? facebookError.message
                : githubError
                ? githubError.message
                : "Something went wrong"}
            </Typography>
          </Alert>
        </Snackbar>
      )}

      <AlertMessage
        severity={passwordResetSent ? "success" : "error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={passwordResetSent ? "Password reset email has been sent" : `${error}`}
        open={alertPasswordReset}
        setOpen={setAlertPasswordReset}
      />

      <PromptMessage
        title="Password Recovery"
        message="Please enter your registered email."
        open={open}
        handleClose={(e) => setOpen(false)}
        setValue={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        handleSubmit={(e) => {
          forgotPassword();
          setOpen(false);
        }}
      />
    </CheckNonAuth>
  );
};

export default Login;
