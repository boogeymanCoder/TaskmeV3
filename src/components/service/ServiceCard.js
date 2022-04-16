import { CardHeader, Chip, Grid } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDatabase, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { useEffect } from "react";
import moment from "moment";

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

export function ServiceCard({ serviceData }) {
  const database = getDatabase();

  console.log({ serviceData });
  console.log(`accounts/${serviceData.owner}`);
  const [owner, ownerLoading, ownerError] = useObjectVal(
    ref(database, `accounts/${serviceData.owner}`)
  );

  useEffect(
    () => console.log({ owner, ownerLoading, ownerError }),
    [owner, ownerLoading, ownerError]
  );

  if (!owner || ownerLoading || ownerError) return <LinearProgress />;

  return (
    <ServiceCardView
      avatar={owner.image}
      owner={owner.fullname}
      lastUpdated={moment("2022-04-16T04:50:21.630Z").fromNow()}
      title={serviceData.title}
      details={serviceData.details}
      tags={serviceData.tags}
      currency={serviceData.currency}
      price={serviceData.price}
    />
  );
}

/**
 * Displays Service information posted by user.
 */
export default function ServiceCardView({
  avatar,
  owner,
  lastUpdated,
  title,
  details,
  tags,
  currency,
  price,
}) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader title={owner} avatar={<Avatar src={avatar} />} subheader={lastUpdated} />
      <CardContent>
        <Typography variant="h4" align="center">
          {title}
        </Typography>
        <Grid container spacing={1}>
          {tags.map((tag) => (
            <Grid item key="tag">
              <Chip color="primary" size="small" label={tag} />
            </Grid>
          ))}
        </Grid>
        <Typography>{details}</Typography>
        <Typography align="end" variant="h5" color="primary">
          {currency} {price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Offers</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

ServiceCard.propTypes = {
  /**
   * The service owners image link.
   */
  avatar: PropTypes.string.isRequired,
  /**
   * The owner's name.
   */
  owner: PropTypes.string.isRequired,
  /**
   * When the service was last updated.
   */
  lastUpdated: PropTypes.string.isRequired,
  /**
   * The service title.
   */
  title: PropTypes.string.isRequired,
  /**
   * Extra information about the service.
   */
  details: PropTypes.string,
  /**
   * Array of tags that identify the service as a category.
   */
  tags: PropTypes.array,
  /**
   * The proposed price currency of the service owner.
   */
  currency: PropTypes.string.isRequired,
  /**
   * The proposed price of the service owner.
   */
  price: PropTypes.number.isRequired,
};
