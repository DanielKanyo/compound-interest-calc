import { AreaChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Avatar, Card, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import { IconPigMoney, IconTrendingUp } from "@tabler/icons-react";

import { Yearly } from "../Types/Yearly";

type ChartAreaProps = {
    yearly: Yearly[];
    goal: number | string;
};

export const ChartArea = ({ yearly, goal }: ChartAreaProps) => {
    const totalSavings = yearly.length ? yearly[yearly.length - 1].value : 0;
    const totalContributions = yearly.length ? yearly[yearly.length - 1].contribution : 0;

    return (
        <>
            <Group gap="md" mb="xs">
                <Card shadow="sm" pt={20} pb={12} px="lg" radius="md" bg="teal">
                    <Flex gap="lg">
                        <Flex align="center">
                            <Avatar variant="filled" radius="md" size={60} mt={-10} color="teal.9">
                                <IconTrendingUp size="2rem" />
                            </Avatar>
                        </Flex>
                        <Flex direction="column" me={5}>
                            <Text c="gray.3">Total Savings</Text>
                            <Text fz={36} c="white" mt={-4}>
                                <NumberFormatter value={totalSavings} thousandSeparator=" " decimalScale={0} />
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
                <Card shadow="sm" pt={20} pb={12} px="lg" radius="md" bg="blue">
                    <Flex gap="lg">
                        <Flex align="center">
                            <Avatar variant="filled" radius="md" size={60} mt={-10} color="blue.9">
                                <IconPigMoney size="2rem" />
                            </Avatar>
                        </Flex>
                        <Flex direction="column" me={5}>
                            <Text c="gray.3">Total Contributions</Text>
                            <Text fz={36} c="white" mt={-4}>
                                <NumberFormatter value={totalContributions} thousandSeparator=" " decimalScale={0} />
                            </Text>
                        </Flex>
                    </Flex>
                </Card>
            </Group>
            <AreaChart
                h="calc(100vh - 271px)"
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
