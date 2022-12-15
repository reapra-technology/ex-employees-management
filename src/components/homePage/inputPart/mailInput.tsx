import { getTokenFromByRefreshToken } from '@/api/tokenAuth';
import { getUserList } from '@/api/userList';
import { Box, Input } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

export default function MailInput(value: string, onChange: (value: string) => void) {
  const [isFocus, setIsFocus] = React.useState(false);
  // フィルターにかけた配列をいれるためのステート
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<string[]>([]);

  useEffect(() => {
    fetchUsers;
  }, []);

  const fetchUsers = useMemo(async () => {
    getTokenFromByRefreshToken();
    const results = await getUserList();
    setUsers(results);
  }, []);

  const handleChange = (text: string) => {
    let matches: string[] = [];
    if (text.length > 0) {
      matches = users.filter((opt) => {
        const regex = new RegExp(`${text}`, 'gi');
        return opt.match(regex);
      });
    }
    setSuggestions(matches);
    onChange(text);
  };

  return (
    <div className="w-1/3">
      <Box>
        <Input
          className="w-full"
          onFocus={() => setIsFocus(true)}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="mail address"
        />
        {isFocus ? (
          <Box className="absolute max-h-32 w-auto overflow-scroll  bg-white">
            {suggestions?.map((suggestion, i) => (
              <p
                className="w-full text-center hover:bg-slate-100"
                onClick={async () => {
                  onChange(suggestion);
                  setIsFocus(false);
                }}
              >
                {suggestion}
              </p>
            ))}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}
