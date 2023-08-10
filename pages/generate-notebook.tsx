import ImageWrapper from "@/components/image-wrapper";
import { IImageCompletion, INotebook, ITextCompletion } from "@/interfaces";
import { notBookCreator, useCreateNoteBook } from "@/services/notebooks";
import {
  imageCreator,
  textCreator,
  useFetchImageCompletion,
  useFetchTextCompletion,
} from "@/services/openai";
import { CloseCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import Image from "next/image";
import React, { useState } from "react";

function extractTitleAndContent(inputString: string) {
  const titleRegex = /Title:\s(.+?)\n/;
  const content = inputString.replace(titleRegex, ""); // Remove the title part from the content
  const titleMatch = inputString.match(titleRegex);

  const title = titleMatch ? titleMatch[1] : null;

  return { title, content };
}

const GenerateNotebook = () => {
  // const [textgeneratorPayload, setTextGeneratorPayload] =
  // 	useState<Partial<ITextCompletion> | null>(null)
  // const [imageGeneratorPayload, setImageGeneratorPayload] =
  // 	useState<Partial<ITextCompletion> | null>(null)

  // const [noteBookPayload, setNoteBookPayload] =
  // 	useState<Partial<INotebook> | null>(null)

  // const {} = useCreateNoteBook(noteBookPayload as INotebook)

  const [preview, setPreview] = useState(false);

  const [promptGeneratorForm] = Form.useForm();
  const [noteBookGeneratorForm] = Form.useForm();

  // const {
  // 	//@ts-ignore
  // 	data: textData,
  // 	//@ts-ignore
  // 	loading: textLoading,
  // 	//@ts-ignore
  // 	error: textError,
  // } = useFetchTextCompletion(textgeneratorPayload as ITextCompletion)

  // const {
  // 	//@ts-ignore
  // 	data: imageData,
  // 	//@ts-ignore
  // 	loading: imageLoading,
  // 	//@ts-ignore
  // 	error: imageError,
  // } = useFetchImageCompletion(imageGeneratorPayload as IImageCompletion)

  // console.log('textData--', textData)
  // console.log('imageData--', imageData)

  const handlePromptGeneratorForm = async (values: Record<string, string>) => {
    const textPaylod = {
      context: values.context,
      prompt: values["text-prompt"],
    };
    const imagePayload = { prompt: values["image-prompt"] };
    // setTextGeneratorPayload(textPaylod)
    // setImageGeneratorPayload(imagePayload)

    try {
      const [textResult, imageResult] = await Promise.all([
        textCreator(textPaylod),
        imageCreator(imagePayload),
      ]);
      //@ts-ignore
      const textData = textResult["data"];
      //@ts-ignore
      const imageData = imageResult["data"];

      const { title, content } = extractTitleAndContent(textData);
      const image_url = imageData[0].url;

      noteBookGeneratorForm.setFieldsValue({ title, content, image_url });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNotebookGeneratorForm = async (
    values: Record<string, string>
  ) => {
    console.log("noteBookPayload--", values);
    // setNoteBookPayload(values)
    try {
      await notBookCreator(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <Card title="Generate Notebook">
        <Row justify={"space-between"} gutter={[24, 24]} align={"stretch"}>
          <Col span={12}>
            <Form
              name="prompt-generator"
              layout={"vertical"}
              form={promptGeneratorForm}
              initialValues={{}}
              // style={{ minWidth: '100%' }}
              onFinish={handlePromptGeneratorForm}
            >
              <Form.Item name="context" label="Notebook Context">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item name="text-prompt" label="Notebook Prompt">
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item name="image-prompt" label="Notebook Image Prompt">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Space>
                <Button
                  type="primary"
                  onClick={() => promptGeneratorForm.submit()}
                >
                  Generate
                </Button>
                <Button
                  type="primary"
                  onClick={() => promptGeneratorForm.resetFields()}
                >
                  Clear
                </Button>
              </Space>
            </Form>
          </Col>
          <Col span={12}>
            <Form
              name="notebook-generator"
              layout={"vertical"}
              form={noteBookGeneratorForm}
              initialValues={{}}
              // style={{ minWidth: '100%' }}
              onFinish={handleNotebookGeneratorForm}
            >
              <Form.Item name="title" label="Notebook Title">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item name="content" label="Notebook Content">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item name="image_url" label="Notebook Image url">
                <Input
                  type="url"
                  addonAfter={
                    <Space>
                      <Button
                        type="text"
                        ghost
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => setPreview(true)}
                      >
                        Preview
                      </Button>
                      <Button
                        type="text"
                        ghost
                        icon={<CloseCircleOutlined />}
                        size="small"
                        onClick={() => {
                          noteBookGeneratorForm.resetFields(["image_url"]);
                          setPreview(false);
                        }}
                      >
                        Clear
                      </Button>
                    </Space>
                  }
                />
              </Form.Item>
              {preview ? (
                <Card>
                  <ImageWrapper
                    src={noteBookGeneratorForm.getFieldValue("image_url") || ""}
                    alt="Preview"
                  />
                </Card>
              ) : null}
              <Space>
                <Button
                  type="primary"
                  onClick={() => noteBookGeneratorForm.submit()}
                >
                  Save
                </Button>
                <Button
                  type="primary"
                  onClick={() => noteBookGeneratorForm.resetFields()}
                >
                  Clear
                </Button>
              </Space>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default GenerateNotebook;
