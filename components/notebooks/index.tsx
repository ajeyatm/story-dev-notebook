'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { Card, Spin, Avatar, Space, Row, Col, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, ReadOutlined } from '@ant-design/icons'
const { Meta } = Card

import { INotebook } from '@/interfaces'
import { useFetchNoteBooks } from '@/services/notebooks'
import Image from 'next/image'

const Notebooks = () => {
	const router = useRouter()

	const { data: noteBooks, isLoading, error } = useFetchNoteBooks()

	if (error) return <div>Something Went Wrong..</div>
	if (isLoading) return <Spin />

	return (
		<div style={{ margin: '40px 0' }}>
			<Row justify={'space-around'} align={'middle'} gutter={[24, 60]}>
				{noteBooks?.map((notebook: INotebook) => (
					<Col key={notebook._id} xs={2} sm={4} md={6} lg={8} xl={10}>
						<Card
							cover={
								<Image
									alt={notebook._id}
									// src={notebook.image_url}
									height={200}
									width={200}
									// src='https://loremflickr.com/320/240/kitten,dogs'
									src='https://source.unsplash.com/random/300x200?sig=${Math.random()'
								/>
							}
							actions={[
								<EditOutlined
									key='edit'
									onClick={() => router.push(`/notebooks/${notebook._id}`)}
									className='link'
								/>,
								<ReadOutlined
									key='read'
									onClick={() => router.push(`/notebooks/${notebook._id}`)}
									className='link'
								/>,
								<DeleteOutlined key='delete' className='link' />,
							]}
						>
							<Meta
								avatar={
									<Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel' />
								}
								title={
									<Link href={`/notebooks/${notebook._id}`}>
										{notebook.title}
									</Link>
								}
								description={
									<Typography.Paragraph
									// ellipsis={{ expandable: false, rows: 4 }}
									>
										{notebook.content}
									</Typography.Paragraph>
								}
							/>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	)
}

export default Notebooks
