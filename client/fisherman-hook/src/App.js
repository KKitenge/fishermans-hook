import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import SignupPage from "./components/auth/SignupPage";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/auth/LoginPage";
import ProfilePage from "./components/profile/ProfilePage";
import Messages from "./components/messages/Messages";
import Posts from "./components/posts/Posts";
import Trips from "./components/trips/Trips";
import Friends from "./components/friends/Friends";
import Forecast from "./components/forecast/Forecast";
import Logout from "./components/auth/Logout";

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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>

        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
