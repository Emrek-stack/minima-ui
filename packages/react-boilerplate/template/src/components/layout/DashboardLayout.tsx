import { ReactNode, useState } from 'react'
import { 
  SidebarLeft, 
  TriangleRightMini, 
  XMark,
  MagnifyingGlass,
  CogSixTooth,
  House,
  Users,
  ShoppingCart,
  BuildingStorefront,
  Tag,
  SquaresPlus
} from '@minimaui/icons'
import { 
  IconButton, 
  Avatar, 
  Divider, 
  DropdownMenu, 
  Text, 
  clx,
  Button
} from '@minimaui/ui'
import { AnimatePresence } from 'motion/react'
import { Dialog as RadixDialog } from 'radix-ui'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider'
import { useTheme } from '../../providers/ThemeProvider'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showBar, setShowBar] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="relative flex h-screen flex-col items-start overflow-hidden lg:flex-row">
      <NavigationBar showBar={showBar} />
      <div>
        <MobileSidebarContainer 
          open={sidebarOpen} 
          onOpenChange={setSidebarOpen}
        >
          <MainSidebar />
        </MobileSidebarContainer>
        <DesktopSidebarContainer>
          <MainSidebar />
        </DesktopSidebarContainer>
      </div>
      <div className="flex h-screen w-full flex-col overflow-auto">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex h-full w-full flex-col items-center overflow-y-auto">
          <Gutter>
            {children}
          </Gutter>
        </main>
      </div>
    </div>
  )
}

const NavigationBar = ({ showBar }: { showBar: boolean }) => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1">
      <AnimatePresence>
        {showBar && (
          <div className="h-full w-full bg-ui-fg-interactive animate-pulse" />
        )}
      </AnimatePresence>
    </div>
  )
}

const Gutter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full max-w-[1600px] flex-col gap-y-2 p-3">
      {children}
    </div>
  )
}

const ToggleSidebar = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div>
      <IconButton
        className="hidden lg:flex"
        variant="transparent"
        onClick={onToggle}
        size="small"
      >
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
      <IconButton
        className="hidden max-lg:flex"
        variant="transparent"
        onClick={onToggle}
        size="small"
      >
        <SidebarLeft className="text-ui-fg-muted" />
      </IconButton>
    </div>
  )
}

const Topbar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <div className="grid w-full grid-cols-2 border-b p-3">
      <div className="flex items-center gap-x-1.5">
        <ToggleSidebar onToggle={onToggleSidebar} />
        <Breadcrumbs />
      </div>
      <div className="flex items-center justify-end gap-x-3">
        <ThemeToggle />
        <UserMenu />
      </div>
    </div>
  )
}

const Breadcrumbs = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)
  
  const breadcrumbLabels: Record<string, string> = {
    home: 'Ana Sayfa',
    settings: 'Ayarlar',
    users: 'Kullanıcılar',
    orders: 'Siparişler',
    products: 'Ürünler'
  }

  return (
    <ol className="text-ui-fg-muted txt-compact-small-plus flex select-none items-center">
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1
        const label = breadcrumbLabels[segment] || segment

        return (
          <li key={index} className="flex items-center">
            {!isLast ? (
              <Link
                className="transition-fg hover:text-ui-fg-subtle"
                to={`/${pathSegments.slice(0, index + 1).join('/')}`}
              >
                {label}
              </Link>
            ) : (
              <span>{label}</span>
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

const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="transparent" size="small">
          {resolvedTheme === 'dark' ? '🌙' : '☀️'}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => setTheme('light')}>
          ☀️ Açık Tema
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('dark')}>
          🌙 Koyu Tema
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setTheme('system')}>
          💻 Sistem Teması
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const UserMenu = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="transparent" size="small" className="gap-x-2">
          <Avatar size="xsmall" fallback={user.name.charAt(0).toUpperCase()} />
          <Text size="small">{user.name}</Text>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={handleLogout}>
          <div className="flex items-center gap-x-2">
            <span>Çıkış Yap</span>
          </div>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

const DesktopSidebarContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="hidden h-screen w-[220px] border-r lg:flex">
      {children}
    </div>
  )
}

