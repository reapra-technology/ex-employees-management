// layouts/adminLayout.tsx
import { AuthorizedContext } from '@/components/contexts/tokenAuthContext';
import Unauthorized from '@/pages/login';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './adminLayout.module.css';

const { Header, Sider, Content } = Layout;

export default function LoginLayout() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();

  const { authInfo } = React.useContext(AuthorizedContext);

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: '#06262D' }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router.pathname]}
          style={{ backgroundColor: '#06262D', paddingTop: '60px' }}
        >
          <Menu.Item key="/login" icon={<UserOutlined />}>
            <Link href="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={styles.siteLayoutBackground} style={{ backgroundColor: '#06262D' }}>
          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} onClick={toggle} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} onClick={toggle} />
          )}
        </Header>
        <Content
          className={styles.siteLayoutBackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Unauthorized></Unauthorized>
        </Content>
      </Layout>
    </Layout>
  );
}
