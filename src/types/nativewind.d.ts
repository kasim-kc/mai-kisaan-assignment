import type { className } from "nativewind";

declare module "react-native" {
  interface ViewProps extends className {}
  interface TextProps extends className {}
  interface ImageProps extends className {}
  interface ScrollViewProps extends className {}
  interface TextInputProps extends className {}
  // Add other component props as needed
}
