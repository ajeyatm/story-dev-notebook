import { PropsWithChildren } from 'react'
import { ConfigProvider, Divider } from 'antd'

import Header from '../header'
import styles from './index.module.css'

const AppWrapper = ({ children }: PropsWithChildren) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					// colorPrimary: '#00b96b',
				},
			}}
		>
			<div>
				<header className={`${styles.header} ${styles['component-margin']}`}>
					<Header />
				</header>
				{/* <Divider /> */}

				<main className={`${styles.content} ${styles['component-margin']}`}>
					<div>{children}</div>
				</main>
				{/* <Divider /> */}

				<footer className={`${styles.footer} ${styles['component-margin']}`}>
					Footer
				</footer>
			</div>
		</ConfigProvider>
	)
}

export default AppWrapper
