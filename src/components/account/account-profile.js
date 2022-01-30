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
  Icon,
  Input,
  Stack,
} from "@mui/material";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useUploadFile, useDownloadURL } from "react-firebase-hooks/storage";

import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

export function AccountProfile(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const storage = getStorage();
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  const firestore = getFirestore();

  const accountRef = doc(firestore, "accounts", user ? user.uid : "dummy");
  const [account, accountLoading, accountError] = useDocumentDataOnce(accountRef, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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

  async function handleUpload(e) {
    console.log(e);
    // setAvatar(e.target.files ? e.target.files[0] : values.image);
    const result = await uploadFile(
      ref(storage, `/avatar/${user.uid}.jpg`),
      e.target.files ? e.target.files[0] : undefined,
      {
        contentType: "image/jpeg",
      }
    );
    getDownloadURL(result.ref).then((res) => updateDoc(accountRef, { image: res }));
    console.log({ result });
  }

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
          {loading || uploading ? (
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
        <Button
          fullWidth
          variant="text"
          color="primary"
          component="label"
          disabled={loading || accountLoading || uploading}
        >
          Upload picture
          <input type="file" hidden multiple={false} onChange={handleUpload} />
        </Button>
      </CardActions>
    </Card>
  );
}
