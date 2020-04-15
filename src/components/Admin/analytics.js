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
    fontSize: "13px",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
}));

const Analytics = () => {
  const [terms, setTerms] = useState([]);
  const [reports, setReports] = useState([]);
  const [places, setPlaces] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchTermData() {
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

    async function fetchReportsData() {
      // You can await here
      const requestBody = {
        query: `
        {
          reports{
            id
            itemName
            status
            googleId
            dateTime
          }
        }
            `,
      };

      const { data } = await axios.post(
        "https://tp-report-backend.herokuapp.com/graphql",
        requestBody
      );
      console.log(data);
      setReports(data.data.reports); // ...
    }

    async function fetchPlacesData() {
      // You can await here
      const requestBody = {
        query: `
        {
          places{
            name
            googleId
            reports{
              status
              dateTime
            }
          }
        }
            `,
      };

      const { data } = await axios.post(
        "https://tp-report-backend.herokuapp.com/graphql",
        requestBody
      );
      console.log(data);
      setPlaces(data.data.places); // ...
    }

    fetchTermData();
    fetchReportsData();
    fetchPlacesData();
  }, []);

  //   console.log(terms);

  const sortedTerms = terms.sort(function compare(a, b) {
    var dateA = new Date(a.dateTime);
    var dateB = new Date(b.dateTime);
    return dateB - dateA;
  });
  const sortedReports = reports.sort(function compare(a, b) {
    var dateA = new Date(a.dateTime);
    var dateB = new Date(b.dateTime);
    return dateB - dateA;
  });
  const sortedPlaces = places.sort(function compare(a, b) {
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
                sortedTerms.map((term) => {
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
          <Paper className={classes.paper}>
            <List className={classes.root2} subheader={<li />}>
              {reports.length > 0 ? (
                sortedReports.map((report) => {
                  // console.log(report);
                  return (
                    <li key={report.id} className={classes.listSection}>
                      {report.status} | googleId: {report.googleId} |
                      {new Date(report.dateTime).toLocaleString("en-DE", {
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
          <Paper className={classes.paper}>Places</Paper>
          <Paper className={classes.paper}>
            <List className={classes.root2} subheader={<li />}>
              {places.length > 0 ? (
                places.map((place) => {
                  console.log(place);
                  return (
                    <li key={place.googleId} className={classes.listSection}>
                      {place.name} | googleId: {place.googleId}
                      
                    </li>
                  );
                })
              ) : (
                <li>no terms</li>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Analytics;
