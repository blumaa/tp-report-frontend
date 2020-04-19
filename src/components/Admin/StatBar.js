import React, { useState, useEffect, useCallback } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useDispatch } from "redux-react-hook";
import * as actions from "../../constants/action_types";
import { useMappedState } from "redux-react-hook";

const CountReportsByDay = ({ reports }) => {
  let todaysReports = 0;
  const date = new Date().toISOString();

  function isoStringToDate(s) {
    var b = s.split(/\D/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3] || 0, b[4] || 0, b[5] || 0, b[6] || 0)
    );
  }

  const newDate = isoStringToDate(date);

  const currDay = newDate.getDate();
  const currMonth = newDate.getMonth();

  if (reports) {
    reports.forEach((report) => {
      // console.log(report)
      const convert = isoStringToDate(report.dateTime);
      const day = convert.getDate();
      const month = convert.getMonth();
      // console.log(day, month)
      if (currMonth === month && currDay === day) {
        todaysReports += 1;
      }
    });
  }
  const num = todaysReports;

  return <div>{num}</div>;
};

const CountReportsByYesterday = ({ reports }) => {
  // console.log(reports);
  let todaysReports = 0;
  const date = new Date().toISOString();

  function isoStringToDate(s) {
    var b = s.split(/\D/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3] || 0, b[4] || 0, b[5] || 0, b[6] || 0)
    );
  }

  const newDate = isoStringToDate(date);

  const currDay = newDate.getDate() - 1;
  const currMonth = newDate.getMonth();

  // console.log('curr month day', currDay, currMonth)
  if (reports) {
    reports.forEach((report) => {
      // console.log(report)
      const convert = isoStringToDate(report.dateTime);
      const day = convert.getDate();
      const month = convert.getMonth();
      // console.log(day, month)
      if (currMonth === month && currDay === day) {
        todaysReports += 1;
      }
    });
  }
  let num = todaysReports;

  return <div>{num}</div>;
};

const CountSearchesByDay = ({ searches }) => {
  //   console.log(searches);
  let todaysSearches = 0;
  const date = new Date().toISOString();

  function isoStringToDate(s) {
    var b = s.split(/\D/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3] || 0, b[4] || 0, b[5] || 0, b[6] || 0)
    );
  }

  const newDate = isoStringToDate(date);

  const currDay = newDate.getDate();
  const currMonth = newDate.getMonth();

  //   console.log("curr month day", currDay, currMonth);
  if (searches) {
    searches.forEach((search) => {
      // console.log(search);
      if (search.dateTime) {
        const convert = isoStringToDate(search.dateTime);
        const day = convert.getDate();
        const month = convert.getMonth();
        //   console.log(day, month);
        if (currMonth === month && currDay === day) {
          todaysSearches += 1;
        }
      }
    });
  }
  const num = todaysSearches;

  return <div>{num}</div>;
};

const CountSearchesByYesterday = ({ searches }) => {
  //   console.log(searches);
  // all of these should be changed to use a mapped state from redux store
  let todaysSearches = 0;
  const date = new Date().toISOString();

  function isoStringToDate(s) {
    var b = s.split(/\D/);
    return new Date(
      Date.UTC(b[0], --b[1], b[2], b[3] || 0, b[4] || 0, b[5] || 0, b[6] || 0)
    );
  }

  const newDate = isoStringToDate(date);

  const currDay = newDate.getDate() - 1;
  const currMonth = newDate.getMonth();

  //   console.log("curr month day", currDay, currMonth);
  if (searches) {
    searches.forEach((search) => {
      // console.log(search);
      if (search.dateTime) {
        const convert = isoStringToDate(search.dateTime);
        const day = convert.getDate();
        const month = convert.getMonth();
        //   console.log(day, month);
        if (currMonth === month && currDay === day) {
          todaysSearches += 1;
        }
      }
    });
  }
  const num = todaysSearches;

  return <div>{num}</div>;
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {},
});

const StatBar = () => {
  const [terms, setTerms] = useState([]);
  const [reports, setReports] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const mapState = useCallback((state) => {
    return {
      storeTerms: state.analyticsState.terms,
      storeReports: state.analyticsState.reports,
    };
  }, []);

  const { storeTerms, storeReports } = useMappedState(mapState);

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
      // setTerms(data.data.searchterms); // ...
      const terms = data.data.searchterms;
      dispatch({ type: actions.SET_TERMS, terms });
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
      // console.log(data);
      // setReports(data.data.reports); // ...
      const reports = data.data.reports;
      dispatch({ type: actions.SET_REPORTS, reports });
      // all of these need to be changed to dispatch actions
    }

    fetchTermData();
    fetchReportsData();
  }, []);
  return (
    <TableContainer
      component={Paper}
      elevation={3}
    >
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ color: "rgb(121, 121, 121)" }}>
              Stats
            </StyledTableCell>
            <StyledTableCell>Searches</StyledTableCell>
            <StyledTableCell>Reports</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Today</StyledTableCell>
            <StyledTableCell>
              <CountSearchesByDay searches={storeTerms} />
            </StyledTableCell>
            <StyledTableCell>
              {" "}
              <CountReportsByYesterday reports={storeReports} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Yesterday</StyledTableCell>
            <StyledTableCell>
              {" "}
              <CountSearchesByYesterday searches={storeTerms} />
            </StyledTableCell>
            <StyledTableCell>
              <CountReportsByDay reports={storeReports} />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatBar;
