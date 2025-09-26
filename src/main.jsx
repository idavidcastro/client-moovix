import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://server-moovix.onrender.com" }),
  cache: new InMemoryCache(),
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
