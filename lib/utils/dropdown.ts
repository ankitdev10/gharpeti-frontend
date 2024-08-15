import {
  BookIcon,
  BuildingIcon,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { User } from "../providers/auth";

interface DropdownItem {
  name: string;
  link: string;
  icon: any;
  requireRoles: string[];
}

export const getDropDownItems = (user: User) => {
  const common: DropdownItem[] = [
    // {
    //   name: "Profile",
    //   icon: UserIcon,
    //   link: `/profile/${user?.id}`,
    //   requireRoles: ["gharpeti", "customer"],
    // },
    // {
    //   name: "Settings",
    //   icon: Settings,
    //   link: "/settings",
    //
    //   requireRoles: ["gharpeti", "customer"],
    // },
  ];

  if (user?.type === "gharpeti") {
    common.splice(1, 0, {
      name: "My Properties",
      icon: BuildingIcon,
      link: "/profile/gharbheti/properties",
      requireRoles: ["gharpeti"],
    });
    common.splice(2, 0, {
      name: "Applications",
      icon: BookIcon,
      link: "/profile/gharbheti/applications",
      requireRoles: ["gharpeti"],
    });
  } else {
    common.splice(1, 0, {
      name: "My Applications",
      icon: BookIcon,
      link: "/profile/my/applications",
      requireRoles: ["customer"],
    });
  }

  return common;
};
