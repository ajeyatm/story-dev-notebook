import { Col, Row, Space, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

const Header = () => {
	return (
		<>
			<Row justify={'space-between'} align={'middle'}>
				<Col>
					<Space>
						<Image src={'/logo.png'} alt='sdn' width={300} height={64} />
						{/* <Typography.Title level={3}>story-dev-notebook</Typography.Title> */}
					</Space>
				</Col>
				<Col>
					<Typography.Title level={5}>About</Typography.Title>
				</Col>
			</Row>
		</>
	)
}

export default Header
