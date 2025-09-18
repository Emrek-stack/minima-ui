import { ReactNode } from 'react'
import { DropdownMenu, Button } from '@minimaui/ui'
import { EllipsisHorizontal } from '@minimaui/icons'

interface Action {
  label: string
  icon?: ReactNode
  onClick?: () => void
  to?: string
}

interface ActionGroup {
  actions: Action[]
}

interface ActionMenuProps {
  groups: ActionGroup[]
}

export const ActionMenu = ({ groups }: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="transparent" size="small">
          <EllipsisHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {groups.map((group, groupIndex) => (
          <div key={groupIndex}>
            {group.actions.map((action, actionIndex) => (
              <DropdownMenu.Item
                key={actionIndex}
                onClick={action.onClick}
                className="flex items-center gap-x-2"
              >
                {action.icon}
                {action.label}
              </DropdownMenu.Item>
            ))}
            {groupIndex < groups.length - 1 && <DropdownMenu.Separator />}
          </div>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
