import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

export function AccountProfile(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const firestore = getFirestore();

  const [account, accountLoading, accountError] = useDocumentDataOnce(
    doc(firestore, "accounts", user ? user.uid : "dummy"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [values, setValues] = useState({
    fullname: account ? account.fullname : "",
    address: account ? account.address : "",
    email: account ? account.email : "",
    contact: account ? account.contact : "",
    gender: account ? account.gender : "",
    image: account ? account.image : "",
  });

  useEffect(() => {
    if (account)
      setValues({
        fullname: account.fullname,
        address: account.address,
        email: account.email,
        contact: account.contact,
        gender: account.gender,
        image: account.image,
      });

    if (!accountLoading && !account) {
      return setValues({
        fullname: user && user.displayName ? user.displayName : "",
        address: "",
        email: user && user.email ? user.email : "",
        contact: "",
        gender: "Male",
        image: user && user.photoURL ? user.photoURL : "",
      });
    }
  }, [account, accountLoading]);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Skeleton
              variant="circular"
              animation="pulse"
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
          ) : (
            <Avatar
              src={values.image}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
          )}
          <Typography color="textPrimary" gutterBottom variant="body2" align="center">
            {values.fullname}
          </Typography>
          <Typography color="textSecondary" variant="body2" align="center">
            {values.address}
          </Typography>
          <Typography color="textSecondary" variant="body2" align="center">
            {values.gender}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text" disabled={loading || accountLoading}>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
}
