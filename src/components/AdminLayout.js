/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  SmileOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SmileTwoTone,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const navigate = useNavigate();

  const handleClickMenu = (items) => {
    navigate(items.key);
  };

  const menuSiderBar = [
    {
      key: "/dashboard",
      icon: <UserOutlined />,
      label: "User Admin",
      children: [
        {
          key: '/dashboard/profile',
          icon: <SmileTwoTone spin />,
          label: 'Profile',
        },
      ],
    },
    {
      key: "/dashboard/post",
      icon: <UploadOutlined />,
      label: "Post",
    },
  ];

  const items = [
    {
      key: '1',
      label: (
        <a>
          Logout
        </a>
      ),
      icon: <LogoutOutlined />
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
    }
  ];

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h3 style={{ display: "flex", justifyContent: "center", color: "white" }}>FoodDaily Co.ltd</h3>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuSiderBar}
          onClick={handleClickMenu}
        />
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "50px" }} >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px',width: 100 ,height: 100,}}
          />
          <h3>Dashboard</h3>
          <Dropdown menu={{ items }} placement="bottom" arrow>
            <a onClick={e => e.preventDefault()}>
              <SmileOutlined style={{ fontSize: '24px' }} />
            </a>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: '16px 0',
            padding: 15,
            height: "calc(125vh - 60px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;


// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState} from 'react';
// import {
//   MenuFoldOutlined,
//   SmileOutlined,
//   LogoutOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   SmileTwoTone,
// } from '@ant-design/icons';
// import { Layout, Menu, Button, theme, Dropdown } from 'antd';
// import { Outlet, useNavigate } from "react-router-dom";

// const { Header, Sider, Content } = Layout;

// const AdminLayout = () => {

//   const [collapsed, setCollapsed] = useState(false);
//   const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
//   const navigate = useNavigate()

//   const handleClickMenu = (items) => {
//     navigate(items.key)
//   }

//   const menuSiderBar = [
//     {
//       key: "/dashboard",
//       icon: <UserOutlined />,
//       label: "User Admin",
//       children: [
//         {
//           key: '/dashboard/profile',
//           icon: <SmileTwoTone spin/>,
//           label: 'Profile',
//         },
//       ],
//     },
//     {
//       key: "/dashboard/post",
//       icon: <UploadOutlined />,
//       label: "Post",
//     },
//   ]

//   const items = [
//     {
//       key: '1',
//       label: (
//         <a >
//           Logout
//         </a>
//       ),
//       icon: <LogoutOutlined />
//     },
//     {
//       key: '2',
//       label: (
//         <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
//           2nd menu item (disabled)
//         </a>
//       ),
//       icon: <SmileOutlined />,
//     }
//   ];

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed}>
//         <h3 style={{ display: "flex", justifyContent: "center", color: "white" }}>FoodDaily Co.ltd</h3>
//         <Menu
//           theme="dark"
//           mode="inline"
//           defaultSelectedKeys={['1']}
//           items={menuSiderBar}
//           onClick={handleClickMenu}
//         />
//       </Sider>

//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer, display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: "50px" }} >
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 100,
//               height: 100,
//             }}
//           />
//           <h3>Dashboard</h3>
//           <Dropdown menu={{ items }} placement="bottom" arrow>
    
//           </Dropdown>
//         </Header>

//         <Content
//           style={{
//             margin: '16px 0',
//             padding: 15,
//             height: "calc(125vh - 60px)",
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>

//     </Layout>
//   );
// };
// export default AdminLayout;


// import React from 'react'

// const AdminLayout = () => {
//   return (
//     <div>
//       <h1>AdminLayout</h1>
//     </div>
//   )
// }

// export default AdminLayout
