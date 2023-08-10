"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Spin, Avatar, Space, Row, Col, Typography, Alert } from "antd";
import { DeleteOutlined, EditOutlined, ReadOutlined } from "@ant-design/icons";
import Image from "next/image";
const { Meta } = Card;

import { INotebook } from "@/interfaces";
import { useDeleteNoteBook, useFetchNoteBooks } from "@/services/notebooks";
import { getImageDataURL } from "@/lib/image-helpers";

import ImageWrapper from "../image-wrapper";

const Notebooks = () => {
  const router = useRouter();

  const [noteBookToBeDeleted, setNoteBookToBeDeleted] = useState<string | null>(
    null
  );

  const { data: noteBooks, isLoading, error } = useFetchNoteBooks();

  const {
    //@ts-ignore
    data: deleteData,
     //@ts-ignore
    isLoading: deleteLoading,
     //@ts-ignore
    error: deleteError,
  } = useDeleteNoteBook(noteBookToBeDeleted);

  if (error) return <div>Something Went Wrong..</div>;
  if (isLoading) return <Spin />;

  return (
    <div style={{ margin: "40px 0" }}>
      {deleteError && !deleteLoading  ? (
        <Alert message="Error deleteing notebook" type="error" closable />
      ) : null}
      {deleteData && !deleteLoading  ? (
        <Alert message="Error deleteing notebook" type="error" closable />
      ) : null}
      <Row justify={"space-around"} align={"middle"} gutter={[24, 60]}>
        {noteBooks?.map((notebook: INotebook) => (
          <Col key={notebook._id} xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              cover={
                <ImageWrapper
                  alt={notebook._id}
                  src={
                    getImageDataURL(notebook.imageId?.data) ??
                    "https://source.unsplash.com/random/300x200?sig=${Math.random()"
                  }
                />
              }
              actions={[
                <EditOutlined
                  key="edit"
                  onClick={() => router.push(`/notebooks/${notebook._id}`)}
                  className="link"
                />,
                <ReadOutlined
                  key="read"
                  onClick={() => router.push(`/notebooks/${notebook._id}`)}
                  className="link"
                />,
                <DeleteOutlined
                  key="delete"
                  className="link"
                  onClick={() => setNoteBookToBeDeleted(notebook._id)}
                />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
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
  );
};

export default Notebooks;
