import React, { useEffect, useState } from "react";
import axios from "axios";

const Analytics = () => {
  const [terms, setTerms] = useState([]);

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

  return (
    <ul>
      {terms.length > 0 ? (
        terms.map((term) => {
        //   console.log(term);
          return (
            <li key={term.id}>
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
    </ul>
  );
};

export default Analytics;
