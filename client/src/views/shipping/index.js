import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import viewStyles from "../viewStyles.js";
import { isEmpty } from "../../utils/helper";
import {
  globalShippingUpdateAction,
  shippingClassAddAction,
  shippingClassUpdateAction,
  shippingClassDeleteAction,
  shippingAction,
  productsAction,
} from "../../store/action/";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Loading } from "../components";
import GlobalShippingComponent from "./components/global-shipping";
import AllShippingComponent from "./components/all-shippings";
import ShippingFormComponent from "./components/shipping-form";
import theme from "../../theme/index.js";
import { ThemeProvider } from "@mui/material/styles";
import { validate } from "../components/validate";
import { ALERT_SUCCESS } from "../../store/reducers/alertReducer";
var ShippingObject = {
  name: "",
  amount: "",
};

const ShippingComponent = () => {
  const dispatch = useDispatch();
  const shippingState = useSelector((state) => state.shippings);
  const classes = viewStyles();
  const [tabVal, setTabVal] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [customShippingClass, setcustomShippingClass] =
    useState(ShippingObject);
  const [shippingGlobal, setshippingGlobal] = useState({
    is_global: false,
    shippingClass: "",
    is_per_order: true,
    overwrite: false,
  });

  useEffect(() => {
    if (isEmpty(shippingState.shipping.shippingClass)) {
      dispatch(shippingAction());
    }
  }, []);

  useEffect(() => {
    if (shippingGlobal.overwrite) {
      dispatch(productsAction());
    }
    setshippingGlobal({
      ...shippingGlobal,
      ...shippingState.shipping.global,
    });
    setEditMode(false);
    setcustomShippingClass(ShippingObject);
  }, [shippingState.shipping]);

  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const saveGlobal = () => {
    dispatch(globalShippingUpdateAction({ global: shippingGlobal }));
  };

  const addCustomShipping = () => {
    var errors = validate(["amount", "name"], customShippingClass);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {
      dispatch(shippingClassAddAction({ shippingClass: customShippingClass }));
    }


  };

  const editShipping = (shipping) => {

    setEditMode(true);
    let object = {
      _id: shipping.id,
      name: shipping.name,
      amount: shipping.amount
    }
    setcustomShippingClass(object);
  };

  const updateCustomShipping = () => {
    var errors = validate(["name", "amount"], customShippingClass);

    if (!isEmpty(errors)) {
      dispatch({
        type: ALERT_SUCCESS,
        payload: {
          boolean: false,
          message: errors,
          error: true,
        },
      });
    }
    else {

      dispatch(
        shippingClassUpdateAction({ shippingClass: customShippingClass })
      );
    }



  };

  const cancelShipping = () => {
    setEditMode(false);
    setcustomShippingClass(ShippingObject);
  };

  return (
    <div className={classes.root}>
      <Alert />
      {shippingState.loading ? <Loading /> : null}
      <Grid container spacing={4} className={classes.mainrow}>
        <Grid item md={12} sm={12} xs={12}>
          <Card>
            <CardHeader title="Shipping" />
            <Divider />
            <CardContent>
              {/* ===================================Tab Navigation=================================== */}
              <Paper square>
                <Tabs
                  value={tabVal}
                  onChange={handleChange}
                  aria-label="Shipping Tab"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Global Shipping" {...a11yProps(0)} />
                  <Tab label="Custom Shipping" {...a11yProps(1)} />
                </Tabs>
              </Paper>
              <Box className={classes.taxTabsWrapper}>
                {/* ===================================Global Shipping=================================== */}
                <TabPanel value={tabVal} index={0}>
                  <GlobalShippingComponent
                    shippingState={shippingState}
                    shippingGlobalState={shippingGlobal}
                    onGlobalShippingInputChange={(name, value) =>
                      setshippingGlobal({
                        ...shippingGlobal,
                        [name]: value,
                      })
                    }
                    saveGlobal={saveGlobal}
                  />
                </TabPanel>
                {/* ===================================Custom Shiping=================================== */}
                <TabPanel value={tabVal} index={1}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} xs={12}>
                      <AllShippingComponent
                        shippingState={shippingState}
                        editShippingForm={(shipping) => editShipping(shipping)}
                        deleteShipping={(id) => {
                          dispatch(
                            shippingClassDeleteAction({
                              _id: id,
                            })
                          );
                        }}
                      />
                    </Grid>

                    <Grid item lg={6} xs={12}>
                      <ShippingFormComponent
                        formMode={editMode}
                        onInputChange={(name, value) => {
                          setcustomShippingClass({
                            ...customShippingClass,
                            [name]: value,
                          });
                        }}
                        cancelShipping={cancelShipping}
                        updateCustomShipping={updateCustomShipping}
                        addCustomShipping={addCustomShipping}
                        customShippingClass={customShippingClass}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const Shipping = () => {
  return (
    <ThemeProvider theme={theme}>
      <ShippingComponent />
    </ThemeProvider>
  );
};
export default Shipping;
