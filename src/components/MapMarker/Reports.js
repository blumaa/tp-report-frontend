import React, { useState } from "react";

import { red, green } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


const renderReports = (data) => {
  // console.log(data);

  const sortedReports = data.sort(function compare(a, b) {
    var dateA = new Date(a.dateTime);
    var dateB = new Date(b.dateTime);
    return dateB - dateA;
  });
  
    return sortedReports.map((report) => {
      console.log(report);
      // 2020-04-10T15:12:51.334Z
      // let time = report.dateTime.toLocaleString(); 
      // let time = new Date(report.dateTime).toLocaleString("en-DE", {timeZone: "Europe/Berlin"})

      let datestr = report.dateTime.split(/[-T.]/);
      var safdat = new Date( datestr.slice(0,3).join('/')+' '+datestr[3] );
      console.log(safdat)

      let dateString = report.dateTime.replace(/-/g, '/').replace('T', ' ');
      
      let time = new Date(dateString).toLocaleString();
      // let time = new Date(dateString).toLocaleString("en-DE", {timeZone: "Europe/Berlin"});
      // console.log(time)
      let usaTime = new Date(safdat).toLocaleString("en-US", {timeZone: "America/New_York"});
      // usaTime = new Date(usaTime).toLocaleString();
      console.log('USA time: '+usaTime)
      
      let berlinTime = new Date(safdat).toLocaleString("en-DE", {timeZone: "Europe/Berlin"});
      // berlinTime = new Date(berlinTime).toLocaleString();
      console.log('Berlin time: '+berlinTime)


      return report.status === "inStock" ? (
        <ListItem key={report.id}>
          <ListItemIcon>
            <ShoppingCartIcon style={{ color: green[500] }} />
          </ListItemIcon>
          <ListItemText>In stock | Reported: {time}</ListItemText>
          {/* <ListItemText>In stock | Reported: {time}</ListItemText> */}
        </ListItem>
      ) : (
        <ListItem key={report.id}>
          <ListItemIcon>
            <RemoveShoppingCartIcon style={{ color: red[500] }} />
          </ListItemIcon>
          <ListItemText>Out of stock | Reported: {time}</ListItemText>
          {/* <ListItemText>Out of stock | Reported: {time}</ListItemText> */}
        </ListItem>
      );
    });
    // console.log(ports)
};

const Reports = ({ marker }) => {
  const [dense] = useState(false);

  // const GET_REPORTS = gql`
  //   {
  //     place(googleId: "${marker.id}") {
  //       name
  //       googleId
  //       reports {
  //         id
  //         itemName
  //         googleId
  //         status
  //         dateTime
  //       }
  //     }
  //   }
  // `;
  
  // const { loading, error, data } = useQuery(GET_REPORTS);

  // console.log('this b the mark', marker);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>Error...</p>;
  // console.log("reports", data);
  return (
    <List dense={dense}>
      {marker && marker.reports && marker.reports.length > 0 ? (
        renderReports(marker.reports)
      ) : (
        <ListItem>no reports yet </ListItem>
      )}{" "}
    </List>
  );
};

export default Reports;