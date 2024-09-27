import { ActionIcon, Burger, Group, Image, useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoon, IconQuestionMark } from "@tabler/icons-react";

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
            <Group gap="xs">
                <ActionIcon
                    component="a"
                    href="https://www.investopedia.com/terms/c/compoundinterest.asp"
                    variant="default"
                    size="lg"
                    aria-label="Open in a new tab"
                    target="_blank"
                >
                    <IconQuestionMark stroke={1.5} />
                </ActionIcon>
                <ActionIcon
                    onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                    variant="default"
                    size="lg"
                    aria-label="Toggle color scheme"
                >
                    {computedColorScheme === "dark" ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
                </ActionIcon>
            </Group>
        </Group>
    );
};
