import React, {useState, useEffect} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey.A700,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
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
  table: {
    minWidth: 100,
    maxWidth: 400,
    borderRadius: 10,
  },
});

const CountReportsByDay = ({ reports }) => {
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

  const currDay = newDate.getDay();
  const currMonth = newDate.getMonth();

  // console.log('curr month day', currDay, currMonth)
  reports.forEach((report) => {
    // console.log(report)
    const convert = isoStringToDate(report.dateTime);
    const day = convert.getDay();
    const month = convert.getMonth();
    // console.log(day, month)
    if (currMonth === month && currDay === day) {
      todaysReports += 1;
    }
  });
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

  const currDay = newDate.getDay() - 1;
  const currMonth = newDate.getMonth();

  // console.log('curr month day', currDay, currMonth)
  reports.forEach((report) => {
    // console.log(report)
    const convert = isoStringToDate(report.dateTime);
    const day = convert.getDay();
    const month = convert.getMonth();
    // console.log(day, month)
    if (currMonth === month && currDay === day) {
      todaysReports += 1;
    }
  });
  const num = todaysReports;

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

  const currDay = newDate.getDay();
  const currMonth = newDate.getMonth();

  //   console.log("curr month day", currDay, currMonth);
  searches.forEach((search) => {
    // console.log(search);
    if (search.dateTime) {
      const convert = isoStringToDate(search.dateTime);
      const day = convert.getDay();
      const month = convert.getMonth();
      //   console.log(day, month);
      if (currMonth === month && currDay === day) {
        todaysSearches += 1;
      }
    }
  });
  const num = todaysSearches;

  return <div>{num}</div>;
};

const CountSearchesByYesterday = ({ searches }) => {
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

  const currDay = newDate.getDay() - 1;
  const currMonth = newDate.getMonth();

  //   console.log("curr month day", currDay, currMonth);
  searches.forEach((search) => {
    // console.log(search);
    if (search.dateTime) {
      const convert = isoStringToDate(search.dateTime);
      const day = convert.getDay();
      const month = convert.getMonth();
      //   console.log(day, month);
      if (currMonth === month && currDay === day) {
        todaysSearches += 1;
      }
    }
  });
  const num = todaysSearches;

  return <div>{num}</div>;
};

const StatBar = () => {
  const [terms, setTerms] = useState([]);
  const [reports, setReports] = useState([]);
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
      // console.log(data);
      setReports(data.data.reports); // ...
    }


    fetchTermData();
    fetchReportsData();
  }, []);
  return (
    <Paper
      elevation={1}
      style={{ borderRadius: 10, marginBottom: 10, border: "5px solid grey" }}
    >
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>Today</StyledTableCell>
            <StyledTableCell>Yesterday</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Searches</StyledTableCell>
            <StyledTableCell>
              <CountSearchesByDay searches={terms} />
            </StyledTableCell>
            <StyledTableCell>
              <CountSearchesByYesterday searches={terms} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Reports</StyledTableCell>
            <StyledTableCell>
              <CountReportsByDay reports={reports} />
            </StyledTableCell>
            <StyledTableCell>
              <CountReportsByYesterday reports={reports} />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StatBar;
