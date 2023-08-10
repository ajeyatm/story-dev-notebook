import ImageWrapper from "@/components/image-wrapper";
import { getImageDataURL } from "@/lib/image-helpers";
import { useFetchNoteBookById } from "@/services/notebooks";
import { Col, Row, Spin, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Notebook = () => {
  const router = useRouter();
  const { notebookId } = router.query;

  const {
    data: noteBook,
    isLoading,
    error,
  } = useFetchNoteBookById(notebookId as string);

  if (error) return <div>Something Went Wrong..</div>;
  if (isLoading) return <Spin />;


  return (
    <div>
      {noteBook ? (
        <Row style={{marginTop:40}} gutter={[24,24]}>
          <Col span={12}>
          <ImageWrapper
          alt={noteBook._id}
          
          src={
            getImageDataURL(noteBook.imageId.data) ??
            "https://source.unsplash.com/random/300x200?sig=${Math.random()"
          }
          banner
        />
          </Col>
          <Col span={12}>
          <Typography.Title>{noteBook.title}</Typography.Title>
          <Typography.Paragraph>{noteBook.content}</Typography.Paragraph>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Notebook;
