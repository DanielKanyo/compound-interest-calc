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
    const handleHavbarBurgerClick = () => {
        if (breakdownOpened) {
            toggleBreakdown();
        }

        toggleNavbar();
    };

    const handleBreakdownBurgerClick = () => {
        if (navbarOpened) {
            toggleNavbar();
        }

        toggleBreakdown();
    };

    return (
        <Group h="100%" justify="space-between">
            <Group>
                <Burger opened={navbarOpened} onClick={handleHavbarBurgerClick} hiddenFrom="md" size="sm" />
                <IconChartArrowsVertical style={{ width: rem(38), height: rem(38) }} stroke={1.5} color={compInterestColor} />
                {isMobile ? (
                    <Text fz={16} lh={1}>
                        Compound Interest <br /> Calculator
                    </Text>
                ) : (
                    <Text lh={1}>Compound Interest Calculator</Text>
                )}
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
            <Burger opened={breakdownOpened} onClick={handleBreakdownBurgerClick} hiddenFrom="md" size="sm" />
        </Group>
    );
};
