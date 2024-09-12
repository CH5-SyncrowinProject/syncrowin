import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";  // Import clsx for conditional class names

// Custom styles for SoftTypography
import SoftTypographyRoot from "components/SoftTypography/SoftTypographyRoot";

const SoftTypography = forwardRef(
  (
    { color, fontWeight, textTransform, verticalAlign, textGradient, opacity, children, ...rest },
    ref
  ) => (
    <SoftTypographyRoot
      {...rest}
      ref={ref}
      ownerState={{ color, textTransform, verticalAlign, fontWeight, opacity, textGradient }}
      className={clsx({
        'dark:text-white': color === 'dark' && !textGradient, // Apply Tailwind dark mode class
        'text-gray-900': color === 'dark' && !textGradient, // Light mode color
      })}
    >
      {children}
    </SoftTypographyRoot>
  )
);

SoftTypography.defaultProps = {
  color: "dark",
  fontWeight: "regular",
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

SoftTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
  ]),
  fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default SoftTypography;
