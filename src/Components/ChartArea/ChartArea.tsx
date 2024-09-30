import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Avatar, Card, Flex, Group, Text } from "@mantine/core";
import { IconCoins, IconPigMoney, IconTrendingUp } from "@tabler/icons-react";

import { Yearly } from "../../Types/Yearly";
import "./ChartArea.css";

const colorMap = new Map<string, string>([
    ["#099268", "teal"],
    ["#1971c2", "blue"],
    ["#c2255c", "pink"],
    ["#343a40", "gray"],
    ["#9c36b5", "grape"],
    ["#e03131", "red"],
    ["#e8590c", "orange"],
    ["#3b5bdb", "indigo"],
]);

type ChartAreaProps = {
    yearly: Yearly[];
    goal: number | string;
    currency: string;
    prefixChecked: boolean;
    contributionColor: string;
    compInterestColor: string;
};

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    currency: string;
    prefixChecked: boolean;
};

const StatCard = ({ title, value, icon: Icon, color, currency, prefixChecked }: StatCardProps) => (
    <Card shadow="sm" p="lg" radius="md" bg={color}>
        <Flex gap="lg">
            <Flex align="center">
                <Avatar variant="filled" radius="md" size={55} color={`${colorMap.get(color)}.9`}>
                    <Icon size="2rem" />
                </Avatar>
            </Flex>
            <Flex direction="column" justify="space-around">
                <Text c="gray.3" lh={1}>
                    {title}
                </Text>
                <Text fz={32} c="white" lh={1}>
                    {currency && prefixChecked && <span className="currency-symbol prefix">{currency}</span>}
                    {new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)}
                    {currency && !prefixChecked && <span className="currency-symbol suffix">{currency}</span>}
                </Text>
            </Flex>
        </Flex>
    </Card>
);

export const ChartArea = ({ yearly, goal, currency, prefixChecked, contributionColor, compInterestColor }: ChartAreaProps) => {
    const totalSavings = yearly.length ? yearly[yearly.length - 1].value : 0;
    const totalContributions = yearly.length ? yearly[yearly.length - 1].contribution : 0;

    const valueWithPrefixOrSuffixFormatter = (value: number) => {
        const number = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value);

        if (prefixChecked) {
            return `${currency}${number}`;
        }

        return `${number}${currency}`;
    };

    return (
        <>
            <Group gap="md" mb="xs" grow>
                <StatCard
                    title="Total Savings"
                    value={totalSavings}
                    icon={IconTrendingUp}
                    color={compInterestColor}
                    currency={currency}
                    prefixChecked={prefixChecked}
                />
                <StatCard
                    title="Total Contributions"
                    value={totalContributions}
                    icon={IconPigMoney}
                    color={contributionColor}
                    currency={currency}
                    prefixChecked={prefixChecked}
                />
                <StatCard
                    title="Total Interest"
                    value={totalSavings - totalContributions}
                    icon={IconCoins}
                    color="#343a40"
                    currency={currency}
                    prefixChecked={prefixChecked}
                />
            </Group>
            <AreaChart
                h="calc(100vh - 257px)"
                data={yearly}
                withLegend
                tickLine="y"
                dataKey="year"
                series={[
                    { name: "contribution", label: "Contribution", color: contributionColor },
                    { name: "value", label: "Compound Interest", color: compInterestColor },
                ]}
                curveType="linear"
                valueFormatter={(value) => valueWithPrefixOrSuffixFormatter(value)}
                xAxisLabel="Years"
                yAxisLabel={currency ? `Amount (${currency})` : "Amount"}
                yAxisProps={{ tickFormatter: (value) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value) }}
                referenceLines={goal ? [{ y: goal, label: valueWithPrefixOrSuffixFormatter(Number(goal)), color: "violet.4" }] : []}
            />
        </>
    );
};
