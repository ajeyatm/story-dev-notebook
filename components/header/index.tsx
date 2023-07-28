import { HomeOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Row, Space, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'

const Header = () => {
	const router = useRouter()
	console.log(router)

	const pathName = useCallback(() => {}, [router.pathname])

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
					<Space>
						{router.pathname === '/generate-notebook' ? (
							<Typography.Title
								level={5}
								style={{ marginRight: 40 }}
								onClick={() => router.push('/')}
								className='link'
							>
								<HomeOutlined key='home' /> Home
							</Typography.Title>
						) : (
							<Typography.Title
								level={5}
								style={{ marginRight: 40 }}
								onClick={() => router.push('/generate-notebook')}
								className='link'
							>
								<PlusOutlined key='generate-notebook-icon' /> Create
							</Typography.Title>
						)}

						<Typography.Title level={5} className='link'>
							About
						</Typography.Title>
					</Space>
				</Col>
			</Row>
		</>
	)
}

export default Header
