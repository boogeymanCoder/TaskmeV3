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

import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, update } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

export function AccountProfile(props) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const storage = getStorage();
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();

  const database = getDatabase();
  const accountRef = dbRef(database, `accounts/${user ? user.uid : "dummy"}`);
  const [account, accountLoading, accountError] = useObjectVal(accountRef);
  const [updateProfile, updateProfileLoading, updateProfileError] = useUpdateProfile(auth);

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

  useEffect(() => {
    return setValues({
      ...values,
      image: user && user.photoURL ? user.photoURL : "",
    });
  }, [updateProfileLoading, user]);

  async function handleUpload(e) {
    // setAvatar(e.target.files ? e.target.files[0] : values.image);
    console.log({ files: e.target.files });
    if (e.target.files.length == 0) return;
    console.log("updating profile");
    const result = await uploadFile(ref(storage, `/avatar/${user.uid}.jpg`), e.target.files[0], {
      contentType: "image/jpeg",
    });
    getDownloadURL(result.ref).then(async (res) => {
      if (account) update(accountRef, { image: res });
      await updateProfile({ photoURL: res });
    });
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
