import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  ListItem,
  List,
  Collapse,
  colors,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import theme from "../theme/index";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import menuItems from "../routes/nav";
import palette from "../theme/palette";
import clsx from "clsx";
import { client_app_route_url } from "../utils/helper";

import { ThemeProvider } from "@mui/material";

const MenuBarComponenet = ({onClose}) => {
  const classes = useStyles();
  const [menuName, setMenuName] = useState("");
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });
  const handleClick = (name) => {
   
    if (name === menuName) {
      setMenuName("");
    } else {
      setMenuName(name);
    }
   
  };
  const handleMenuClose = () => {
    if(!isDesktop){
      onClose()
    }
  };

  const menuListing = (menus) => {
    return menus.map((menu) => {
      if (!menu.children) {
        return (
          <Link to={`${client_app_route_url + menu.url}`} state={{editMode: false}} key={menu.name}>
            <ListItem className={classes.item} disableGutters>
              <Button
                className={classes.button}
                style={{ color: palette.text.secondary, fontSize: "10px" }}
              >
                <ListItemIcon className={classes.icons}>
                  {menu.icon && <menu.icon />}
                </ListItemIcon>
                <ListItemText
                onClick={handleMenuClose}
                  className={classes.itemtext}
                  primary={menu.name}
                  style={{ color: palette.text.secondary, fontSize: "10px" }}
                />
              </Button>
            </ListItem>
          </Link>
        );
      }
      return (
        <div key={menu.name}>
          <ListItem
            onClick={() => handleClick(menu.name)}
            className={classes.item}
            disableGutters
          >
            <Button className={classes.button}>
              <ListItemIcon className={classes.icons}>
                {menu.icon && <menu.icon fontSize="small" />}
              </ListItemIcon>
              <ListItemText className={classes.itemtext} primary={menu.name} />
              {menuName === menu.name ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </Button>
          </ListItem>
          <Collapse
            in={menuName === menu.name ? true : false}
            timeout="auto"
            unmountOnExit
            className={clsx(classes.collapse, "menu-collapse")}
            style={{ fontSize: "10px" }}
          >
            {menuListing(menu.children)}
          </Collapse>
        </div>
      );
    });
  };

  return <List component="nav">{menuListing(menuItems)}</List>;
};

const useStyles = makeStyles((theme) => ({
  item: {
    "&&": {
      display: "flex",
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  button: {
    "&&": {
      color: colors.blueGrey[800],
      justifyContent: "flex-start",
      textTransform: "none",
      letterSpacing: 0,
      width: "100%",
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  icons: {
    "&&": {
      minWidth: "30px !important",
    },
  },
  itemtext: {
    "&&": {
      textAlign: "left !important",
    },
  },
  collapse: {
    "&&": {
      backgroundColor: "#f5f5f5",
      fontSize: "10px",
      paddingLeft: 15,
    },
  },
}));

export default function MenuBar({onClose}) {
  return (
    <ThemeProvider theme={theme}>
      <MenuBarComponenet onClose={onClose}/>
    </ThemeProvider>
  );
}
