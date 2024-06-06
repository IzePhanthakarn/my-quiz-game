export interface SidebarItem {
  name: string;
  icon: string;
  link: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    name: "แพทย์",
    icon: "HomeIcon",
    link: "/med",
  },
  {
    name: "คลีนิค",
    icon: "UserIcon",
    link: "/clinic",
  },
];
