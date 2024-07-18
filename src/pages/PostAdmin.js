/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { request, config ,formatDateForClient} from "../util/api";
import { Button, Image, message, Popconfirm, Space, Spin, Table, Tag, Typography } from "antd";
import { DeleteFilled, EditFilled } from '@ant-design/icons';
const { Paragraph } = Typography;

function PostAdmin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0, });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [ellipsis] = useState(true);

  
  useEffect(() => {
    getList();
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

  const handleTableChange = (pagination, filters) => {
    if (filters.search) {
      setSearchKeyword(filters.search[0]);
    }
    setPagination(pagination)
  };


  const onClickDelete = (postId) => {
    console.log(postId)
    request('delete', `auth/delete_post/${postId}`, {})
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

  return (
    <div>
      <Spin spinning={loading} >
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
      </Spin>
    </div>
  )
}

export default PostAdmin;
