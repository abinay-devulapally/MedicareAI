import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import StepForm from "./StepForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    backgroundColor: "#1976d2",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  contentWrapper: {
    marginTop: theme.spacing(4),
  },
  header: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
    fontWeight: 700,
  },
  subHeader: {
    textAlign: "center",
    marginBottom: theme.spacing(4),
    color: "#616161",
  },
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">Mental Health Assessment</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.contentWrapper}>
        <Typography variant="h4" className={classes.header}>
          Are You Experiencing Mental Health Challenges?
        </Typography>
        <Typography variant="body1" className={classes.subHeader}>
          Please answer the following questions to better understand your mental
          health.
        </Typography>
        <Paper className={classes.paper}>
          <StepForm />
        </Paper>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="caption" align="center" display="block">
          Your responses are confidential and will help us provide better
          resources.
        </Typography>
      </Container>
    </>
  );
};

App.propTypes = {
  classes: PropTypes.object,
};

export default App;
