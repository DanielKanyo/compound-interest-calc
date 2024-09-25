import { useState, useMemo } from "react";

import { AppShell, Burger, Group, Image, Card, NumberInput, Flex, Tooltip } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";

import logo from "/favicon.png";

export function App() {
    const [opened, { toggle }] = useDisclosure();

    const [initialInvestment, setInitialInvestment] = useState<number | string>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number | string>(1000);
    const [lengthOfTimeInYears, setLengthOfTimeInYears] = useState<number | string>(30);
    const [interestRate, setInterestRate] = useState<number | string>(8);
    const [inflationRate, setInflationRate] = useState<number | string>(8);
    const [increaseInAnnualContributions, setIncreaseInAnnualContributions] = useState<number | string>(0);

    const calcInvestedCapital = (
        initialInvestment: number | string,
        monthlyContribution: number | string,
        lengthOfTimeInYears: number | string,
        increaseInAnnualContributions: number | string
    ) => {
        const data = [];
        const numOfMonthsInOneYear = 12;
        const numOfYears = Number(lengthOfTimeInYears);
        const increase = Number(increaseInAnnualContributions) / 100;

        let monthlyContributionAmount = Number(monthlyContribution);
        let amountPerYear = Number(initialInvestment);

        for (let i = 1; i <= numOfYears; i++) {
            amountPerYear += monthlyContributionAmount * numOfMonthsInOneYear;

            data.push({ year: i, capital: amountPerYear });

            monthlyContributionAmount += monthlyContributionAmount * increase;
        }

        return data;
    };

    const capitalPerYear = useMemo(() => {
        return calcInvestedCapital(initialInvestment, monthlyContribution, lengthOfTimeInYears, increaseInAnnualContributions);
    }, [initialInvestment, monthlyContribution, lengthOfTimeInYears, increaseInAnnualContributions]);

    console.log(capitalPerYear);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 480, breakpoint: "sm", collapsed: { mobile: !opened } }}
            transitionDuration={0}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Image h={32} src={logo} />
                    Compound Interest Calculator
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Flex gap="lg" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
                        <Tooltip
                            label='"Initial Investment" refers to the starting amount of money invested before any additional contributions or interest growth occurs in a compound interest calculation.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Initial Investment"
                                placeholder="Amount"
                                thousandSeparator=" "
                                value={initialInvestment}
                                onChange={setInitialInvestment}
                            />
                        </Tooltip>
                        <Tooltip
                            label='"Monthly Contribution" refers to the fixed amount of money added to the investment each month, which accumulates alongside the compound interest over time.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Monthly Contribution"
                                placeholder="Amount"
                                thousandSeparator=" "
                                value={monthlyContribution}
                                onChange={setMonthlyContribution}
                            />
                        </Tooltip>
                        <Tooltip
                            label='"Length of Time in Years" refers to the number of years an investment is allowed to grow with compound interest applied.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Length of Time in Years"
                                placeholder="Amount"
                                thousandSeparator=" "
                                value={lengthOfTimeInYears}
                                onChange={setLengthOfTimeInYears}
                            />
                        </Tooltip>
                        <Tooltip
                            label='"Interest Rate" refers to the percentage at which your investment grows annually due to earned interest, compounded over time in a compound interest calculation.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Interest Rate"
                                placeholder="Amount"
                                thousandSeparator=" "
                                defaultValue={8}
                                value={interestRate}
                                onChange={setInterestRate}
                            />
                        </Tooltip>
                        <Tooltip
                            label='"Inflation Rate" refers to the percentage increase in the general price level of goods and services over time, which can reduce the real value of returns in a compound interest investment.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Inflation Rate"
                                placeholder="Amount"
                                thousandSeparator=" "
                                value={inflationRate}
                                onChange={setInflationRate}
                            />
                        </Tooltip>
                        <Tooltip
                            label='"Increase in Annual Contributions" refers to the additional amount added each year to the principal investment, which grows alongside the accumulated interest over time in a compound interest scenario.'
                            color="indigo"
                            position="right"
                            withArrow
                            w={320}
                            multiline
                        >
                            <NumberInput
                                w="100%"
                                size="md"
                                label="Increase in Annual Contributions"
                                placeholder="Amount"
                                thousandSeparator=" "
                                value={increaseInAnnualContributions}
                                onChange={setIncreaseInAnnualContributions}
                            />
                        </Tooltip>
                    </Flex>
                </Card>
            </AppShell.Navbar>
            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    );
}
