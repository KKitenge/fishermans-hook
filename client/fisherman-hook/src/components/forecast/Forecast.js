import { useQuery } from "@apollo/client";
import { QUERY_FORECAST } from "../../utils/queries";

const FetchForecast = ({ city }) => {
  const { loading, error, data } = useQuery(QUERY_FORECAST, {
    variables: { city },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const forecast = data.queryForecast;

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
