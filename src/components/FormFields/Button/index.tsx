import React from "react";
import cn from "../../../lib/utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  const { className = "", ...rest } = props;

  return (
    <button
      {...rest}
      className={cn(
        "box-border min-w-fit flex items-center h-[40px] rounded-[4px] bg-blue-500 px-[25px] text-[13px] font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-600 hover:shadow-[0_0_0_2px_theme(colors.blue.300)] disabled:bg-slate-300 disabled:hover:shadow-none",
        className,
      )}
    ></button>
  );
};

export default Button;
