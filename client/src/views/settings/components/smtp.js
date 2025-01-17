import React, { useState } from "react";
import {
  Grid,
  Box,
  Select,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import clsx from "clsx";
import viewStyles from "../../viewStyles.js";
import { useDispatch, useSelector } from "react-redux";
import { SettingTextInput } from "./setting-components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { get } from "lodash";
import { useEffect } from "react";
import theme from "../../../theme/index.js";
import { smtpUpdateAction } from "../../../store/action/settingAction.js";
import Alerts from "../../components/Alert.js";
import Loading from "../../components/Loading.js";

const SMTPComponent = () => {
  const classes = viewStyles();
  const dispatch = useDispatch();
  const settingState = useSelector((state) => state.settings);
  const [smtp, setSmptp] = useState({});

  useEffect(() => {
    if (settingState, "settings.smtp") {
      setSmptp({ ...settingState.settings.smtp })
    }
  }, [get(settingState, "settings")])


  const updateSmtp = () => {
    dispatch(smtpUpdateAction(smtp));
  };

  return (
    <>
      <Alerts />
      {settingState.loading ? <Loading /> : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component="div">
            <SettingTextInput
              label="SMTP Server"
              value={smtp.server}
              onSettingInputChange={(val) => setSmptp({ ...smtp, server: val })}
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="SMTP Username"
              value={smtp.username}
              onSettingInputChange={(val) =>
                setSmptp({ ...smtp, username: val })
              }
            />
          </Box>
          <Box component="div">
            <SettingTextInput
              label="SMTP Password"
              value={smtp.password}
              onSettingInputChange={(val) =>
                setSmptp({ ...smtp, password: val })
              }
            />
          </Box>
          <Box component="div">
            <FormControl
              variant="outlined"
              className={clsx(classes.settingInput)}
              size="small"
            >
              <InputLabel htmlFor="smtp-port">SMTP Port</InputLabel>
              <Select
                native
                label="SMTP Port "
                inputProps={{
                  name: "smtp-port",
                  id: "smtp-port",
                }}
                value={smtp.port}
                onChange={(e) =>
                  setSmptp({ ...smtp, port: parseInt(e.target.value) })
                }
              >
                <option value={465}>465 (SSL)</option>
                <option value={587}>587 (TLS)</option>
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={updateSmtp}
          >
            Save Change
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default function SMTP() {
  return (
    <ThemeProvider theme={theme}>
      <SMTPComponent />
    </ThemeProvider>
  );
}
