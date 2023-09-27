import React from "react";
import cn from "../../../lib/utils/cn";

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const TextField = (props: TextFieldProps) => {
  const { className = "", ...rest } = props;

  return (
    <input
      {...rest}
      className={cn(
        "box-border disabled:bg-slate-200 disabled:border-slate-300 disabled:text-slate-300 disabled:placeholder:text-slate-300 h-[40px] rounded-[4px] border-[1px] border-slate-200 bg-slate-100 px-[15px] text-[15px] text-slate-700 outline-none transition-all duration-200 ease-in-out placeholder:text-slate-400 focus:border-blue-300 focus:bg-slate-50 focus:shadow-[0_0_0_1px_theme(colors.blue.300)]",
        className,
      )}
    />
  );
};

export default TextField;
