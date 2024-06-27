const padding = [
	{
		pattern: /^p[xtylrb]?-[0-9]+(\.[05])?$/, // Regex pattern สำหรับ padding classes แบบตัวเลข
	},
	{
		pattern: /^p[xtylrb]?-\[\d+px\]$/, // Regex pattern สำหรับ padding classes แบบ px
	},
];

const rounded = [
	{
		pattern: /^rounded-\[\d+px\]$/, // rounded-[10px], rounded-[20px], ...
	},
	{
		pattern: /^rounded-[trbl]{1,2}-\[\d+px\]$/, // rounded-t-[10px], rounded-r-[20px], ...
	},
	{
		pattern: /^rounded-(full|lg|md|sm|none|xl)$/, // rounded-full, rounded-lg, rounded-md, rounded-sm, rounded-none, rounded-xl
	},
];

export const safelistConfig = [...padding, ...rounded];
