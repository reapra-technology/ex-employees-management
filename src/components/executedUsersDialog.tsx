import { getExecutedUsersFromDB } from '@/firebase/functions';
import { useExecutedUsersActions } from '@/store/executedUsers';
import User from '@/types/user';
import { reapraPrimaryColor } from '@/utils/color';
import { Box, Dialog } from '@mui/material';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export default function ExecutedUsers(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const { executedUsers, fetchExecutedUsers } = useExecutedUsersActions();

  useEffect(() => {
    fetchExecutedUsers();
  });

  return (
    <>
      <Button
        style={{ backgroundColor: reapraPrimaryColor, color: 'white', marginLeft: '100px' }}
        onClick={() => setIsOpen(true)}
      >
        実行済ユーザーを表示
      </Button>
      <Dialog
        open={isOpen}
        scroll="body"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '80%',
              height: '100%',
              maxHeight: '80%',
              overflow: 'hidden',
            },
          },
        }}
      >
        <div className="h-2/3 w-3/4 min-w-full bg-white">
          <Box
            style={{
              textAlign: 'end',
            }}
          >
            <Button style={{ border: 'none' }} onClick={() => setIsOpen(false)}>
              <h1 className="text-xl">X</h1>
            </Button>
          </Box>
          <h1 className="mb-4 w-full items-center justify-center text-center font-bold">
            実行済ユーザー
          </h1>
          <div className="flex w-full justify-around border-b-2 p-3">
            <h1 className="w-1/3 text-center">mailAddress</h1>
            <h1 className="w-1/3 text-center">location</h1>
            <h1 className="w-1/3 text-center">createdAt</h1>
          </div>
          <ul className="overflow-scroll" style={{ height: '500px' }}>
            {executedUsers.map((user) => {
              var m = new Date(user.createdAt);
              var dateString =
                m.getUTCFullYear() +
                '/' +
                ('0' + (m.getUTCMonth() + 1)).slice(-2) +
                '/' +
                ('0' + m.getUTCDate()).slice(-2);
              return (
                <li className="flex w-full justify-around border-b-2 p-3">
                  <h1 className="w-1/3 text-center">{user.mailAddress}</h1>
                  <h1 className="w-1/3 text-center">{user.location}</h1>
                  <h1 className="w-1/3 text-center">{dateString}</h1>
                </li>
              );
            })}
          </ul>
        </div>
      </Dialog>
    </>
  );
}
