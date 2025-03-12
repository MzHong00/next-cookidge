import { forwardRef, memo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errMsg?: string;
}

export const InputBox = memo(
  forwardRef<HTMLInputElement, Props>(
    ({ id, label, className, ...props }, ref) => {
      return (
        <div className={`${className} flex-column`}>
          {label && <label htmlFor={id}>{label}</label>}
          <input id={id} ref={ref} {...props} />
        </div>
      );
    }
  )
);
