import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Avatar, Card, Flex, Group, Text } from "@mantine/core";
import { IconCoins, IconPigMoney, IconTrendingUp } from "@tabler/icons-react";

import { Yearly } from "../Types/Yearly";

type ChartAreaProps = {
    yearly: Yearly[];
    goal: number | string;
};

type StatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
    <Card shadow="sm" pt={16} pb={8} px="lg" radius="md" bg={color}>
        <Flex gap="lg">
            <Flex align="center">
                <Avatar variant="filled" radius="md" size={55} mt={-10} color={`${color}.9`}>
                    <Icon size="2rem" />
                </Avatar>
            </Flex>
            <Flex direction="column" me={5}>
                <Text c="gray.3">{title}</Text>
                <Text fz={32} c="white" mt={-4}>
                    {new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)}
                </Text>
            </Flex>
        </Flex>
    </Card>
);

export const ChartArea = ({ yearly, goal }: ChartAreaProps) => {
    const totalSavings = yearly.length ? yearly[yearly.length - 1].value : 0;
    const totalContributions = yearly.length ? yearly[yearly.length - 1].contribution : 0;

    return (
        <>
            <Group gap="md" mb="xs" grow>
                <StatCard title="Total Savings" value={totalSavings} icon={IconTrendingUp} color="teal" />
                <StatCard title="Total Contributions" value={totalContributions} icon={IconPigMoney} color="blue" />
                <StatCard title="Total Interest" value={totalSavings - totalContributions} icon={IconCoins} color="gray" />
            </Group>
            <AreaChart
                h="calc(100vh - 256px)"
                data={yearly}
                withLegend
                tickLine="xy"
                dataKey="year"
                series={[
                    { name: "contribution", label: "Contribution", color: "blue" },
                    { name: "value", label: "Compound interest", color: "teal" },
                ]}
                curveType="linear"
                valueFormatter={(value) => new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(value)}
                xAxisLabel="Years"
                yAxisLabel="Amount"
                yAxisProps={{ tickFormatter: (value) => new Intl.NumberFormat("en-US", { notation: "compact" }).format(value) }}
                referenceLines={goal ? [{ y: goal, label: "Goal" }] : []}
            />
        </>
    );
};
