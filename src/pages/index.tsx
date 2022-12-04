import TitileRowCard from '@/components/titileRowCard';
import { Avatar, PaginationProps, Table } from 'antd';
import { TablePaginationConfig } from 'antd/es/table/interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const { Column } = Table;

export default function Users() {
  return <TitileRowCard />;
}
