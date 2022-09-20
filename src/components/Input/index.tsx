import { forwardRef, ComponentPropsWithoutRef } from 'react'

import styles from './input.module.css'

interface InputUncontrollerProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  name: string
  errorMesssage?: string
}


export const Input = forwardRef<HTMLInputElement, InputUncontrollerProps>(({ label, name, errorMesssage, ...props }: InputUncontrollerProps, ref) => {
  return (
    <div className={styles.inputContainer}>
      {
        !!label &&
        <label htmlFor={name} className={styles.label}>{label}</label>
      }

      <input
        className={!!errorMesssage ? styles.inputError : styles.input}
        ref={ref}
        id={name}
        name={name}
        {...props}
      />

      {!!errorMesssage && <p className={styles.error}>{errorMesssage}</p>}
    </div>
  )
})