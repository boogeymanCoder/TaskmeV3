import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TagInput from "../TagInput";
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  Switch,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setTask } from "/src/services/task";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SnackbarMessage from "../SnackbarMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import { get, getDatabase, ref } from "firebase/database";
import { Image } from "@mui/icons-material";
import { getDownloadURL, getStorage, ref as storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import UIDGenerator from "uid-generator";
import PropTypes from "prop-types";
import { createSendBirdChannel } from "../../services/send_bird/channel";
import { sendSendBirdMessage } from "/src/services/send_bird/message";

/**
 * Allows the user to create a task.
 */
export default function NewTask({ open, handleClose }) {
  const uidGen = new UIDGenerator();
  const [images, setImages] = useState([]);
  const [showSuccessAdd, setShowSuccessAdd] = useState(false);
  const [showErrorAdd, setShowErrorAdd] = useState(false);
  const [error, setError] = useState({ message: null });
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);

  const storage = getStorage();
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();

  const formik = useFormik({
    initialValues: {
      title: "",
      details: "",
      tags: [],
      currency: "",
      price: 0,
      skills: [],
      date: new Date(),
      location: "",
      open: true,
      ups: [],
      comments: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      details: Yup.string().max(255).required("Details is required"),
      currency: Yup.string().required("Currency is required"),
      price: Yup.number().required("Price is required"),
      date: Yup.date().required("Date is required"),
      location: Yup.string().max(255).required("Location is required"),
    }),
    onSubmit: async (values) => {
      const employer = user.uid;
      const promise = setTask({
        ...values,
        employer,
        date: JSON.stringify(values.date),
        ups: JSON.stringify(values.ups),
        comments: JSON.stringify(values.comments),
        skills: JSON.stringify(values.skills),
        tags: JSON.stringify(values.tags),
      })
        .then(async (res) => {
          const taskUid = (await get(res)).key;

          await uploadImages(taskUid)
            .then(async (res) => {
              await createSendBirdChannel({
                user_ids: [user.uid],
                name: values.title,
                operator_ids: [user.uid],
              })
                .then(async (res) => {
                  console.log({ res });
                  const channel = res.data;
                  await sendSendBirdMessage("group_channels", channel.channel_url, {
                    message_type: "ADMM",
                    message: "Welcome!",
                  });
                })
                .catch((err) => console.log({ err }));
              console.log({ res });
              handleClose();
              formik.resetForm();
              setShowSuccessAdd(true);
            })
            .catch((err) => console.log({ err }));
          console.log({ images });
        })
        .catch((err) => console.log({ err }));
      return promise;
    },
  });

  async function uploadImages(taskUid) {
    if (images.length === 0) return;
    console.log({ images });

    const uploadPromise = new Promise((resolve, reject) => {
      const urls = [];
      images.forEach(async (image, index) => {
        let uid = await uidGen.generate();
        let ext = image.name.split(".").pop();

        const result = await uploadFile(
          storageRef(storage, `/task/${taskUid}/${uid}.${ext}`),
          image,
          {
            contentType: `image/${ext}`,
          }
        ).catch((err) => console.log("uploadError:", { err }));

        await getDownloadURL(result.ref)
          .then(async (res) => {
            console.log({ url: res });
            urls.push(res);
            if (index === images.length - 1) {
              console.log("resolved!");
              resolve(urls);
            }
          })
          .catch((err) => {
            console.log({ err });
            reject(err);
          });
      });
    });

    return uploadPromise;
  }

  React.useEffect(() => {
    if (uploading) console.log("uploading!");
    if (!uploading) console.log("not uploading!");
  }, [uploading]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>
            <DialogContentText>Fields marked with (*) are required.</DialogContentText>

            <DropzoneArea
              sx={{ mb: 1 }}
              dropzoneText={"Upload images"}
              filesLimit={9999}
              showPreviewsInDropzone={false}
              showPreviews={true}
              showAlerts={false}
              previewChipProps={{ color: "primary", variant: "default" }}
              previewText={false}
              useChipsForPreview={true}
              acceptedFiles={["image/*"]}
              Icon={Image}
              dropzoneProps={{ disabled: formik.isSubmitting }}
              onChange={(values) => {
                console.log({ values });
                setImages(values);
              }}
            />
            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              disabled={formik.isSubmitting}
              name="title"
              sx={{ my: 1 }}
              label="Title"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <TextField
              error={Boolean(formik.touched.details && formik.errors.details)}
              helperText={formik.touched.details && formik.errors.details}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              disabled={formik.isSubmitting}
              name="details"
              sx={{ mb: 1 }}
              label="Details"
              type="text"
              fullWidth
              variant="outlined"
              multiline={true}
              minRows={3}
              required
            />
            <TagInput
              tags={formik.values.tags}
              setTags={(tags) => formik.setFieldValue("tags", tags)}
              disabled={formik.isSubmitting}
              label="Tags (press space to add tag)"
              sx={{ mb: 1 }}
            />
            <Grid container spacing={1} sx={{ mb: 1 }}>
              <Grid item sm={3} xs={12}>
                <TextField
                  error={Boolean(formik.touched.currency && formik.errors.currency)}
                  helperText={formik.touched.currency && formik.errors.currency}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.currency}
                  disabled={formik.isSubmitting}
                  name="currency"
                  label="Currency"
                  type="text"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  disabled={formik.isSubmitting}
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>
            <TagInput
              tags={formik.values.skills}
              disabled={formik.isSubmitting}
              setTags={(skills) => formik.setFieldValue("skills", skills)}
              sx={{ mb: 1 }}
              label="Skills (press space to add skill)"
            />
            <DateTimePicker
              onChange={(value) => {
                formik.setFieldValue("date", value, true);
              }}
              disabled={formik.isSubmitting}
              value={formik.values.date}
              label="Date"
              renderInput={(params) => (
                <TextField
                  error={Boolean(formik.touched.date && formik.errors.date)}
                  helperText={formik.touched.date && formik.errors.date}
                  onBlur={formik.handleBlur}
                  name="date"
                  fullWidth
                  required
                  sx={{ mb: 1 }}
                  {...params}
                />
              )}
              required
            />
            <TextField
              error={Boolean(formik.touched.location && formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.location}
              disabled={formik.isSubmitting}
              name="location"
              sx={{ mb: 1 }}
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <FormControlLabel
              control={<Switch disabled={formik.isSubmitting} defaultChecked />}
              label="Open"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={formik.isSubmitting}
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button disabled={formik.isSubmitting || userLoading} type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <SnackbarMessage
        message="Added successfully"
        snackbarProps={{ open: showSuccessAdd }}
        alertProps={{ onClose: () => setShowSuccessAdd(false) }}
      />
      <SnackbarMessage
        message={error.message}
        snackbarProps={{ open: showErrorAdd }}
        alertProps={{ severity: "error", onClose: () => setShowErrorAdd(false) }}
      />
      <SnackbarErrorMessage error={userError} />
    </div>
  );
}

NewTask.propTypes = {
  /**
   * Wether the update modal was open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Function to call when the user clicks on the backdrop or cancel button.
   */
  handleClose: PropTypes.func.isRequired,
};
