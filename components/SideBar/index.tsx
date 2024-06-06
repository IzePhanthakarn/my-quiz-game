"use client";

import React from "react";
import { SidebarItem, sidebarItems } from "./sidebar-items";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathName = usePathname();
  console.log("pathName", pathName);
  return (
    <div className="w-[280px] border border-r-[##00000033] flex flex-col">
      {sidebarItems.map((item: SidebarItem) => (
        <Link
          className={`h-10 flex items-center border border-black ${
            pathName === item.link ? "bg-[#2196F3] text-white" : "text-black"
          }`}
          key={item.name}
          href={item.link}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
