import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "../redux/store";
import { LoginContextProvider } from "../context/loginContextProvider";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider> {/* ✅ Required by useCookies */}
      <Provider store={store}>
        <LoginContextProvider>
          <Component {...pageProps} />
        </LoginContextProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
