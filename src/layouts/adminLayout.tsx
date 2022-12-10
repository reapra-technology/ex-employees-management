// layouts/adminLayout.tsx
import { AuthorizedContext } from '@/components/contexts/tokenAuthContext';
import LoginLayout from '@/layouts/loginLayout';
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

export default function AdminLayout({ children }: { readonly children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();

  const { authInfo } = React.useContext(AuthorizedContext);

  function toggle() {
    setCollapsed(!collapsed);
  }

  if (authInfo === undefined) {
    return <LoginLayout></LoginLayout>;
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: '#06262D' }}
      >
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/reapra-logo.png" width={100} height={40} alt="Reapra" />
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[router.pathname]}
          style={{ backgroundColor: '#06262D' }}
        >
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/setting" icon={<SettingOutlined />}>
            <Link href="/setting">Setting</Link>
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
