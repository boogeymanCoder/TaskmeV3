import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PropTypes from "prop-types";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

export function Comment({ commentData }) {
  const database = getDatabase();
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${commentData?.owner}`),
    { keyField: "uid" }
  );

  if (!account || accountLoading || accountError) return <LinearProgress />;

  return (
    <CommentView
      avatar={account.image}
      name={account.fullname}
      body={commentData.body}
      lastUpdate="2 minutes ago"
    />
  );
}

/**
 * Shows users comment on forum page.
 */
export default function CommentView({ avatar, name, lastUpdate, body }) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        title={
          <>
            <Typography component="span" sx={{ marginRight: 1 }} variant="h6">
              {name}
            </Typography>
            <Typography component="span" variant="subtitle2">
              {lastUpdate}
            </Typography>
          </>
        }
        subheader={body}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
      />
    </Card>
  );
}

Comment.propTypes = {
  /**
   * The users image url.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the comment was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The comment body.
   */
  body: PropTypes.string.isRequired,
};
