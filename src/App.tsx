import { useState, useMemo } from "react";

import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { AppShell, ScrollArea } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";

import { Header } from "./Components/Header";
import { Inputs } from "./Components/Inputs";

export const App = () => {
    const [opened, { toggle }] = useDisclosure();

    const [initialInvestment, setInitialInvestment] = useState<number | string>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number | string>(1000);
    const [lengthOfTimeInYears, setLengthOfTimeInYears] = useState<number | string>(20);
    const [interestRate, setInterestRate] = useState<number | string>(7);
    const [inflationRate, setInflationRate] = useState<number | string>(0);
    const [increaseInAnnualContributions, setIncreaseInAnnualContributions] = useState<number | string>(0);

    const calcCompoundInterest = (
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
        let yearCounter = 0;

        const monthy = [{ month: 0, contribution: totalContribution, value }];
        const yearly = [{ year: yearCounter.toString(), contribution: totalContribution, value }];

        for (let i = 1; i <= numOfYears * numOfMonthsInOneYear; i++) {
            totalContribution += monthlyContributionAmount;

            if (i === 1) {
                monthy.push({ month: i, contribution: totalContribution, value: tmp });

                value += tmp;
            } else {
                value = tmp * (1 + (rate - inflation) / 12) + monthlyContributionAmount;

                monthy.push({ month: i, contribution: totalContribution, value });

                if (i % 12 === 0) {
                    ++yearCounter;
                    yearly.push({ year: yearCounter.toString(), contribution: totalContribution, value });
                }

                tmp = value;
            }

            // Increase monthly contribution amount after 12 months
            if (i % 12 === 0) {
                monthlyContributionAmount += monthlyContributionAmount * increase;
            }
        }

        return { monthy, yearly };
    };

    const { yearly } = useMemo(() => {
        return calcCompoundInterest(
            initialInvestment,
            monthlyContribution,
            lengthOfTimeInYears,
            interestRate,
            inflationRate,
            increaseInAnnualContributions
        );
    }, [initialInvestment, monthlyContribution, lengthOfTimeInYears, interestRate, inflationRate, increaseInAnnualContributions]);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{ width: 440, breakpoint: "sm", collapsed: { mobile: !opened } }}
            aside={{ width: 300, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
            transitionDuration={0}
            padding="md"
        >
            <AppShell.Header>
                <Header opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea}>
                    <Inputs
                        initialInvestment={initialInvestment}
                        monthlyContribution={monthlyContribution}
                        lengthOfTimeInYears={lengthOfTimeInYears}
                        interestRate={interestRate}
                        inflationRate={inflationRate}
                        increaseInAnnualContributions={increaseInAnnualContributions}
                        setInitialInvestment={setInitialInvestment}
                        setMonthlyContribution={setMonthlyContribution}
                        setLengthOfTimeInYears={setLengthOfTimeInYears}
                        setInterestRate={setInterestRate}
                        setInflationRate={setInflationRate}
                        setIncreaseInAnnualContributions={setIncreaseInAnnualContributions}
                    />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <AreaChart
                    h="calc(100vh - 152px)"
                    data={yearly}
                    withLegend
                    tickLine="xy"
                    dataKey="year"
                    series={[
                        { name: "contribution", label: "Contribution", color: "blue.6" },
                        { name: "value", label: "Compound interest", color: "teal.6" },
                    ]}
                    curveType="linear"
                    valueFormatter={(value) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value)}
                    xAxisLabel="Years"
                    yAxisLabel="Amount"
                    yAxisProps={{ tickFormatter: (value) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value) }}
                />
            </AppShell.Main>
            <AppShell.Aside p="md">Aside</AppShell.Aside>
            <AppShell.Footer p="md">Footer</AppShell.Footer>
        </AppShell>
    );
};
