import { Card, NumberInput, Flex, Tooltip, rem, CopyButton, Button, Container } from "@mantine/core";
import {
    IconHourglassHigh,
    IconFlag,
    IconPigMoney,
    IconTrendingUp,
    IconTrendingDown,
    IconPlus,
    IconHandStop,
    IconTargetArrow,
    IconCopy,
    IconChecks,
} from "@tabler/icons-react";

type InputsProps = {
    initialInvestment: string | number;
    monthlyContribution: string | number;
    lengthOfTimeInYears: string | number;
    interestRate: string | number;
    inflationRate: string | number;
    increaseInAnnualContributions: string | number;
    endOfContributions: string | number;
    goal: string | number;
    currency: string;
    prefixChecked: boolean;
    compInterestColor: string;
    setInitialInvestment: (value: string | number) => void;
    setMonthlyContribution: (value: string | number) => void;
    setLengthOfTimeInYears: (value: string | number) => void;
    setInterestRate: (value: string | number) => void;
    setInflationRate: (value: string | number) => void;
    setIncreaseInAnnualContributions: (value: string | number) => void;
    setEndOfContributions: (value: string | number) => void;
    setGoal: (value: string | number) => void;
};

export const Inputs = ({
    initialInvestment,
    monthlyContribution,
    lengthOfTimeInYears,
    interestRate,
    inflationRate,
    increaseInAnnualContributions,
    endOfContributions,
    goal,
    currency,
    prefixChecked,
    compInterestColor,
    setInitialInvestment,
    setMonthlyContribution,
    setLengthOfTimeInYears,
    setInterestRate,
    setInflationRate,
    setIncreaseInAnnualContributions,
    setEndOfContributions,
    setGoal,
}: InputsProps) => {
    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder m="md">
                <Flex gap="md" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
                    <Tooltip
                        label='"Initial Investment" refers to the starting amount of money invested before any additional contributions or interest growth occurs in a compound interest calculation.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Initial Investment"
                            placeholder="Amount"
                            thousandSeparator=" "
                            withAsterisk
                            prefix={prefixChecked ? currency : ""}
                            suffix={prefixChecked ? "" : currency}
                            value={initialInvestment}
                            onChange={setInitialInvestment}
                            rightSection={<IconFlag style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"Monthly Contribution" refers to the fixed amount of money added to the investment each month, which accumulates alongside the compound interest over time.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Monthly Contribution"
                            placeholder="Amount"
                            thousandSeparator=" "
                            withAsterisk
                            prefix={prefixChecked ? currency : ""}
                            suffix={prefixChecked ? "" : currency}
                            value={monthlyContribution}
                            onChange={setMonthlyContribution}
                            rightSection={<IconPigMoney style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"Length of Time in Years" refers to the number of years an investment is allowed to grow with compound interest applied.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Length of Time in Years"
                            placeholder="Amount"
                            thousandSeparator=" "
                            withAsterisk
                            value={lengthOfTimeInYears}
                            onChange={setLengthOfTimeInYears}
                            rightSection={<IconHourglassHigh style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                            clampBehavior="strict"
                            max={100}
                            min={1}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"Interest Rate" refers to the percentage at which your investment grows annually due to earned interest, compounded over time in a compound interest calculation.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Interest Rate"
                            placeholder="Amount"
                            thousandSeparator=" "
                            withAsterisk
                            suffix="%"
                            defaultValue={8}
                            value={interestRate}
                            onChange={setInterestRate}
                            rightSection={<IconTrendingUp style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                            clampBehavior="strict"
                            max={50}
                            min={0}
                        />
                    </Tooltip>
                </Flex>
            </Card>
            <Card shadow="sm" padding="lg" radius="md" withBorder m="md">
                <Flex gap="md" justify="flex-start" align="flex-start" direction="column" wrap="wrap">
                    <Tooltip
                        label='"Inflation Rate" refers to the percentage increase in the general price level of goods and services over time, which can reduce the real value of returns in a compound interest investment.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Inflation Rate"
                            suffix="%"
                            placeholder="Amount"
                            thousandSeparator=" "
                            value={inflationRate}
                            onChange={setInflationRate}
                            rightSection={<IconTrendingDown style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                            clampBehavior="strict"
                            max={50}
                            min={0}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"Increase in Annual Contributions" refers to the additional amount added each year to the principal investment, which grows alongside the accumulated interest over time in a compound interest scenario.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Increase in Annual Contributions"
                            suffix="%"
                            placeholder="Amount"
                            thousandSeparator=" "
                            value={increaseInAnnualContributions}
                            onChange={setIncreaseInAnnualContributions}
                            rightSection={<IconPlus style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                            clampBehavior="strict"
                            max={100}
                            min={0}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"End of Contributions" refers to the point in time when additional investments or deposits into the account stop, while the existing balance may continue to grow with compound interest.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="End of Contributions"
                            placeholder="Year"
                            thousandSeparator=" "
                            value={endOfContributions}
                            onChange={setEndOfContributions}
                            rightSection={<IconHandStop style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                        />
                    </Tooltip>
                    <Tooltip
                        label='"Goal" refers to the target amount of money you aim to reach through investments and compound interest over a specified period.'
                        color={compInterestColor}
                        position="right"
                        withArrow
                        w={320}
                        multiline
                        radius="md"
                    >
                        <NumberInput
                            w="100%"
                            size="md"
                            radius="md"
                            label="Goal"
                            placeholder="Amount"
                            prefix={prefixChecked ? currency : ""}
                            suffix={prefixChecked ? "" : currency}
                            thousandSeparator=" "
                            value={goal}
                            onChange={setGoal}
                            rightSection={<IconTargetArrow style={{ width: rem(22), height: rem(22), marginRight: 8 }} stroke={1.5} />}
                        />
                    </Tooltip>
                </Flex>
            </Card>
            <Container m="md" p={0}>
                <CopyButton value={window.location.href}>
                    {({ copied, copy }) => (
                        <Tooltip
                            label={copied ? "Copied" : "Copy URL with Entered Parameters"}
                            color={compInterestColor}
                            withArrow
                            radius="md"
                        >
                            <Button color={compInterestColor} onClick={copy} fullWidth>
                                {copied ? (
                                    <IconChecks style={{ width: rem(20), height: rem(20) }} />
                                ) : (
                                    <IconCopy style={{ width: rem(20), height: rem(20) }} />
                                )}
                            </Button>
                        </Tooltip>
                    )}
                </CopyButton>
            </Container>
        </>
    );
};
