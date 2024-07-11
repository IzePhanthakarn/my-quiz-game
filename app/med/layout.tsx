import MainWrapper from "../../modules/wrapper/main";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MainWrapper>{children}</MainWrapper>;
}
