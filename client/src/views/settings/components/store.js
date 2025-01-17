import React, { useState } from "react";
import { Grid, Box, Paper, Tab, Tabs } from "@mui/material";
import Inventory from "./inventory";
import Measurements from "./measurements";
import StoreAddress from "./storeAddress";
import CurrencyOptions from "./currencyOption";
import { ThemeProvider } from "@mui/material/styles";
import { TabPanel, TabProps } from "../../components";
import theme from "../../../theme/index.js";
import Alerts from "../../components/Alert";
import OrderOption from "./orderOption";

const StoreComponent = () => {
  const [tabVal, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Alerts />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper square>
            <Tabs
              value={tabVal}
              onChange={handleChange}
              aria-label="Shipping Tab"
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
            >
              <Tab label="Currency options" {...TabProps(0)} />
              <Tab label="Store Address" {...TabProps(1)} />
              <Tab label="Measurements" {...TabProps(2)} />
              <Tab label="Inventory" {...TabProps(3)} />
              <Tab label="Order Option" {...TabProps(4)} />
            </Tabs>
          </Paper>
          <Box>
            <TabPanel value={tabVal} index={0}>
              <Box mt={2}>
                <CurrencyOptions />
              </Box>
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
              <Box mt={2}>
                <StoreAddress />
              </Box>
            </TabPanel>
            <TabPanel value={tabVal} index={2}>
              <Box mt={2}>
                <Measurements />
              </Box>
            </TabPanel>
            <TabPanel value={tabVal} index={3}>
              <Box mt={2}>
                <Inventory />
              </Box>
            </TabPanel>
            <TabPanel value={tabVal} index={4}>
              <Box mt={2}>
                <OrderOption />
              </Box>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default function Store() {
  return (
    <ThemeProvider theme={theme}>
      <StoreComponent />
    </ThemeProvider>
  );
}
