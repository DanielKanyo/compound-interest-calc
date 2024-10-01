import { Burger, Group, Text, rem } from "@mantine/core";
import { IconChartArrowsVertical } from "@tabler/icons-react";

import { HeaderActions } from "./HeaderActions";

type HeaderProps = {
    navbarOpened: boolean | undefined;
    toggleNavbar: () => void;
    breakdownOpened: boolean | undefined;
    toggleBreakdown: () => void;
    currency: string;
    setCurrency: (value: string) => void;
    prefixChecked: boolean;
    setPrefixChecked: (value: boolean) => void;
    contributionColor: string;
    compInterestColor: string;
    setContributionColor: (value: string) => void;
    setCompInterestColor: (value: string) => void;
    isMobile: boolean | undefined;
};

export const Header = ({
    navbarOpened,
    toggleNavbar,
    breakdownOpened,
    toggleBreakdown,
    currency,
    setCurrency,
    prefixChecked,
    setPrefixChecked,
    contributionColor,
    compInterestColor,
    setContributionColor,
    setCompInterestColor,
    isMobile,
}: HeaderProps) => {
    return (
        <>
            <Group h="100%" justify="space-between">
                <Group>
                    <Burger opened={navbarOpened} onClick={toggleNavbar} hiddenFrom="sm" size="sm" />
                    <IconChartArrowsVertical style={{ width: rem(38), height: rem(38) }} stroke={1.5} color={compInterestColor} />
                    <Text lh={1}>Compound Interest Calculator</Text>
                </Group>
                {!isMobile && (
                    <HeaderActions
                        currency={currency}
                        setCurrency={setCurrency}
                        prefixChecked={prefixChecked}
                        setPrefixChecked={setPrefixChecked}
                        contributionColor={contributionColor}
                        compInterestColor={compInterestColor}
                        setContributionColor={setContributionColor}
                        setCompInterestColor={setCompInterestColor}
                    />
                )}
                {isMobile && <Burger opened={breakdownOpened} onClick={toggleBreakdown} hiddenFrom="sm" size="sm" />}
            </Group>
        </>
    );
};
