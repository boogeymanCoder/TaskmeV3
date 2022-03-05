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
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { DateTimePicker } from "@mui/lab";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setTask, updateTask } from "src/services/task";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SnackbarMessage from "../SnackbarMessage";
import SnackbarErrorMessage from "../SnackbarErrorMessage";
import { Image } from "@mui/icons-material";
import { deleteObject, getDownloadURL, getStorage, list, ref } from "firebase/storage";
import UIDGenerator from "uid-generator";
import { useUploadFile } from "react-firebase-hooks/storage";

export default function UpdateTask({ oldImageLinks, task, open, handleClose, filenames }) {
  const updatedOldImageLinks = oldImageLinks ? oldImageLinks : [];
  const [showSuccessUpdate, setShowSuccessUpdate] = useState(false);
  const [showErrorUpdate, setShowErrorUpdate] = useState(false);
  const [error, setError] = useState({ message: null });
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [images, setImages] = useState([]);
  const storage = getStorage();
  const [fetchImages, setFetchImages] = useState(false);
  const [newImages, setNewImages] = useState([]);
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  const [deletingImage, setDeletingImage] = useState(false);

  const uidGen = new UIDGenerator();

  React.useEffect(() => {
    console.log("fetching images...");
    list(ref(storage, `/task/${task.uid}`))
      .then(async (res) => {
        console.log({ uid: task.uid });
        setImages(res.items.map((ref) => ref.name));

        if (fetchImages) setFetchImages(false);
      })
      .catch((err) => console.log({ err }));
  }, [open, fetchImages]);

  const formik = useFormik({
    initialValues: { ...task },
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
      const promise = updateTask(task.uid, {
        ...values,
        employer,
        comments: JSON.stringify(values.comments),
        date: JSON.stringify(values.date),
        ups: JSON.stringify(values.ups),
        skills: JSON.stringify(values.skills),
        tags: JSON.stringify(values.tags),
      })
        .then(async (res) => {
          await uploadImages(task.uid)
            .then(async (res) => {
              handleClose();
              setShowSuccessUpdate(true);
              console.log({ res });
            })
            .catch((err) => console.log({ err }));
        })
        .catch((err) => {
          console.log({ err });
          setError(err);
          setShowErrorAdd(true);
        });

      return promise;
    },
  });

  function removeImage(fileName) {
    if (uploading) return;

    setDeletingImage(true);
    const imageRef = ref(storage, `/task/${task.uid}/${fileName}`);
    deleteObject(imageRef)
      .then((res) => {
        console.log(res);
        setFetchImages(true);
        setDeletingImage(false);
      })
      .catch((err) => console.log(err));
  }

  async function uploadImages(taskUid) {
    if (newImages.length === 0) return [];
    console.log({ newImages });

    const uploadPromise = new Promise((resolve, reject) => {
      const urls = [];
      newImages.forEach(async (newImage, index) => {
        let uid = await uidGen.generate();
        let ext = newImage.name.split(".").pop();

        const result = await uploadFile(ref(storage, `/task/${taskUid}/${uid}.${ext}`), newImage, {
          contentType: `image/${ext}`,
        }).catch((err) => console.log("uploadError:", { err }));

        await getDownloadURL(result.ref)
          .then(async (res) => {
            console.log({ url: res });
            urls.push(res);
            if (index === newImages.length - 1) {
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

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
        <form onSubmit={formik.handleSubmit} noValidate>
          <DialogTitle>Add task</DialogTitle>
          <DialogContent>
            <DialogContentText>Fields marked with (*) are required.</DialogContentText>

            {console.log({ images })}

            <Typography variant="h5">Uploaded images</Typography>
            <Grid container>
              {images.map((image) => (
                <Grid item key={image} sx={{ mb: 1 }}>
                  <Chip
                    label={
                      <Link underline="hover" color="#ffffff" href={filenames.get(image)}>
                        {image}
                      </Link>
                    }
                    sx={{ mr: 1 }}
                    color="primary"
                    onDelete={() => removeImage(image)}
                  />
                </Grid>
              ))}
            </Grid>
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
              dropzoneProps={{ disabled: formik.isSubmitting || uploading || deletingImage }}
              onChange={(values) => {
                console.log({ values });
                setNewImages(values);
              }}
            />
            <TextField
              error={Boolean(formik.touched.title && formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              disabled={formik.isSubmitting || deletingImage}
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
              disabled={formik.isSubmitting || deletingImage}
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
              disabled={formik.isSubmitting || deletingImage}
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
                  disabled={formik.isSubmitting || deletingImage}
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
                  disabled={formik.isSubmitting || deletingImage}
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
              disabled={formik.isSubmitting || deletingImage}
              setTags={(skills) => formik.setFieldValue("skills", skills)}
              sx={{ mb: 1 }}
              label="Skills (press space to add skill)"
            />
            <DateTimePicker
              onChange={(value) => {
                formik.setFieldValue("date", value, true);
              }}
              disabled={formik.isSubmitting || deletingImage}
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
              disabled={formik.isSubmitting || deletingImage}
              name="location"
              sx={{ mb: 1 }}
              label="Location"
              type="text"
              fullWidth
              variant="outlined"
              required
            />
            <FormControlLabel
              control={<Switch disabled={formik.isSubmitting || deletingImage} defaultChecked />}
              label="Open"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={formik.isSubmitting || deletingImage}
              onClick={() => {
                handleClose();
                formik.resetForm();
              }}
            >
              Cancel
            </Button>
            <Button disabled={formik.isSubmitting || userLoading} type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <SnackbarMessage
        message="Updated successfully"
        snackbarProps={{ open: showSuccessUpdate }}
        alertProps={{ onClose: () => setShowSuccessUpdate(false) }}
      />
      <SnackbarMessage
        message={error.message}
        snackbarProps={{ open: showErrorUpdate }}
        alertProps={{ severity: "error", onClose: () => setShowErrorUpdate(false) }}
      />
      <SnackbarErrorMessage error={userError} />
      <SnackbarErrorMessage error={uploadError} />
    </div>
  );
}
