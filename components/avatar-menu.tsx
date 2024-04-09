"use client";

import { TbLogout2 } from "react-icons/tb";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import UserProfile from "./user-profile";
import useAuthHandlers from "@/hooks/useAuthHandlers";

export default function AvatarMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { signoutHandler } = useAuthHandlers();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <Button
        id="avatar-button"
        aria-controls={open ? "avatar-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        <UserProfile />
      </Button>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          "aria-labelledby": "avatar-button",
        }}
      >
        <MenuItem onClick={signoutHandler}>
          <div className="flex items-center space-x-2">
            <TbLogout2 size={24} /> <span>Logout</span>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
