import { useQuery } from "@apollo/client";
import { QUERY_FORECAST } from "../../utils/queries";

// This component is used to fetch the forecast data from the API
const FetchForecast = ({ city }) => {
  // This is the query that fetches the forecast data from the API
  const { loading, error, data } = useQuery(QUERY_FORECAST, {
    // This is the variable that is passed into the query
    variables: { city },
  });

  // If the query is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // If there is an error, display an error message
  if (error) return <p>Error: {error.message}</p>;

  // This is the forecast data that is returned from the query
  const forecast = data.queryForecast;

  // This is the forecast data that is displayed on the page
  return (
    <div>
      <h2>forecast</h2>
      <p>Display forecast data here</p>;<p>City: {forecast.city}</p>
      <p>Temperature: {forecast.temperature}</p>
      <p>Conditions: {forecast.conditions}</p>
    </div>
  );
};

export default FetchForecast;
