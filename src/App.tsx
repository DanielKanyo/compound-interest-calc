import { useState, useMemo } from "react";

import { AppShell, Burger, Group, Image, Card, NumberInput, Flex, Tooltip, rem } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconPercentage, IconHourglassHigh, IconFlag, IconPigMoney } from "@tabler/icons-react";

import logo from "/favicon.png";

export function App() {
    const [opened, { toggle }] = useDisclosure();

    const [initialInvestment, setInitialInvestment] = useState<number | string>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number | string>(50000);
    const [lengthOfTimeInYears, setLengthOfTimeInYears] = useState<number | string>(1);
    const [interestRate, setInterestRate] = useState<number | string>(10);
    const [inflationRate, setInflationRate] = useState<number | string>(0);
    const [increaseInAnnualContributions, setIncreaseInAnnualContributions] = useState<number | string>(0);

    const calcInvestedCapitalWithCompoundInterestAndInflation = (
        initialInvestment: number | string,
        monthlyContribution: number | string,
        lengthOfTimeInYears: number | string,
        interestRate: number | string,
        inflationRate: number | string,
        increaseInAnnualContributions: number | string
    ) => {
        const numOfMonthsInOneYear = 12;
        const numOfYears = Number(lengthOfTimeInYears);
        const increase = Number(increaseInAnnualContributions) / 100;
        const rate = Number(interestRate) / 100;
        const inflation = Number(inflationRate) / 100;

        let monthlyContributionAmount = Number(monthlyContribution);
        let totalContribution = Number(initialInvestment);

        let tmp = (totalContribution + monthlyContributionAmount) * (1 + (rate - inflation) / 12);
        let value = totalContribution;

        const result = [{ month: 0, contribution: totalContribution, value }];

        for (let i = 1; i <= numOfYears * numOfMonthsInOneYear; i++) {
            totalContribution += monthlyContributionAmount;

            if (i === 1) {
                result.push({ month: i, contribution: totalContribution, value: tmp });

                value += tmp;
            } else {
                value = tmp * (1 + (rate - inflation) / 12) + monthlyContributionAmount;

                result.push({ month: i, contribution: totalContribution, value });

                tmp = value;
            }

            // Increase monthly contribution amount after 12 months
            if (i % 12 === 0) {
                monthlyContributionAmount += monthlyContributionAmount * increase;
            }
        }

        return result;
    };

    const capitalWithCompoundInterestAndInflationPerYear = useMemo(() => {
        return calcInvestedCapitalWithCompoundInterestAndInflation(
            initialInvestment,
            monthlyContribution,
            lengthOfTimeInYears,
            interestRate,
            inflationRate,
            increaseInAnnualContributions
        );
    }, [initialInvestment, monthlyContribution, lengthOfTimeInYears, interestRate, inflationRate, increaseInAnnualContributions]);

    console.log(capitalWithCompoundInterestAndInflationPerYear);

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
                                rightSection={<IconFlag style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
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
                                rightSection={<IconPigMoney style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
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
                                rightSection={
                                    <IconHourglassHigh style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />
                                }
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
                                rightSection={<IconPercentage style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
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
                                rightSection={<IconPercentage style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
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
                                rightSection={<IconPercentage style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                            />
                        </Tooltip>
                    </Flex>
                </Card>
            </AppShell.Navbar>
            <AppShell.Main>Main</AppShell.Main>
        </AppShell>
    );
}
