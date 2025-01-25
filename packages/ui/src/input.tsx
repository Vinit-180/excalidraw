import React from "react";

const Input=React.forwardRef<HTMLInputElement,React.ComponentProps<"input">>(({className,type,id,...props},ref)=>{
    return (
        <input type={type} 
        id={id}
        className={`
            ${className}
          )`}
          ref={ref}
          {...props}
        />
    )
}
)
Input.displayName="Input"
export {Input}