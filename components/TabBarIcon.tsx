import Icon from "@expo/vector-icons/FontAwesome6";

interface TabBarIconProps {
	name: React.ComponentProps<typeof Icon>["name"];
	color: string;
	[x: string]: any;
}

export default function TabBarIcon(props: TabBarIconProps) {
	return <Icon size={28} style={{ marginBottom: -3 }} {...props} />;
}
