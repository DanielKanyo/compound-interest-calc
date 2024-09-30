import { createTheme, Input } from "@mantine/core";

import inputClasses from "./input.module.css";

export const theme = createTheme({
    components: {
        Input: Input.extend({ classNames: inputClasses }),
        InputWrapper: Input.Wrapper.extend({ classNames: inputClasses }),
    },
});
