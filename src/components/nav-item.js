import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Badge, Box, Button, ListItem } from "@mui/material";

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = !router ? false : href ? router.pathname === href : false;
  console.log({ href, icon, title, others, props });

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <NextLink href={href} passHref>
        <Badge
          badgeContent={others.isNew ? "New" : ""}
          invisible={!others.isNew}
          overlap="circular"
          color="secondary"
        >
          <Button
            component="a"
            startIcon={icon}
            disableRipple
            sx={{
              backgroundColor: active && "rgba(255,255,255, 0.08)",
              borderRadius: 1,
              color: active ? "secondary.main" : "neutral.300",
              fontWeight: active && "fontWeightBold",
              justifyContent: "flex-start",
              px: 3,
              textAlign: "left",
              textTransform: "none",
              width: "100%",
              "& .MuiButton-startIcon": {
                color: active ? "secondary.main" : "neutral.400",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255, 0.08)",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>{title}</Box>
          </Button>
        </Badge>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
