import { createSystem, defaultConfig, defineConfig,mergeConfigs } from "@chakra-ui/react";

// Define custom configuration
const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        gray: {
          light: { value: "#616161" },
          dark: { value: "#1e1e1e" },
        },
      },
    },
    global: {
      body: {
        color: { value: { default: "gray.800", dark: "whiteAlpha.900" } },
        bg: { value: { default: "gray.100", dark: "#101010" } },
      },
    },
    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
  },
});

// Merge custom configuration with the default configuration
const extendedConfig = mergeConfigs(defaultConfig, customConfig);

// Create a custom system using the merged configuration
export const system = createSystem(extendedConfig);