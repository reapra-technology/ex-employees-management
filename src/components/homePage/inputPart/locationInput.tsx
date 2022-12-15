import { MenuItem, Select } from '@mui/material';
import React, { ReactElement, useState } from 'react';

export function LocationInput(
  value: string,
  onChange: (value: string) => void,
): ReactElement | null {
  const items = ['JP', 'SG', 'VN'];

  return (
    <Select
      className="h-10 w-28"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      placeholder="location"
      variant="outlined"
      MenuProps={{
        anchorOrigin: { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      }}
    >
      {items.map((item) => {
        return (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        );
      })}
    </Select>
  );
}
