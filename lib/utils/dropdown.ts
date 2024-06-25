import { BookIcon, LogOut, Settings, User as UserIcon } from "lucide-react";
import { User } from "../providers/auth";

interface DropdownItem {
  name: string;
  link: string;
  icon: any;
}

export const getDropDownItems = (user: User) => {
  const common: DropdownItem[] = [
    {
      name: "Profile",
      icon: UserIcon,
      link: `/profile/${user.id}`,
    },

    {
      name: "Settings",
      icon: Settings,
      link: "/settings",
    },
  ];

  if (user.type === "gharpeti") {
    common.splice(1, 0, {
      name: "Applications",
      icon: BookIcon,
      link: "owner/applications",
    });
  } else {
    common.splice(1, 0, {
      name: "My Applications",
      icon: BookIcon,
      link: "profile/applications",
    });
  }

  return common;
};
