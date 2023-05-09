import React from "react"

type TextOwnProps<E extends React.ElementType> = {
  children?: React.ReactNode
  as?: E
}

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>

const Text = <E extends React.ElementType>({
  children,
  as,
  ...args
}: TextProps<E>) => {
  console.log(args)

  const Component = as || "div"
  return <Component {...args}>{children}</Component>
}

export default Text

interface Sapi {
  as?: string
}

const Sapi = ({ as }: Sapi) => {
  const Component = as || ("div" as React.ElementType)
  return <Component>x</Component>
}
