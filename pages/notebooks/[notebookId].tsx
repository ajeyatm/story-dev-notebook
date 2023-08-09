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

  console.log(noteBook);

  return (
    <div>
      {noteBook ? (
        <Row style={{marginTop:40}} gutter={[24,24]}>
          <Col>
          <Image
          alt={noteBook._id}
          // src={notebook.image_url}
          height={400}
          width={400}
          // src='https://loremflickr.com/320/240/kitten,dogs'
          // src='https://source.unsplash.com/random/300x200?sig=${Math.random()'
          src={
            getImageDataURL(noteBook.imageId.data) ??
            "https://source.unsplash.com/random/300x200?sig=${Math.random()"
          }
          
        />
          </Col>
          <Col>
          <Typography.Title>{noteBook.title}</Typography.Title>
          <Typography.Paragraph>{noteBook.content}</Typography.Paragraph>
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Notebook;
