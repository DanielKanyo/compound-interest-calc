import { ActionIcon, Burger, Group, Image, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

import logo from "/favicon.png";

type HeaderProps = {
    opened: boolean | undefined;
    toggle: () => void;
};

export const Header = ({ opened, toggle }: HeaderProps) => {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

    return (
        <Group h="100%" px="md" justify="space-between">
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Image h={32} src={logo} />
                Compound Interest Calculator
            </Group>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                variant="default"
                size="lg"
                aria-label="Toggle color scheme"
            >
                {computedColorScheme === "dark" ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
            </ActionIcon>
        </Group>
    );
};
