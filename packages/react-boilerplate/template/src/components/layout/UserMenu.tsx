import { OpenRectArrowOut, SquaresPlus } from "@minimaui/icons"
import { Avatar, Button, DropdownMenu, Text } from "@minimaui/ui"
import { useAuth } from "../../providers/AuthProvider"

export const UserMenu = () => {
  const { logout } = useAuth()

  return (
    <div className="p-3">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <Button variant="secondary" className="w-full justify-between">
            <div className="flex items-center gap-x-2">
              <Avatar variant="squared" size="xsmall" fallback="AD" />
              <Text size="small" weight="plus" leading="compact">
                Admin
              </Text>
            </div>
            <SquaresPlus className="text-ui-fg-muted" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-0">
          <DropdownMenu.Item onClick={logout}>
            <div className="flex items-center gap-x-2">
              <OpenRectArrowOut className="text-ui-fg-subtle" />
              <span>Çıkış Yap</span>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  )
}

