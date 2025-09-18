import {
  BuildingStorefront,
  Buildings,
  ChevronDownMini,
  CogSixTooth,
  CurrencyDollar,
  EllipsisHorizontal,
  MagnifyingGlass,
  MinusMini,
  OpenRectArrowOut,
  ReceiptPercent,
  ShoppingCart,
  SquaresPlus,
  Tag,
  Users,
} from "@minimaui/icons"
import { Avatar, Divider, DropdownMenu, Text, clx } from "@minimaui/ui"
import { Collapsible as RadixCollapsible } from "radix-ui"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../providers/AuthProvider"
import { NavItem, INavItem } from "./NavItem"
import { UserMenu } from "./UserMenu"

export const MainSidebar = () => {
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
            <ExtensionRouteSection />
          </div>
          <UtilitySection />
        </div>
        <div className="bg-ui-bg-subtle sticky bottom-0">
          <UserSection />
        </div>
      </div>
    </aside>
  )
}

const Logout = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    logout()
    navigate("/login")
  }

  return (
    <DropdownMenu.Item onClick={handleLogout}>
      <div className="flex items-center gap-x-2">
        <OpenRectArrowOut className="text-ui-fg-subtle" />
        <span>Çıkış Yap</span>
      </div>
    </DropdownMenu.Item>
  )
}

const Header = () => {
  const { user } = useAuth()

  const name = user?.name || "Admin"
  const fallback = name?.slice(0, 1).toUpperCase()

  const isLoaded = !!user && !!name && !!fallback

  return (
    <div className="w-full p-3">
      <DropdownMenu>
        <DropdownMenu.Trigger
          disabled={!isLoaded}
          className={clx(
            "bg-ui-bg-subtle transition-fg grid w-full grid-cols-[24px_1fr_15px] items-center gap-x-3 rounded-md p-0.5 pr-2 outline-none",
            "hover:bg-ui-bg-subtle-hover",
            "data-[state=open]:bg-ui-bg-subtle-hover",
            "focus-visible:shadow-borders-focus"
          )}
        >
          {fallback ? (
            <Avatar variant="squared" size="xsmall" fallback={fallback} />
          ) : (
            <div className="h-6 w-6 rounded-md bg-gray-200" />
          )}
          <div className="block overflow-hidden text-left">
            {name ? (
              <Text
                size="small"
                weight="plus"
                leading="compact"
                className="truncate"
              >
                {name}
              </Text>
            ) : (
              <div className="h-[9px] w-[120px] bg-gray-200 rounded" />
            )}
          </div>
          <EllipsisHorizontal className="text-ui-fg-muted" />
        </DropdownMenu.Trigger>
        {isLoaded && (
          <DropdownMenu.Content className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0">
            <div className="flex items-center gap-x-3 px-2 py-1">
              <Avatar variant="squared" size="xsmall" fallback={fallback} />
              <div className="flex flex-col overflow-hidden">
                <Text
                  size="small"
                  weight="plus"
                  leading="compact"
                  className="truncate"
                >
                  {name}
                </Text>
                <Text
                  size="xsmall"
                  leading="compact"
                  className="text-ui-fg-subtle"
                >
                  Mağaza
                </Text>
              </div>
            </div>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-x-2" asChild>
              <Link to="/settings">
                <BuildingStorefront className="text-ui-fg-subtle" />
                Mağaza Ayarları
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <Logout />
          </DropdownMenu.Content>
        )}
      </DropdownMenu>
    </div>
  )
}

const useCoreRoutes = (): Omit<INavItem, "pathname">[] => {
  return [
    {
      icon: <ShoppingCart />,
      label: "Siparişler",
      to: "/orders",
      items: [
        // TODO: Enable when domain is introduced
        // {
        //   label: "Taslak Siparişler",
        //   to: "/draft-orders",
        // },
      ],
    },
    {
      icon: <Tag />,
      label: "Ürünler",
      to: "/products",
      items: [
        {
          label: "Koleksiyonlar",
          to: "/collections",
        },
        {
          label: "Kategoriler",
          to: "/categories",
        },
        // TODO: Enable when domain is introduced
        // {
        //   label: "Hediye Kartları",
        //   to: "/gift-cards",
        // },
      ],
    },
    {
      icon: <Buildings />,
      label: "Envanter",
      to: "/inventory",
      items: [
        {
          label: "Rezervasyonlar",
          to: "/reservations",
        },
      ],
    },
    {
      icon: <Users />,
      label: "Müşteriler",
      to: "/customers",
      items: [
        {
          label: "Müşteri Grupları",
          to: "/customer-groups",
        },
      ],
    },
    {
      icon: <ReceiptPercent />,
      label: "Promosyonlar",
      to: "/promotions",
      items: [
        {
          label: "Kampanyalar",
          to: "/campaigns",
        },
      ],
    },
    {
      icon: <CurrencyDollar />,
      label: "Fiyat Listeleri",
      to: "/price-lists",
    },
  ]
}

const Searchbar = () => {
  return (
    <div className="px-3">
      <button
        className={clx(
          "bg-ui-bg-subtle text-ui-fg-subtle flex w-full items-center gap-x-2.5 rounded-md px-2 py-1 outline-none",
          "hover:bg-ui-bg-subtle-hover",
          "focus-visible:shadow-borders-focus"
        )}
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
  const coreRoutes = useCoreRoutes()

  return (
    <nav className="flex flex-col gap-y-1 py-3">
      <Searchbar />
      {coreRoutes.map((route) => {
        return <NavItem key={route.to} {...route} />
      })}
    </nav>
  )
}

const ExtensionRouteSection = () => {
  // Mock extension menu items
  const menuItems: INavItem[] = []

  if (!menuItems.length) {
    return null
  }

  return (
    <div>
      <div className="px-3">
        <Divider variant="dashed" />
      </div>
      <div className="flex flex-col gap-y-1 py-3">
        <RadixCollapsible.Root defaultOpen>
          <div className="px-4">
            <RadixCollapsible.Trigger asChild className="group/trigger">
              <button className="text-ui-fg-subtle flex w-full items-center justify-between px-2">
                <Text size="xsmall" weight="plus" leading="compact">
                  Eklentiler
                </Text>
                <div className="text-ui-fg-muted">
                  <ChevronDownMini className="group-data-[state=open]/trigger:hidden" />
                  <MinusMini className="group-data-[state=closed]/trigger:hidden" />
                </div>
              </button>
            </RadixCollapsible.Trigger>
          </div>
          <RadixCollapsible.Content>
            <nav className="flex flex-col gap-y-0.5 py-1 pb-4">
              {menuItems.map((item, i) => {
                return (
                  <NavItem
                    key={i}
                    to={item.to}
                    label={item.label}
                    icon={item.icon ? item.icon : <SquaresPlus />}
                    items={item.items}
                    type="extension"
                  />
                )
              })}
            </nav>
          </RadixCollapsible.Content>
        </RadixCollapsible.Root>
      </div>
    </div>
  )
}

const UtilitySection = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col gap-y-0.5 py-3">
      <NavItem
        label="Ayarlar"
        to="/settings"
        from={location.pathname}
        icon={<CogSixTooth />}
        type="setting"
      />
    </div>
  )
}

const UserSection = () => {
  return (
    <div>
      <div className="px-3">
        <Divider variant="dashed" />
      </div>
      <UserMenu />
    </div>
  )
}

