import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const styles = {
  global: {
    "html, body, #root": {
      height: "100%",
    },
    body: {
      backgroundColor: "gray.900",
      color: "gray.100",
    },
  },
};

const fonts = {
  heading:
    'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"',
  body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"',
};

const radii = {
  sm: "10px",
  md: "14px",
  lg: "18px",
};

const shadows = {
  outline: "0 0 0 2px rgba(56, 189, 248, 0.4)",
  md: "0 10px 30px rgba(0,0,0,0.45)",
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
      fontWeight: "600",
    },
    variants: {
      solid: {
        bg: "teal.500",
        color: "white",
        _hover: { bg: "teal.600" },
        _active: { bg: "teal.700" },
      },
      outline: {
        borderColor: "gray.600",
        color: "gray.200",
        _hover: { bg: "gray.700", borderColor: "gray.500" },
      },
      ghost: {
        color: "gray.200",
        _hover: { bg: "gray.700" },
      },
      gradient: {
        bgGradient: "linear(to-r, teal.400, blue.400)",
        color: "white",
        _hover: { bgGradient: "linear(to-r, teal.500, blue.500)" },
      },
    },
  },
  Input: {
    variants: {
      filled: {
        field: {
          bg: "gray.700",
          color: "gray.100",
          _placeholder: { color: "gray.400" },
          _hover: { bg: "gray.700" },
          _focus: {
            bg: "gray.700",
            borderColor: "teal.400",
            boxShadow: "outline",
          },
        },
      },
    },
  },
  Tabs: {
    variants: {
      enclosed: {
        tab: {
          _selected: {
            bg: "gray.800",
            color: "teal.300",
            borderColor: "gray.700",
          },
        },
      },
    },
  },
  Menu: {
    baseStyle: {
      list: { bg: "gray.800", borderColor: "gray.700" },
      item: { _hover: { bg: "gray.700" } },
    },
  },
  Drawer: {
    baseStyle: {
      dialog: { bg: "gray.800" },
      header: { borderColor: "gray.700" },
    },
  },
  Modal: {
    baseStyle: {
      dialog: { bg: "gray.800" },
      header: { borderColor: "gray.700" },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: "rgba(17, 24, 39, 0.7)",
        backdropFilter: "blur(10px)",
        border: "1px solid",
        borderColor: "gray.700",
      },
    },
  },
};

const theme = extendTheme({
  config,
  styles,
  fonts,
  radii,
  shadows,
  components,
});

export default theme;
