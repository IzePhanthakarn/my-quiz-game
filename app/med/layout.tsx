import MainWrapper from "../../modules/main-wrapper";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <MainWrapper>{children}</MainWrapper>;
}
