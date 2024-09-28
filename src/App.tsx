import { useState, useMemo } from "react";

import { AppShell, ScrollArea } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";

import { ChartArea } from "./Components/ChartArea/ChartArea";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Inputs } from "./Components/Inputs";
import { Monthly } from "./Types/Monthly";
import { Yearly } from "./Types/Yearly";

export const App = () => {
    const [opened, { toggle }] = useDisclosure();

    const [initialInvestment, setInitialInvestment] = useState<number | string>(0);
    const [monthlyContribution, setMonthlyContribution] = useState<number | string>(1000);
    const [lengthOfTimeInYears, setLengthOfTimeInYears] = useState<number | string>(20);
    const [interestRate, setInterestRate] = useState<number | string>(7);
    const [inflationRate, setInflationRate] = useState<number | string>(0);
    const [increaseInAnnualContributions, setIncreaseInAnnualContributions] = useState<number | string>(0);
    const [endOfContributions, setEndOfContributions] = useState<number | string>("");
    const [goal, setGoal] = useState<number | string>("");
    const [currency, setCurrency] = useState<string>("");

    const calcCompoundInterest = (
        initialInvestment: number | string,
        monthlyContribution: number | string,
        lengthOfTimeInYears: number | string,
        interestRate: number | string,
        inflationRate: number | string,
        increaseInAnnualContributions: number | string,
        endOfContributions: number | string
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

        const monthy: Monthly[] = [{ month: 0, contribution: totalContribution, value }];
        const yearly: Yearly[] = [{ year: yearCounter.toString(), contribution: totalContribution, value }];

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

            if (yearCounter === endOfContributions) {
                monthlyContributionAmount = 0;
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
            increaseInAnnualContributions,
            endOfContributions
        );
    }, [
        initialInvestment,
        monthlyContribution,
        lengthOfTimeInYears,
        interestRate,
        inflationRate,
        increaseInAnnualContributions,
        endOfContributions,
    ]);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{ width: 410, breakpoint: "sm", collapsed: { mobile: !opened } }}
            aside={{ width: 300, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
            transitionDuration={0}
            padding="md"
        >
            <AppShell.Header px="lg">
                <Header navbarOpened={opened} toggle={toggle} currency={currency} setCurrency={setCurrency} />
            </AppShell.Header>
            <AppShell.Navbar>
                <AppShell.Section grow component={ScrollArea}>
                    <Inputs
                        initialInvestment={initialInvestment}
                        monthlyContribution={monthlyContribution}
                        lengthOfTimeInYears={lengthOfTimeInYears}
                        interestRate={interestRate}
                        inflationRate={inflationRate}
                        increaseInAnnualContributions={increaseInAnnualContributions}
                        endOfContributions={endOfContributions}
                        goal={goal}
                        setInitialInvestment={setInitialInvestment}
                        setMonthlyContribution={setMonthlyContribution}
                        setLengthOfTimeInYears={setLengthOfTimeInYears}
                        setInterestRate={setInterestRate}
                        setInflationRate={setInflationRate}
                        setIncreaseInAnnualContributions={setIncreaseInAnnualContributions}
                        setEndOfContributions={setEndOfContributions}
                        setGoal={setGoal}
                    />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <ChartArea yearly={yearly} goal={goal} currency={currency} />
            </AppShell.Main>
            <AppShell.Aside p="md">Aside</AppShell.Aside>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};
