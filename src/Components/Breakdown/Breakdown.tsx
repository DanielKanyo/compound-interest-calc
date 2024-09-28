import { Accordion, ScrollArea, Table } from "@mantine/core";

import { Monthly } from "../../Types/Monthly";
import { Yearly } from "../../Types/Yearly";
import "./Breakdown.css";

type BreakdownProps = {
    yearly: Yearly[];
    monthly: Monthly[];
    goal: number | string;
    currency: string;
};

export const Breakdown = ({ yearly, monthly, goal, currency }: BreakdownProps) => {
    const ths = (
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Year</Table.Th>
                <Table.Th>Contribution {currency ? `(${currency})` : ""}</Table.Th>
                <Table.Th>Value {currency ? `(${currency})` : ""}</Table.Th>
            </Table.Tr>
        </Table.Thead>
    );

    const yearlyRows = yearly.map((d) => (
        <Table.Tr key={d.year} data-goal={Number(goal) && d.value >= Number(goal)}>
            <Table.Td>{d.year}</Table.Td>
            <Table.Td>{new Intl.NumberFormat("en-US", { notation: "compact" }).format(d.contribution)}</Table.Td>
            <Table.Td>{new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(d.value)}</Table.Td>
        </Table.Tr>
    ));

    const monthlyRows = monthly.map((d) => (
        <Table.Tr key={d.month} data-goal={Number(goal) && d.value >= Number(goal)}>
            <Table.Td>{d.month}</Table.Td>
            <Table.Td>{new Intl.NumberFormat("en-US", { notation: "compact" }).format(d.contribution)}</Table.Td>
            <Table.Td>{new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(d.value)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea h="100vh">
            <Accordion variant="contained" radius="md" defaultValue="yearly" m="md">
                <Accordion.Item value="yearly">
                    <Accordion.Control>Yearly Breakdown</Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            {ths}
                            <Table.Tbody>{yearlyRows}</Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="monthly">
                    <Accordion.Control>Monthly Breakdown</Accordion.Control>
                    <Accordion.Panel>
                        <Table>
                            {ths}
                            <Table.Tbody>{monthlyRows}</Table.Tbody>
                        </Table>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </ScrollArea>
    );
};
