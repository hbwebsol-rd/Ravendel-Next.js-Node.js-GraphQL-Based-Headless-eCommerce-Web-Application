import React from "react";
import {
  FormControl,
  RadioGroup,
  Typography,
  FormControlLabel,
  Button,
  Radio,
} from "@mui/material";
import viewStyles from "../../viewStyles.js";
import theme from "../../../theme";
import { ThemeProvider } from "@mui/material/styles";
const TaxOptionsComponents = ({
  saveOption,
  taxOptionState,
  onRadioChange,
}) => {
  const classes = viewStyles();
  return (
    <>
      <FormControl component="fieldset" className={classes.formControl}>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Prices entered with tax
        </Typography>
        <RadioGroup
          aria-label="taxOption"
          value={taxOptionState}
          onChange={(e) => onRadioChange(e.target.value)}
        >
          <FormControlLabel
            value="inclusive"
            control={<Radio color="primary" />}
            label="Yes, I will enter prices inclusive of tax"
          />
          <FormControlLabel
            value="exclusive"
            control={<Radio color="primary" />}
            label="No, I will enter prices exclusive of tax"
          />
        </RadioGroup>
      </FormControl>

      <Button
        size="small"
        color="primary"
        onClick={saveOption}
        variant="contained"
      >
        Save Changes
      </Button>
    </>
  );
};

const TaxOptionsComponent = ({ saveOption, taxOptionState, onRadioChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <TaxOptionsComponents
        saveOption={saveOption}
        taxOptionState={taxOptionState}
        onRadioChange={onRadioChange}
      />
    </ThemeProvider>
  );
};
export default TaxOptionsComponent;
