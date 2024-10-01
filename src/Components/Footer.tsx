import { TwitterShareButton, FacebookShareButton } from "react-share";

import { ActionIcon, Flex, Group, ThemeIcon, Tooltip } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconArrowsMaximize, IconArrowsMinimize, IconBrandFacebook, IconBrandX } from "@tabler/icons-react";

import { HeaderActions } from "./HeaderActions";

type FooterProps = {
    currency: string;
    setCurrency: (value: string) => void;
    prefixChecked: boolean;
    setPrefixChecked: (value: boolean) => void;
    contributionColor: string;
    compInterestColor: string;
    setContributionColor: (value: string) => void;
    setCompInterestColor: (value: string) => void;
    isMobile: boolean | undefined;
};

export function Footer({
    currency,
    setCurrency,
    prefixChecked,
    setPrefixChecked,
    contributionColor,
    compInterestColor,
    setContributionColor,
    setCompInterestColor,
    isMobile,
}: FooterProps) {
    const { toggle, fullscreen } = useFullscreen();

    return (
        <Flex justify="space-between" align="center" direction="row" wrap="wrap" px="lg" h="100%">
            <Group gap="xs">
                <Tooltip label="Share on Facebook" color={compInterestColor} radius="md" withArrow>
                    <FacebookShareButton url={window.location.origin}>
                        <ThemeIcon variant="default" size="lg" radius="md">
                            <IconBrandFacebook size={20} stroke={1.5} />
                        </ThemeIcon>
                    </FacebookShareButton>
                </Tooltip>
                <Tooltip label="Share on X" color={compInterestColor} radius="md" withArrow>
                    <TwitterShareButton url={window.location.origin}>
                        <ThemeIcon variant="default" size="lg" radius="md">
                            <IconBrandX size={20} stroke={1.5} />
                        </ThemeIcon>
                    </TwitterShareButton>
                </Tooltip>
            </Group>
            <div>
                {isMobile && (
                    <HeaderActions
                        currency={currency}
                        setCurrency={setCurrency}
                        prefixChecked={prefixChecked}
                        setPrefixChecked={setPrefixChecked}
                        contributionColor={contributionColor}
                        compInterestColor={compInterestColor}
                        setContributionColor={setContributionColor}
                        setCompInterestColor={setCompInterestColor}
                    />
                )}
                {!isMobile && (
                    <Tooltip label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} color={compInterestColor} radius="md" withArrow>
                        <ActionIcon variant="default" size="lg" aria-label="full-screen" onClick={toggle} radius="md">
                            {fullscreen ? <IconArrowsMinimize size={20} stroke={1.5} /> : <IconArrowsMaximize size={20} stroke={1.5} />}
                        </ActionIcon>
                    </Tooltip>
                )}
            </div>
        </Flex>
    );
}
