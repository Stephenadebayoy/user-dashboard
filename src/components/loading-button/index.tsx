/** @format */

import React from "react";
import classNames from "classnames";
import { Button } from "../../../packages";
import StarLoader from "../star-loader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "unstyled"
    | null
    | undefined;
  loadingText?: string;
  noStyle?: boolean;
  loadingClass?: string;
}

export const LoadingButton: React.FC<ButtonProps> = ({
  loading,
  children,
  className,
  variant = "default",
  loadingText,
  noStyle = false,
  loadingClass,
  ...props
}) => {
  return (
    <Button
      className={classNames(
        `${
          noStyle
            ? ""
            : "w-full h-9 text-sm  shadow-none flex justify-center items-center"
        } `,
        className
      )}
      disabled={loading}
      {...props}
      variant={variant}
    >
      {loading ? (
        <div
          data-testid="loading-wrapper"
          className={`${loadingClass} flex items-center`}
        >
          <section className="mr-2">
            <StarLoader />
          </section>

          {loadingText ? loadingText : "Please wait..."}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