const MobileSidebarContainer = ({ 
  children, 
  open, 
  onOpenChange 
}: { 
  children: ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void 
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-ui-bg-overlay fixed inset-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <RadixDialog.Content className="bg-ui-bg-subtle shadow-elevation-modal fixed inset-y-2 left-2 flex w-full max-w-[304px] flex-col overflow-hidden rounded-lg border-r data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 duration-200">
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
              Navigasyon Menüsü
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

const MainSidebar = () => {
  return (
    <aside className="flex flex-1 flex-col justify-between overflow-y-auto">
      <div className="flex flex-1 flex-col">
        <div className="bg-ui-bg-subtle sticky top-0">
          <Header />
          <div className="px-3">
            <Divider variant="dashed" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="flex flex-1 flex-col">
            <CoreRouteSection />
          </div>
          <UtilitySection />
        </div>
      </div>
    </aside>
  )
}

const Header = () => {
  const { user } = useAuth()
  
  if (!user) return null

  const fallback = user.name.charAt(0).toUpperCase()

  return (
    <div className="w-full p-3">
      <div className="bg-ui-bg-subtle transition-fg grid w-full grid-cols-[24px_1fr] items-center gap-x-3 rounded-md p-0.5 pr-2">
        <Avatar variant="squared" size="xsmall" fallback={fallback} />
        <div className="block overflow-hidden text-left">
          <Text
            size="small"
            weight="plus"
            leading="compact"
            className="truncate"
          >
            {user.name}
          </Text>
        </div>
      </div>
    </div>
  )
}

const Searchbar = () => {
  return (
    <div className="px-3">
      <button
        className="bg-ui-bg-subtle text-ui-fg-subtle flex w-full items-center gap-x-2.5 rounded-md px-2 py-1 outline-none hover:bg-ui-bg-subtle-hover focus-visible:shadow-borders-focus"
      >
        <MagnifyingGlass />
        <div className="flex-1 text-left">
          <Text size="small" leading="compact" weight="plus">
            Ara...
          </Text>
        </div>
        <Text size="small" leading="compact" className="text-ui-fg-muted">
          ⌘K
        </Text>
      </button>
    </div>
  )
}

const CoreRouteSection = () => {
  const location = useLocation()

  const routes = [
    {
      icon: <House />,
      label: 'Ana Sayfa',
      to: '/home',
    },
    {
      icon: <BuildingStorefront />,
      label: 'Ürünler',
      to: '/products',
    },
    {
      icon: <Tag />,
      label: 'Kategoriler',
      to: '/categories',
    },
    {
      icon: <ShoppingCart />,
      label: 'Siparişler',
      to: '/orders',
    },
    {
      icon: <Users />,
      label: 'Kullanıcılar',
      to: '/users',
    },
  ]

  return (
    <nav className="flex flex-col gap-y-1 py-3">
      <Searchbar />
      {routes.map((route) => {
        const isActive = location.pathname === route.to
        return (
          <Link
            key={route.to}
            to={route.to}
            className={clx(
              "flex items-center gap-x-3 rounded-md px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-ui-bg-interactive text-ui-fg-on-color"
                : "text-ui-fg-subtle hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base"
            )}
          >
            {route.icon}
            {route.label}
          </Link>
        )
      })}
    </nav>
  )
}

const UtilitySection = () => {
  const location = useLocation()
  const isActive = location.pathname === '/settings'

  return (
    <div className="flex flex-col gap-y-0.5 py-3">
      <Link
        to="/settings"
        className={clx(
          "flex items-center gap-x-3 rounded-md px-3 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-ui-bg-interactive text-ui-fg-on-color"
            : "text-ui-fg-subtle hover:bg-ui-bg-subtle-hover hover:text-ui-fg-base"
        )}
      >
        <CogSixTooth />
        Ayarlar
      </Link>
    </div>
  )
}
