import PropTypes from "prop-types";
import styled from "@emotion/styled";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Bell as BellIcon } from "../icons/bell";
import { UserCircle as UserCircleIcon } from "../icons/user-circle";
import { Users as UsersIcon } from "../icons/users";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { set } from "nprogress";
import { useRef, useState } from "react";
import { logOutAccount } from "/src/services/user";
import { useRouter } from "next/router";
import { getDatabase, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

/**
 * The  navbar of most of the website's pages.
 */
export const DashboardNavbar = (props) => {
  const router = useRouter();
  const { onSidebarOpen, ...other } = props;
  const auth = getAuth();
  const [user, userLoading, userError] = useAuthState(auth);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const database = getDatabase();
  const [account, accountLoading, accountError] = useObjectVal(
    ref(database, `accounts/${user ? user.uid : "dummy"}`)
  );

  function handleShowProfileMenu(e) {
    setShowProfileMenu(!showProfileMenu);
    setProfileMenuAnchor(showProfileMenu ? e.currentTarget : null);
  }

  function handleLogOut(e) {
    logOutAccount()
      .then((res) => router.push("/login"))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <BellIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {userLoading || accountLoading ? (
            <Skeleton
              variant="circular"
              animation="pulse"
              sx={{
                height: 40,
                ml: 1,
                width: 40,
              }}
            />
          ) : (
            <IconButton onClick={handleShowProfileMenu} sx={{ p: 0 }}>
              <Avatar
                src={account ? account.image : user ? user.photoURL : ""}
                sx={{
                  height: 40,
                  ml: 1,
                  width: 40,
                }}
              />
            </IconButton>
          )}

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={profileMenuAnchor}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={showProfileMenu}
            onClose={handleShowProfileMenu}
          >
            <MenuItem onClick={handleLogOut}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
