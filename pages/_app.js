import '../styles/globals.css'
import {Toaster} from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return(
      <>
          <Toaster
              position="bottom-center"
              reverseOrder={false}
          />
        <Component {...pageProps} />
  </>)
}
