import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

interface SelectProps {
  handleAvatarChange?: any;
  avatarSrc?: any;
  size?: number;
  readonly?: boolean;
  moreSx?: {};
}

export default function UploadAvatars(props: SelectProps) {
  const { handleAvatarChange, avatarSrc, size = 256, readonly = false, moreSx } = props;

  return (
    <ButtonBase
      component="label"
      role={undefined}
      tabIndex={-1} // prevent label from tab focus
      aria-label="Avatar image"
      sx={{
        borderRadius: '40px',
        '&:has(:focus-visible)': {
          outline: '2px solid',
          outlineOffset: '2px',
        },
      }}
    >
      <Avatar alt="Upload new avatar" src={avatarSrc} sx={{ width: size, height: size, ...moreSx }}/>
      { !readonly &&
        <input
          type="file"
          accept="image/*"
          style={{
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: '1px',
            margin: '-1px',
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            whiteSpace: 'nowrap',
            width: '1px',
          }}
          onChange={handleAvatarChange}
        />
      }
    </ButtonBase>
  );
}