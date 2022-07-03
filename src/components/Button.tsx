import React from "react";
import style from './Button.module.scss';

export const Button = ({children, ...props}: any) => {
    return (
        <button className={style.button} {...props}>{children}</button>
    )
}