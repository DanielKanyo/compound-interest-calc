import {
    ActionIcon,
    Burger,
    Group,
    Image,
    useComputedColorScheme,
    useMantineColorScheme,
    Text,
    Modal,
    Autocomplete,
    Switch,
    Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSun, IconMoon, IconQuestionMark, IconSettings } from "@tabler/icons-react";

import logo from "/favicon.png";

type HeaderProps = {
    navbarOpened: boolean | undefined;
    toggle: () => void;
    currency: string;
    setCurrency: (value: string) => void;
    prefixChecked: boolean;
    setPrefixChecked: (value: boolean) => void;
};

export const Header = ({ navbarOpened, toggle, currency, setCurrency, prefixChecked, setPrefixChecked }: HeaderProps) => {
    const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });
    const [modalOpened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Group h="100%" justify="space-between">
                <Group>
                    <Burger opened={navbarOpened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Image h={32} src={logo} />
                    <Text lh={1}>Compound Interest Calculator</Text>
                </Group>
                <Group gap="xs">
                    <ActionIcon
                        component="a"
                        href="https://www.investopedia.com/terms/c/compoundinterest.asp"
                        variant="default"
                        size="lg"
                        aria-label="Open in a new tab"
                        target="_blank"
                        radius="md"
                    >
                        <IconQuestionMark stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                        variant="default"
                        size="lg"
                        aria-label="Toggle color scheme"
                        radius="md"
                    >
                        {computedColorScheme === "dark" ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
                    </ActionIcon>
                    <ActionIcon onClick={open} variant="default" size="lg" aria-label="Toggle settings" radius="md">
                        <IconSettings stroke={1.1} />
                    </ActionIcon>
                </Group>
            </Group>
            <Modal opened={modalOpened} onClose={close} title="Settings" centered>
                <Autocomplete
                    label="Currency"
                    placeholder="Select or enter prefered currency..."
                    data={["$", "€", "¥", "£", "₹"]}
                    onChange={(event) => setCurrency(event)}
                    value={currency}
                />
                <Flex justify="flex-end" mt="md">
                    <Switch
                        checked={prefixChecked}
                        onChange={(event) => setPrefixChecked(event.currentTarget.checked)}
                        labelPosition="left"
                        label="Prefix"
                    />
                </Flex>
            </Modal>
        </>
    );
};
