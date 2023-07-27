import type { AppProps } from 'next/app'

import AppWrapper from '@/components/app-wrapper'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<AppWrapper>
				<Component {...pageProps} />
			</AppWrapper>
		</>
	)
}
