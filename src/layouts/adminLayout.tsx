// layouts/adminLayout.tsx
import { AuthorizedContext } from '@/components/contexts/tokenAuthContext';
import LoginLayout from '@/layouts/loginLayout';
import { useRunningOptionActions } from '@/store/runningOption';
import { useSettingActions } from '@/store/setting';
import { useUsersActions } from '@/store/users';
import { RunningOption } from '@/types/runningOption';
import { reapraMainColor } from '@/utils/color';
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
  const { setOption } = useRunningOptionActions();
  const { fetchSetting } = useSettingActions();
  const { fetchUsers } = useUsersActions();

  const { authInfo } = React.useContext(AuthorizedContext);

  function toggle() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    if (process.browser) {
      const item = window.localStorage.getItem('runningOption');
      if (item !== null) {
        const option = JSON.parse(item) as RunningOption;
        setOption(option);
      }
    }
    fetchSetting();
    fetchUsers();
  }, []);

  if (authInfo === undefined) {
    return <LoginLayout></LoginLayout>;
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: reapraMainColor }}
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
          style={{ backgroundColor: reapraMainColor }}
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
        <Header
          className={styles.siteLayoutBackground}
          style={{ backgroundColor: reapraMainColor }}
        >
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
