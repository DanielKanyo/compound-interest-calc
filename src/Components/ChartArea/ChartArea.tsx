import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Avatar, Card, Flex, Group, Text } from "@mantine/core";
import { IconCoins, IconPigMoney, IconTrendingUp } from "@tabler/icons-react";

import { Yearly } from "../../Types/Yearly";
import "./ChartArea.css";

type ChartAreaProps = {
    yearly: Yearly[];
    goal: number | string;
    currency: string;
};

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    currency: string;
};

const StatCard = ({ title, value, icon: Icon, color, currency }: StatCardProps) => (
    <Card shadow="sm" p="lg" radius="md" bg={color}>
        <Flex gap="lg">
            <Flex align="center">
                <Avatar variant="filled" radius="md" size={55} color={`${color}.9`}>
                    <Icon size="2rem" />
                </Avatar>
            </Flex>
            <Flex direction="column" justify="space-around">
                <Text c="gray.3" lh={1}>
                    {title}
                </Text>
                <Text fz={32} c="white" lh={1}>
                    {currency && <span className="currency-symbol">{currency}</span>}
                    {new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)}
                </Text>
            </Flex>
        </Flex>
    </Card>
);

export const ChartArea = ({ yearly, goal, currency }: ChartAreaProps) => {
    const totalSavings = yearly.length ? yearly[yearly.length - 1].value : 0;
    const totalContributions = yearly.length ? yearly[yearly.length - 1].contribution : 0;

    return (
        <>
            <Group gap="md" mb="xs" grow>
                <StatCard title="Total Savings" value={totalSavings} icon={IconTrendingUp} color="teal" currency={currency} />
                <StatCard title="Total Contributions" value={totalContributions} icon={IconPigMoney} color="blue" currency={currency} />
                <StatCard
                    title="Total Interest"
                    value={totalSavings - totalContributions}
                    icon={IconCoins}
                    color="gray"
                    currency={currency}
                />
            </Group>
            <AreaChart
                h="calc(100vh - 257px)"
                data={yearly}
                withLegend
                tickLine="y"
                dataKey="year"
                series={[
                    { name: "contribution", label: "Contribution", color: "blue" },
                    { name: "value", label: "Compound interest", color: "teal" },
                ]}
                curveType="linear"
                valueFormatter={(value) => {
                    return `${currency}${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)}`;
                }}
                xAxisLabel="Years"
                yAxisLabel={currency ? `Amount (${currency})` : "Amount"}
                yAxisProps={{ tickFormatter: (value) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value) }}
                referenceLines={goal ? [{ y: goal, label: "Goal", color: "violet.3" }] : []}
            />
        </>
    );
};
