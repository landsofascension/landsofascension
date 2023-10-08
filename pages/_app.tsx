import { theme } from "@/styles/theme"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import type { AppProps } from "next/app"
import type { FC } from "react"
import { ToastContainer, toast } from "react-toastify"
import { ThemeUIProvider } from "theme-ui"
import "react-toastify/dist/ReactToastify.css"

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css")

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'

  // You can also provide a custom RPC endpoint
  const endpoint = "http://localhost:8899"

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <ThemeUIProvider theme={theme}>
            <Component {...pageProps} />
            <ToastContainer
              position={toast.POSITION.TOP_CENTER}
              autoClose={1000}
            />
          </ThemeUIProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
