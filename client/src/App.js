import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/auth/Signup";
import LandingPage from "./components/auth/LandingPage";
import Login from "./components/auth/Login.js";
import ProfilePage from "./components/profile/ProfilePage.js";
import Messages from "./components/messages/Messages.js";
import Posts from "./components/posts/Posts.js";
import Trips from "./components/trips/Trips.js";
import Friends from "./components/friends/Friends.js";
import Forecast from "./components/forecast/Forecast.js";
import Logout from "./components/home/Logout.js";
// import Homepage from "./components/home/Homepage.js";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="/homepage" element={<Homepage />} /> */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
