import { Accordion, ScrollArea, Table } from "@mantine/core";

import { Monthly } from "../../Types/Monthly";
import { Yearly } from "../../Types/Yearly";
import "./Breakdown.css";

type BreakdownProps = {
    yearly: Yearly[];
    monthly: Monthly[];
    goal: number | string;
    currency: string;
    goalYear: number | null;
    goalMonth: number | null;
};

// Define the table headers outside of the component to prevent re-creation
const renderTableHeaders = (label: string, currency: string) => (
    <Table.Thead>
        <Table.Tr>
            <Table.Th ps={30}>{label}</Table.Th>
            <Table.Th ta="center">Contribution {currency ? `(${currency})` : ""}</Table.Th>
            <Table.Th ta="right" pe={30}>
                Value {currency ? `(${currency})` : ""}
            </Table.Th>
        </Table.Tr>
    </Table.Thead>
);

export const Breakdown = ({ yearly, monthly, goal, currency, goalYear, goalMonth }: BreakdownProps) => {
    // Define number formatters outside of map functions
    const compactFormatter = new Intl.NumberFormat("en-US", { notation: "compact" });
    const valueFormatter = new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 });

    const extendDataWithGoal = <T extends { contribution: number; value: number }>(
        data: T[],
        goalValue: number | null,
        goalKey: keyof T,
        goalCompareValue: number | null
    ): T[] => {
        if (goalCompareValue && goalValue) {
            const newData = [...data];
            const index = newData.findIndex((item) => Number(item[goalKey]) >= goalCompareValue);

            if (index > -1) {
                const newItem = {
                    ...newData[index - 1],
                    [goalKey]: goalCompareValue.toFixed(2),
                    value: Number(goalValue),
                };

                newData.splice(index, 0, newItem as T);
            }

            return newData;
        }

        return data;
    };

    const newYearly = extendDataWithGoal(yearly, Number(goal), "year", goalYear);
    const newMonthly = extendDataWithGoal(monthly, Number(goal), "month", goalMonth);

    const renderRows = <T extends { contribution: number; value: number }>(data: T[], labelKey: keyof T) =>
        data.map((d, i) => (
            <Table.Tr key={i} data-goal={Number(goal) && d.value === Number(goal)}>
                <Table.Td ps={30}>{String(d[labelKey])}</Table.Td>
                <Table.Td ta="center">{compactFormatter.format(d.contribution)}</Table.Td>
                <Table.Td ta="right" pe={30}>
                    {valueFormatter.format(d.value)}
                </Table.Td>
            </Table.Tr>
        ));

    return (
        <ScrollArea h="100vh">
            <Accordion variant="contained" radius="md" defaultValue="yearly" m="md">
                <Accordion.Item value="yearly">
                    <Accordion.Control>Yearly Breakdown</Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            {renderTableHeaders("Year", currency)}
                            <Table.Tbody>{renderRows(newYearly, "year")}</Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="monthly">
                    <Accordion.Control>Monthly Breakdown</Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            {renderTableHeaders("Month", currency)}
                            <Table.Tbody>{renderRows(newMonthly, "month")}</Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </ScrollArea>
    );
};
