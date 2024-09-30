import { Accordion, createTheme, Input } from "@mantine/core";

import accordionClasses from "./accordion.module.css";
import inputClasses from "./input.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
        Accordion: Accordion.extend({ classNames: accordionClasses }),
    },
});
