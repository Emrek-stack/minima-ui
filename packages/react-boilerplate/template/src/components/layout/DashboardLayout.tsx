import { SidebarLeft, TriangleRightMini, XMark } from "@minimaui/icons"
import { IconButton, clx } from "@minimaui/ui"
import { AnimatePresence } from "motion/react"
import { Dialog as RadixDialog } from "radix-ui"
import { PropsWithChildren, useEffect, useState } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"

import { useSidebar } from "../../hooks/useSidebar"
import { ProgressBar } from "../common/ProgressBar"
import { Notifications } from "./Notifications"
import { MainSidebar } from "./MainSidebar"

export const DashboardLayout = ({ children: _children }: PropsWithChildren) => {
  const navigation = { state: "idle" } // Mock navigation state
  const loading = navigation.state === "loading"

  return (
    <div className="relative flex h-screen flex-col items-start overflow-hidden lg:flex-row">
      <NavigationBar loading={loading} />
      <div>
        <MobileSidebarContainer>
          <MainSidebar />
        </MobileSidebarContainer>
        <DesktopSidebarContainer>
          <MainSidebar />
        </DesktopSidebarContainer>
      </div>
      <div className="flex h-screen w-full flex-col overflow-auto">
        <Topbar />
        <main
          className={clx(
            "flex h-full w-full flex-col items-center overflow-y-auto transition-opacity delay-200 duration-200",
            {
              "opacity-25": loading,
            }
          )}
        >
          <Gutter>
            <Outlet />
          </Gutter>
        </main>
      </div>
    </div>
  )
}

const NavigationBar = ({ loading }: { loading: boolean }) => {
  const [showBar, setShowBar] = useState(false)

  /**
   * If the loading state is true, we want to show the bar after a short delay.
   * The delay is used to prevent the bar from flashing on quick navigations.
   */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (loading) {
      timeout = setTimeout(() => {
        setShowBar(true)
      }, 200)
    } else {
      setShowBar(false)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1">
      <AnimatePresence>{showBar ? <ProgressBar /> : null}</AnimatePresence>
    </div>
  )
}

const Gutter = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex w-full max-w-[1600px] flex-col gap-y-2 p-3">
      {children}
    </div>
  )
}

const Breadcrumbs = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter((x) => x)

  return (
    <ol
      className={clx(
        "text-ui-fg-muted txt-compact-small-plus flex select-none items-center"
      )}
    >
      <li className="flex items-center">
        <Link
          className="transition-fg hover:text-ui-fg-subtle"
          to="/"
        >
          Ana Sayfa
        </Link>
        {pathnames.length > 0 && (
          <span className="mx-2">
            <TriangleRightMini />
          </span>
        )}
      </li>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return (
          <li key={name} className={clx("flex items-center")}>
            {!isLast ? (
              <Link
                className="transition-fg hover:text-ui-fg-subtle"
                to={routeTo}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
            ) : (
              <span
                key={index}
                className={clx({
                  "hidden lg:block": pathnames.length > 1,
                })}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            )}
            {!isLast && (
              <span className="mx-2">
                <TriangleRightMini />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

const ToggleSidebar = () => {
  const { toggle } = useSidebar()

  return (
    <div>
      <IconButton
        className="hidden lg:flex"
        variant="transparent"
        onClick={() => toggle("desktop")}
        size="small"
      >
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
      <IconButton
        className="hidden max-lg:flex"
        variant="transparent"
        onClick={() => toggle("mobile")}
        size="small"
      >
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
    </div>
  )
}

const Topbar = () => {
  return (
    <div className="grid w-full grid-cols-2 border-b p-3">
      <div className="flex items-center gap-x-1.5">
        <ToggleSidebar />
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-end gap-x-3">
        <Notifications />
      </div>
    </div>
  )
}

const DesktopSidebarContainer = ({ children }: PropsWithChildren) => {
  const { desktop } = useSidebar()

  return (
    <div
      className={clx("hidden h-screen w-[220px] border-r", {
        "lg:flex": desktop,
      })}
    >
      {children}
    </div>
  )
}

const MobileSidebarContainer = ({ children }: PropsWithChildren) => {
  const { mobile, toggle } = useSidebar()

  return (
    <RadixDialog.Root open={mobile} onOpenChange={() => toggle("mobile")}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className={clx(
            "bg-ui-bg-overlay fixed inset-0",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
        <RadixDialog.Content
          className={clx(
            "bg-ui-bg-subtle shadow-elevation-modal fixed inset-y-2 left-2 flex w-full max-w-[304px] flex-col overflow-hidden rounded-lg border-r",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-200"
          )}
        >
          <div className="p-3">
            <RadixDialog.Close asChild>
              <IconButton
                size="small"
                variant="transparent"
                className="text-ui-fg-subtle"
              >
                <XMark />
              </IconButton>
            </RadixDialog.Close>
            <RadixDialog.Title className="sr-only">
              Navigasyon
            </RadixDialog.Title>
            <RadixDialog.Description className="sr-only">
              Ana navigasyon menüsü
            </RadixDialog.Description>
          </div>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}