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

const margin = [
	{
		pattern: /^m[xtylrb]?-[0-9]+(\.[05])?$/, // Regex pattern สำหรับ margin classes แบบตัวเลข
	},
	{
		pattern: /^m[xtylrb]?-\[\d+px\]$/, // Regex pattern สำหรับ margin classes แบบ px
	},
];

const background = [
	{
		pattern:
			/^bg-(red|green|blue|yellow|purple|pink|gray|indigo|black|white)-[0-9]{1,3}$/, // Regex pattern สำหรับสีพื้นฐานและระดับสี
	},
	{
		pattern: /^bg-\[\#[0-9A-Fa-f]{6}\]$/, // Regex pattern สำหรับ custom hex color codes
	},
];

const text = [
	{
		pattern:
			/^text-(red|green|blue|yellow|purple|pink|gray|indigo|black|white)-[0-9]{1,3}$/, // Regex pattern สำหรับสีพื้นฐานและระดับสี
	},
	{
		pattern: /^text-\[\#[0-9A-Fa-f]{6}\]$/, // Regex pattern สำหรับ custom hex color codes
	},
	{
		pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/, // Regex pattern สำหรับขนาดตัวอักษร
	},
	{
		pattern: /^text-(left|center|right|justify)$/, // Regex pattern สำหรับการจัดแนวตัวอักษร
	},
];

const fontWeight = [
	{
		pattern:
			/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/, // Regex pattern สำหรับระดับความหนาของฟอนต์
	},
	{
		pattern: /^font-\d{1,3}$/, // Regex pattern สำหรับ custom font weight values (ตัวเลข 1-999)
	},
];

const lineHeight = [
	{
		pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/, // Regex pattern สำหรับ named line height values
	},
	{
		pattern: /^leading-\d+$/, // Regex pattern สำหรับ numeric line height values
	},
	{
		pattern: /^leading-\[\d+(\.\d+)?(rem|em|px|%)\]$/, // Regex pattern สำหรับ custom line height values with units
	},
];

const textAlign = [
	{
		pattern: /^text-(left|center|right|justify)$/, // Regex pattern สำหรับการจัดแนวตัวอักษร
	},
];

const spaceBetween = [
	{
		pattern: /^space-(x|y)-(start|end|center|between|around)$/,
	},
];

const heightClasses = [
	{
		pattern: /^h-(\d{1,3}|auto|px|full|screen)$/,
	},
];

const widthClasses = [
	{
		pattern: /^w-(\d{1,3}|auto|px|full|screen)$/,
	},
];

const justifyContent = [
	{
		pattern: /^justify-(start|end|center|between|around|evenly)$/, // Regex pattern สำหรับการจัดวาง items ภายใน flex container
	},
];

const alignItems = [
	{
		pattern: /^items-(start|end|center|baseline|stretch)$/,
		description: "Regex pattern สำหรับการจัด align items ใน flex container",
	},
];

const customSafelist = [
	...padding,
	...rounded,
	...margin,
	...background,
	...text,
	...fontWeight,
	...lineHeight,
	...textAlign,
	...spaceBetween,
	...heightClasses,
	...widthClasses,
	...justifyContent,
	...alignItems,
];

export const safelistConfig = customSafelist;
