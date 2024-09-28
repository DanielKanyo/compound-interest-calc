import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconArrowsMaximize, IconArrowsMinimize } from "@tabler/icons-react";

export function Footer() {
    const { toggle, fullscreen } = useFullscreen();

    return (
        <Flex gap={10} justify="flex-end" align="center" direction="row" wrap="wrap" px="lg" h="100%">
            <Tooltip label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"} color="gray" radius="md">
                <ActionIcon variant="default" size="lg" aria-label="full-screen" onClick={toggle} radius="md">
                    {fullscreen ? <IconArrowsMinimize size={16} /> : <IconArrowsMaximize size={16} />}
                </ActionIcon>
            </Tooltip>
        </Flex>
    );
}
