import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { getDatabase, ref } from "firebase/database";
import { setComment } from "/src/services/comment";

export function CommentForm({ targetUid }) {
  const auth = getAuth();
  const database = getDatabase();
  const [user, userLoading, userError] = useAuthState(auth);
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user?.uid}`),
    { keyField: "uid" }
  );

  async function handleAddComment(values) {
    return setComment({ ...values, owner: account.uid, target: targetUid });
  }

  if (!user || userLoading || userError || !account || accountLoading || accountError) {
    return <LinearProgress />;
  }

  return (
    <CommentFormView avatar={account.image} name={account.fullname} onSubmit={handleAddComment} />
  );
}

export default function CommentFormView({ avatar, name, onSubmit, bodyInitialValue }) {
  const formik = useFormik({
    initialValues: {
      body: bodyInitialValue ?? "",
    },
    validationSchema: Yup.object({
      body: Yup.string().required("Body is required"),
    }),
    onSubmit: async (values) => {
      return onSubmit(values);
    },
  });

  return (
    <Card>
      <CardHeader avatar={<Avatar src={avatar} />} title={name} />
      <form onSubmit={formik.handleSubmit} noValidate>
        <CardContent>
          <TextField
            error={Boolean(formik.touched.body && formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.body}
            disabled={formik.isSubmitting}
            name="body"
            label="Comment"
            fullWidth
            variant="outlined"
            multiline
            rows={5}
          />
        </CardContent>
        <CardActions>
          <Button sx={{ marginLeft: "auto" }} variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
}

CommentForm.propTypes = {
  /**
   * The users image url.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * Function to call on submitting comment.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * Initial body value for editing comment.
   */
  bodyInitialValue: PropTypes.string,
};
