import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumIcon from "@mui/icons-material/Forum";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

/**
 * Displays forum post.
 */
export default function Post({ avatar, name, lastUpdate, details, onEdit, onLike, onComment }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        }
        title={name}
        subheader={lastUpdate}
      />
      <CardContent>
        <Typography>{details}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onLike}>
          <ThumbUpIcon />
        </IconButton>
        <IconButton onClick={onComment}>
          <ForumIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Comments</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

Post.propTypes = {
  /**
   * The users avatar URL.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The users name.
   */
  name: PropTypes.string.isRequired,
  /**
   * When the post was last updated.
   */
  lastUpdate: PropTypes.string.isRequired,
  /**
   * The post body.
   */
  details: PropTypes.string.isRequired,
  /**
   * Function to call on edit.
   */
  onEdit: PropTypes.func.isRequired,
  /**
   * Function to call on like.
   */
  onLike: PropTypes.func.isRequired,
  /**
   * Function to call on comment.
   */
  onComment: PropTypes.func.isRequired,
};
