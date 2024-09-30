import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { AppShell, em, ScrollArea } from "@mantine/core";
import "@mantine/core/styles.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { Breakdown } from "./Components/Breakdown/Breakdown";
import { ChartArea } from "./Components/ChartArea/ChartArea";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Inputs } from "./Components/Inputs";
import { Monthly } from "./Types/Monthly";
import { Yearly } from "./Types/Yearly";

export const App = () => {
    const isMobile = useMediaQuery(`(max-width: ${em(1000)})`);
    const [searchParams, setSearchParams] = useSearchParams();
    const [opened, { toggle }] = useDisclosure();

    const [initialInvestment, setInitialInvestment] = useState<number | string>(Number(searchParams.get("initialInvestment")) || 0);
    const [monthlyContribution, setMonthlyContribution] = useState<number | string>(
        Number(searchParams.get("monthlyContribution")) || 1000
    );
    const [lengthOfTimeInYears, setLengthOfTimeInYears] = useState<number | string>(Number(searchParams.get("lengthOfTimeInYears")) || 20);
    const [interestRate, setInterestRate] = useState<number | string>(Number(searchParams.get("interestRate")) || 7);
    const [inflationRate, setInflationRate] = useState<number | string>(Number(searchParams.get("inflationRate")) || 0);
    const [increaseInAnnualContributions, setIncreaseInAnnualContributions] = useState<number | string>(
        Number(searchParams.get("increaseInAnnualContributions")) || 0
    );
    const [endOfContributions, setEndOfContributions] = useState<number | string>(searchParams.get("endOfContributions") || "");
    const [goal, setGoal] = useState<number | string>(searchParams.get("goal") || "");
    const [currency, setCurrency] = useState<string>(searchParams.get("currency") || "");
    const [prefixChecked, setPrefixChecked] = useState<boolean>(true);

    const [contributionColor, setContributionColor] = useState<string>("#1971c2");
    const [compInterestColor, setCompInterestColor] = useState<string>("#099268");

    useEffect(() => {
        setSearchParams({
            initialInvestment: initialInvestment.toString(),
            monthlyContribution: monthlyContribution.toString(),
            lengthOfTimeInYears: lengthOfTimeInYears.toString(),
            interestRate: interestRate.toString(),
            inflationRate: inflationRate.toString(),
            increaseInAnnualContributions: increaseInAnnualContributions.toString(),
            endOfContributions: endOfContributions.toString(),
            goal: goal.toString(),
            currency,
        });
    }, [
        initialInvestment,
        monthlyContribution,
        lengthOfTimeInYears,
        interestRate,
        inflationRate,
        increaseInAnnualContributions,
        endOfContributions,
        goal,
        currency,
        setSearchParams,
    ]);

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

        const monthly: Monthly[] = [{ month: 0, contribution: totalContribution, value }];
        const yearly: Yearly[] = [{ year: yearCounter.toString(), contribution: totalContribution, value }];

        for (let i = 1; i <= numOfYears * numOfMonthsInOneYear; i++) {
            totalContribution += monthlyContributionAmount;

            if (i === 1) {
                monthly.push({ month: i, contribution: totalContribution, value: tmp });

                value += tmp;
            } else {
                value = tmp * (1 + (rate - inflation) / 12) + monthlyContributionAmount;

                monthly.push({ month: i, contribution: totalContribution, value });

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

        return { monthly, yearly };
    };

    const { yearly, monthly } = useMemo(() => {
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

    const { goalYear, goalMonth } = useMemo(() => {
        if (!goal) return { goalYear: null, goalMonth: null };

        const goalValue = Number(goal);

        let calculatedGoalYear: number | null = null;
        let calculatedGoalMonth: number | null = null;

        // Find the year where the goal is reached
        const yearlyIndex = yearly.findIndex((y) => y.value >= goalValue);

        if (yearlyIndex > 0) {
            const currentYear = yearly[yearlyIndex];
            const previousYear = yearly[yearlyIndex - 1];
            const yearlyGrowth = currentYear.value - previousYear.value;

            if (yearlyGrowth > 0) {
                calculatedGoalYear = Number(previousYear.year) + (goalValue - previousYear.value) / yearlyGrowth;
            }
        }

        // Find the month where the goal is reached
        const monthlyIndex = monthly.findIndex((m) => m.value >= goalValue);

        if (monthlyIndex > 0) {
            const currentMonth = monthly[monthlyIndex];
            const previousMonth = monthly[monthlyIndex - 1];
            const monthlyGrowth = currentMonth.value - previousMonth.value;

            if (monthlyGrowth > 0) {
                calculatedGoalMonth = previousMonth.month + (goalValue - previousMonth.value) / monthlyGrowth;
            }
        }

        return { goalYear: calculatedGoalYear, goalMonth: calculatedGoalMonth };
    }, [yearly, monthly, goal]);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{ width: 410, breakpoint: "sm", collapsed: { mobile: !opened } }}
            aside={{ width: 360, breakpoint: "md", collapsed: { desktop: false, mobile: true } }}
            transitionDuration={0}
            padding="md"
        >
            <AppShell.Header px="lg">
                <Header
                    navbarOpened={opened}
                    toggle={toggle}
                    currency={currency}
                    setCurrency={setCurrency}
                    prefixChecked={prefixChecked}
                    setPrefixChecked={setPrefixChecked}
                    contributionColor={contributionColor}
                    compInterestColor={compInterestColor}
                    setContributionColor={setContributionColor}
                    setCompInterestColor={setCompInterestColor}
                    isMobile={isMobile}
                />
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
                        currency={currency}
                        prefixChecked={prefixChecked}
                        compInterestColor={compInterestColor}
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
                <ChartArea
                    yearly={yearly}
                    goal={goal}
                    currency={currency}
                    prefixChecked={prefixChecked}
                    contributionColor={contributionColor}
                    compInterestColor={compInterestColor}
                    isMobile={isMobile}
                />
            </AppShell.Main>
            <AppShell.Aside>
                <Breakdown yearly={yearly} monthly={monthly} goal={goal} goalYear={goalYear} goalMonth={goalMonth} currency={currency} />
            </AppShell.Aside>
            <AppShell.Footer>
                <Footer compInterestColor={compInterestColor} />
            </AppShell.Footer>
        </AppShell>
    );
};
