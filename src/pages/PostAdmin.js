/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { request, config, formatDateForClient } from "../util/api";
import { Button, Col, Divider, Form, Image, Input, message, Modal, Popconfirm, Row, Select, Space, Spin, Table, Tag, Typography, Upload } from "antd";
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
const { Paragraph } = Typography;

function PostAdmin() {
  const [list, setList] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0, });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [ellipsis] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  // const [items, setItems] = useState(null)
  const handleChange = (info) => { setFileList(info.fileList.slice(-1)); };
  const uploadButton = (
    <div>
      <PlusOutlined /> <div style={{ marginTop: 8 }}> Upload</div>
    </div>
  );

  useEffect(() => {
    getList();
    getListCategory();
  }, [pagination.current, searchKeyword])

  const getList = () => {
    setLoading(true);
    const { current, pageSize } = pagination;
    request("get", `auth/get-all-post?keyword=${searchKeyword}&pageNumber=${current - 1}&pageSize=${pageSize}`, {}).then(res => {
      if (res.status === 200) {
        setList(res.data.list);
        console.log(res.data.list)
        setPagination({
          ...pagination,
          total: res.data.totalElements,
        });
        setLoading(false);
      }
    })
  }

  const getListCategory = () => {
    request("get", "auth/get-all-categories?keyword=&pageNumber=0&pageSize=2").then((res) => {
      if (res.status === 200) {
        setListCategory(res.data.list)
      }
    })
  }

  const handleTableChange = (pagination, filters) => {
    if (filters.search) {
      setSearchKeyword(filters.search[0]);
    }
    setPagination(pagination)
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    // setItems(null);
    setFileList([]);
  };

  const onClickDelete = (postId) => {
    request('delete', `auth/user/1/post/${postId}`, {})
      .then(res => {
        if (res.status === 200) {
          message.success('Item deleted successfully.');
          getList();
        } else {
          message.error('Failed to delete item.');
        }
      })
      .catch(error => {
        message.error('Failed to delete item.');
      });
  };

  const onFinish = (item) => {
    console.log(item)
    setLoading(true);
    setIsModalOpen(false);
    setFileList([]);
    var form = new FormData();

    form.append("title", item.title);
    form.append("content", item.content);
    form.append("categoryId", item.categoryId);
    if (fileList.length > 0) {
      form.append("file", fileList[0].originFileObj);
    }

    var method = "post";
    var url = "auth/user/4/post";
    request(method, url, form).then(res => {
      console.log(res.data)
      setLoading(false)
      if (res.status === 200) {
        setLoading(false);
        getList();
      }
    })
  };

  return (
    <div>
      <Spin spinning={loading} >
        <Space>
          <Button type="primary" onClick={showModal}>
            Create New
          </Button>

          <Input.Search
            allowClear
            placeholder="Search"
            value={searchKeyword}
            onChange={(event) => {
              setSearchKeyword(event.target.value);
              setPagination({ ...pagination, current: 1 });
            }}
          />
        </Space>

        <Divider />

        <Table
          dataSource={list}
          scroll={{
            x: 1300,
          }}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ["1", "3", "5"],
            showTotal: (total, range) => (
              <span style={{ fontSize: "14px", color: "#999" }}>
                {`Showing ${range[0]}-${range[1]} of ${total} items`}
              </span>
            ),
          }}
          onChange={handleTableChange}
          columns={[
            {
              title: "No",
              render: (item, items, index) => index + 1,
              key: "No",
              fixed: 'left',
            },
            {
              title: "Title",
              key: "title",
              dataIndex: "title",
              sorter: {
                compare: (a, b) => a.title.localeCompare(b.title),
                multiple: 5,
              },
            },
            {
              title: "Category",
              key: "category",
              render: (item) => item.categories.title || "N/A",
            },
            {
              title: "Content",
              key: "content",
              dataIndex: "content",
              render: (item, items, index) =>
                <Paragraph
                  ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: 'more' } : false}
                >
                  {item}
                </Paragraph>
            },
            {
              title: "Image",
              key: "postImage",
              dataIndex: 'postImage',
              render: (item, items, index) => {
                return (
                  <Image
                    width={80}
                    height={60}
                    style={{ borderRadius: 5, boxShadow: "10px 10px 15px -6px rgba(56,19,19,0.84)" }}
                    src={config.image_path + item}
                    alt={item}
                  />
                )
              }
            },
            {
              title: "Create By",
              key: "Create By",
              render: (item) => (
                <Tag color="cyan" style={{ fontSize: "16px" }}>
                  {item.users.name}
                </Tag>
              ),
            },
            {
              title: "Create At",
              key: "created",
              dataIndex: "created",
              sorter: {
                compare: (a, b) => a.created.localeCompare(b.created),
                multiple: 5,
              },
              render: (created) => formatDateForClient(created)
            },
            {
              title: "Update At",
              key: "updated",
              dataIndex: "updated",
              sorter: {
                compare: (a, b) => a.updated.localeCompare(b.updated),
                multiple: 5,
              },
              render: (updated) => formatDateForClient(updated)
            },
            {
              title: "Action",
              key: "Action",
              fixed: 'right',
              render: (item, items, index) => {
                return (
                  <Space>
                    <Button
                      size="small"
                    // onClick={() => onClickEdit(items)}
                    // disabled={item.users.id !== ourUsersList[0].id}
                    >
                      <EditFilled />
                    </Button>

                    <Popconfirm
                      placement="topLeft"
                      title={"Delete"}
                      description={"Are sure to romove!"}
                      onConfirm={() => onClickDelete(items.postId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        danger
                        size="small"
                      // disabled={item.users.id !== ourUsersList[0].id}
                      >
                        <DeleteFilled />
                      </Button>
                    </Popconfirm>
                  </Space>
                )
              }
            }
          ]}
        />

        <Modal
          title="Create New"
          open={isModalOpen}
          onOk={handleOk}
          footer={null}
          onCancel={() => {
            form.resetFields()
            handleCancel()
          }}
          width={650}
        >
          <Form form={form}
            onFinish={(item) => {
              form.resetFields()
              onFinish(item)
            }}
            layout="vertical"
            initialValues={{
              categoryId: listCategory.length > 0 ? listCategory[0].categoryId : null,
            }}
          >
            <Divider />
            <Form.Item label="Title Name" name={"title"}>
              <Input placeholder="Enter title name" />
            </Form.Item>

            <Form.Item label="Content Name" name={"content"}>
              <Input placeholder="Enter content name" />
            </Form.Item>

            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Form.Item label="Category" name="categoryId">
                  <Select placeholder="Select Category name" allowClear>
                    {listCategory.map((item, index) => (
                      <Select.Option key={index.categoryId} value={item.categoryId}>
                        {item.title}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Image Upload" name={"post_image"} enctype="multipart/form-data">
                  <Upload
                    action="/upload-endpoint"
                    name="file"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Form.Item style={{ textAlign: 'right' }}>
              <Space>
                <Button danger onClick={handleCancel}>
                  Cancel
                </Button>
                <Button htmlType='submit'>
                  Save
                </Button>
              </Space>
            </Form.Item>

          </Form>
        </Modal>
      </Spin>
    </div>
  )
}

export default PostAdmin;
