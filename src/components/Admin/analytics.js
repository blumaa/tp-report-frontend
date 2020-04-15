import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.primary,
  },
  root2: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 500,
  },
  listSection: {
    backgroundColor: "inherit",
    fontSize: "13px"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const Analytics = () => {
  const [terms, setTerms] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const requestBody = {
        query: `
            {
                searchterms{
                  id
                  term
                  dateTime
                }
              }
            `,
      };

      const { data } = await axios.post(
        "https://tp-report-backend.herokuapp.com/graphql",
        requestBody
      );

      setTerms(data.data.searchterms); // ...
    }
    fetchData();
  }, []);

  //   console.log(terms);

  const sortedReports = terms.sort(function compare(a, b) {
    var dateA = new Date(a.dateTime);
    var dateB = new Date(b.dateTime);
    return dateB - dateA;
  });

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Grid item xs={4}>
          <Paper className={classes.paper}>Search Terms</Paper>
          <Paper className={classes.paper}>
            <List className={classes.root2} subheader={<li />}>
              {terms.length > 0 ? (
                sortedReports.map((term) => {
                  //   console.log(term);
                  return (
                    <li key={term.id} className={classes.listSection}>
                      {term.term} |{" "}
                      {new Date(term.dateTime).toLocaleString("en-DE", {
                        timeZone: "Europe/Berlin",
                      })}
                    </li>
                  );
                })
              ) : (
                <li>no terms</li>
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>Reports</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>Places</Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
