import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [react(), ssr({ includeAssetsImportedByServer: true })],
  build: {
    ssrManifest: true
  }
}

export default config
