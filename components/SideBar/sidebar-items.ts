import { LINKS } from "../../constants/links";

export interface MenuItem {
	header: string;
	icon: string;
	isAccordion: boolean;
	link: string;
	subMenu: SubMenuItem[];
}
export interface SubMenuItem {
	name: string;
	link: string;
}

export const menuList: MenuItem[] = [
	{
		header: "Dashboard",
		icon: "/icons/dashboard.svg",
		isAccordion: false,
		link: "/",
		subMenu: [],
	},
	{
		header: "Master แพทย์",
		icon: "/icons/dns.svg",
		isAccordion: true,
		link: "/clinic",
		subMenu: [
			{
				name: LINKS.MED.name,
				link: LINKS.MED.link,
			},
			{
				name: LINKS.CLINIC.name,
				link: LINKS.CLINIC.link,
			},
		],
	},
];
