import { CardHeader } from "@material-ui/core";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Link,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import moment from "moment";
import ConfirmMessage from "../ConfirmMessage";
import { MoreVert } from "@mui/icons-material";

export function OfferMenu({ onEdit, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            onEdit();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenConfirmation(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      <ConfirmMessage
        title="Delete Offer?"
        message="After deletion, this offer can no longer be seen by others."
        onAgree={(e) => {
          onDelete()
            .then((res) => {
              setOpenConfirmation(false);
              handleClose();
            })
            .catch((err) => console.log({ err }));
        }}
        onDisagree={(e) => {
          setOpenConfirmation(false);
          handleClose();
        }}
        open={openConfirmation}
        handleClose={(e) => setOpenConfirmation(false)}
      />
    </>
  );
}

export function OfferCard({ offerData, isOwned, onEdit, onDelete }) {
  const database = getDatabase();
  const [task, taskLoading, taskError] = useObjectVal(ref(database, `tasks/${offerData.task}`), {
    keyField: "uid",
  });
  const [owner, ownerLoading, ownerError] = useObjectVal(
    ref(database, `accounts/${offerData.owner}`),
    { keyField: "uid" }
  );

  if (!task || taskLoading || taskError || !owner || ownerLoading || ownerError)
    return <LinearProgress />;

  return (
    <OfferCardView
      avatar={owner.image}
      details={offerData.details}
      lastUpdate={moment(JSON.parse(offerData.updatedAt)).fromNow()}
      name={owner.fullname}
      taskLink={`/tasks/${task.uid}`}
      taskTitle={task.title}
      style={{ border: "none", boxShadow: "none" }}
      onEdit={onEdit}
      onDelete={onDelete}
      isOwned={isOwned}
    />
  );
}

/**
 * Displays users offers to services.
 */
export default function OfferCardView({
  name,
  avatar,
  lastUpdate,
  taskLink,
  taskTitle,
  details,
  isOwned = false,
  onEdit,
  onDelete,
  ...props
}) {
  return (
    <Card {...props}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={name}
        subheader={lastUpdate}
        action={<>{isOwned && <OfferMenu onEdit={onEdit} onDelete={onDelete} />}</>}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Link href={taskLink} underline="hover">
            <Typography variant="h5">{taskTitle}</Typography>
          </Link>
        </Box>
        <Typography>{details}</Typography>
      </CardContent>
    </Card>
  );
}

OfferCard.propTypes = {
  /**
   * Name of the user.
   */
  name: PropTypes.string.isRequired,
  /**
   * The users avatar link.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * When the offer was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The proposed tasks link.
   */
  taskLink: PropTypes.string.isRequired,
  /**
   * The proposed tasks title.
   */
  taskTitle: PropTypes.string.isRequired,
  /**
   * Whether the offer is owned.
   */
  isOwned: PropTypes.bool,
  /**
   * Function to call on edit, requires isOwned = true.
   */
  onEdit: PropTypes.func,
  /**
   * Function to call on delete, requires isOwned = true.
   */
  onDelete: PropTypes.func,
};

OfferCard.default = {
  isOwned: false,
};
