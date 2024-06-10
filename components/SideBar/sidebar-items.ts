export interface MenuList {
	header: string;
	icon: string;
	menu: MenuItem[];
}

export interface MenuItem {
	subHeader: string;
	menuList: SubMenuItem[];
}
export interface SubMenuItem {
	name: string;
	link: string;
}

export const menuList: MenuList[] = [
	{
		header: "Master แพทย์",
		icon: "/icons/data-list.svg",
		menu: [
			{
				subHeader: "Master แพทย์",
				menuList: [
					{
						name: "แพทย์",
						link: "/med",
					},
					{
						name: "คลีนิค",
						link: "/clinic",
					},
				],
			},
		],
	},
];
