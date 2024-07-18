/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { request, config ,formatDateForClient} from "../util/api";
import { Avatar, Button, Popconfirm, Space, Spin, Table, Tag } from "antd";
import { DeleteFilled, EditFilled, UserOutlined } from '@ant-design/icons';

function UserAdmin() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0, });
  const [searchKeyword, setSearchKeyword] = useState("");

  
  useEffect(() => {
    getList();
  }, [pagination.current, searchKeyword])

  const getList = () => {
    setLoading(true);
    const { current, pageSize } = pagination;
    request("get", `auth/get-all-users?keyword=${searchKeyword}&pageNumber=${current - 1}&pageSize=${pageSize}`, {}).then(res => {
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
                    fixed: 'left',
                    key: "No"
                },
                {
                    title: "email",
                    key: "email",
                    dataIndex: "email",
                    width: '180px',
                },
                {
                    title: "name",
                    key: "name",
                    dataIndex: "name",

                },
                {
                    title: "role",
                    key: "role",
                    dataIndex: "role",
                },
                {
                    title: "status",
                    key: "status",
                    dataIndex: "status",
                    sorter: {
                        compare: (a, b) => a.status.localeCompare(b.status),
                        multiple: 5,
                      },
                    render: (status) => (status === "ACTIVE" ? 
                     <Tag color="green">ACTIVE</Tag> 
                    : 
                     <Tag color="red">LOCKED</Tag>
                    )
                },
                {
                    title: "Image",
                    key: "imageProfile",
                    dataIndex: 'imageProfile',
                    render: (item, items, index) => {
                        return (
                            <>
                                {item != null ?
                                    <Avatar
                                        size={50}
                                        style={{ boxShadow: "10px 10px 15px -6px rgba(56,19,19,0.84)" }}
                                        src={config.image_path + item}
                                        alt={item}
                                    />
                                    :
                                    <Avatar size={50} icon={<UserOutlined />} />
                                }
                            </>
                        )
                    }
                },
                {
                    title: "Create At",
                    key: "created",
                    dataIndex: "created",
                    width: '250px',
                    render: (created) => formatDateForClient(created),
                },
                {
                    title: "Update At",
                    key: "updated",
                    dataIndex: "updated",
                    width: '250px',
                    render: (updated) => formatDateForClient(updated),
                },
                {
                    title: "Action",
                    key: "Action",
                    fixed: 'right',
                    render: (item, items, index) => {
                        // console.log("data id" ,item.id)
                        return (
                            <Space>
                                <Popconfirm
                                    placement="topLeft"
                                    title={"Delete"}
                                    description={"Are sure to romove!"}
                                    onConfirm={() => onClickDelete(items.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button danger size="small"><DeleteFilled /></Button>
                                </Popconfirm>
                                <Button
                                    size="small"
                                    // onClick={() => onClickEdit(items)}
                                >
                                    <EditFilled />
                                </Button>
                            </Space>
                        )
                    }
                },
            ]}
            />
      </Spin>
    </div>
  )
}

export default UserAdmin;
