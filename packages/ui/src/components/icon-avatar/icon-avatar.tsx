import * as React from "react"
import { clx } from "@/utils/clx"

export type IconAvatarProps = React.PropsWithChildren<{
  className?: string
  size?: "small" | "large" | "xlarge"
}>

/**
 * IconAvatar
 *
 * Use when an avatar needs to render an icon inside. Mirrors the behavior
 * from Medusa's admin but styled with Minima UI tokens.
 */
export const IconAvatar = ({
  size = "small",
  children,
  className,
}: IconAvatarProps) => {
  return (
    <div
      className={clx(
        "shadow-borders-base flex items-center justify-center",
        "[&>div]:bg-ui-bg-field [&>div]:text-ui-fg-subtle [&>div]:flex [&>div]:items-center [&>div]:justify-center",
        {
          "size-7 rounded-md [&>div]:size-6 [&>div]:rounded-[4px]": size === "small",
          "size-10 rounded-lg [&>div]:size-9 [&>div]:rounded-[6px]": size === "large",
          "size-12 rounded-xl [&>div]:size-11 [&>div]:rounded-[10px]": size === "xlarge",
        },
        className,
      )}
    >
      <div>{children}</div>
    </div>
  )
}

