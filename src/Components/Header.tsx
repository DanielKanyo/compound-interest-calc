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
    ColorInput,
    Tooltip,
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
    contributionColor: string;
    compInterestColor: string;
    setContributionColor: (value: string) => void;
    setCompInterestColor: (value: string) => void;
};

export const Header = ({
    navbarOpened,
    toggle,
    currency,
    setCurrency,
    prefixChecked,
    setPrefixChecked,
    contributionColor,
    compInterestColor,
    setContributionColor,
    setCompInterestColor,
}: HeaderProps) => {
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
                    <Tooltip label="About Compound Interest" color={compInterestColor} radius="md">
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
                    </Tooltip>
                    <Tooltip label="Toggle Color Scheme" color={compInterestColor} radius="md">
                        <ActionIcon
                            onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                            variant="default"
                            size="lg"
                            aria-label="Toggle color scheme"
                            radius="md"
                        >
                            {computedColorScheme === "dark" ? <IconSun stroke={1.5} /> : <IconMoon stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Settings" color={compInterestColor} radius="md">
                        <ActionIcon onClick={open} variant="default" size="lg" aria-label="Toggle settings" radius="md">
                            <IconSettings stroke={1.1} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
            <Modal opened={modalOpened} onClose={close} title="Settings" centered radius="md">
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

                <Flex gap="md" mt="lg">
                    <ColorInput
                        placeholder="Pick color"
                        label="Compound Interest Color"
                        disallowInput
                        withPicker={false}
                        value={compInterestColor}
                        swatches={["#12b886", "#228be6", "#e64980", "#be4bdb", "#fa5252", "#fd7e14", "#4c6ef5"]}
                        onChange={setCompInterestColor}
                    />
                    <ColorInput
                        placeholder="Pick color"
                        label="Contribution Color"
                        disallowInput
                        withPicker={false}
                        value={contributionColor}
                        swatches={["#12b886", "#228be6", "#e64980", "#be4bdb", "#fa5252", "#fd7e14", "#4c6ef5"]}
                        onChange={setContributionColor}
                    />
                </Flex>
            </Modal>
        </>
    );
};
