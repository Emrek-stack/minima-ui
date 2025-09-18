import {
  BellAlert,
  BellAlertDone,
  InformationCircleSolid,
} from "@minimaui/icons"
import { clx, Drawer, Heading, IconButton, Text } from "@minimaui/ui"
import { formatDistance } from "date-fns"
import { useEffect, useState } from "react"

interface NotificationData {
  title: string
  description?: string
  file?: {
    filename?: string
    url?: string
    mimeType?: string
  }
}

interface Notification {
  id: string
  title: string
  description?: string
  created_at: string
  data?: NotificationData
}

const LAST_READ_NOTIFICATION_KEY = "notificationsLastReadAt"

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Yeni sipariş alındı",
    description: "Sipariş #1234 başarıyla oluşturuldu.",
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
  },
  {
    id: "2",
    title: "Stok uyarısı",
    description: "Akıllı Telefon X ürününün stoku azalıyor.",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: "3",
    title: "Sistem güncellemesi",
    description: "Sistem başarıyla güncellendi.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
]

export const Notifications = () => {
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useUnreadNotifications()
  // This is used to show the unread icon on the notification when the drawer is open,
  // so it should lag behind the local storage data and should only be reset on close
  const [lastReadAt, setLastReadAt] = useState(
    localStorage.getItem(LAST_READ_NOTIFICATION_KEY)
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const handleOnOpen = (shouldOpen: boolean) => {
    if (shouldOpen) {
      setHasUnread(false)
      setOpen(true)
      localStorage.setItem(LAST_READ_NOTIFICATION_KEY, new Date().toISOString())
    } else {
      setOpen(false)
      setLastReadAt(localStorage.getItem(LAST_READ_NOTIFICATION_KEY))
    }
  }

  return (
    <Drawer open={open} onOpenChange={handleOnOpen}>
      <Drawer.Trigger asChild>
        <IconButton
          variant="transparent"
          size="small"
          className="text-ui-fg-muted hover:text-ui-fg-subtle"
        >
          {hasUnread ? <BellAlertDone /> : <BellAlert />}
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title asChild>
            <Heading>Bildirimler</Heading>
          </Drawer.Title>
          <Drawer.Description className="sr-only">
            Bildirimler listesi
          </Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className="overflow-y-auto px-0">
          {mockNotifications.length === 0 ? (
            <NotificationsEmptyState />
          ) : (
            mockNotifications.map((notification) => {
              return (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  unread={
                    Date.parse(notification.created_at) >
                    (lastReadAt ? Date.parse(lastReadAt) : 0)
                  }
                />
              )
            })
          )}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer>
  )
}

const NotificationItem = ({
  notification,
  unread,
}: {
  notification: Notification
  unread?: boolean
}) => {
  // const _data = notification.data

  // We need at least the title to render a notification in the feed
  if (!notification.title) {
    return null
  }

  return (
    <>
      <div className="relative flex items-start justify-center gap-3 border-b p-6">
        <div className="text-ui-fg-muted flex size-5 items-center justify-center">
          <InformationCircleSolid />
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <Text size="small" leading="compact" weight="plus">
                {notification.title}
              </Text>
              <div className="align-center flex items-center justify-center gap-2">
                <Text
                  as={"span"}
                  className={clx("text-ui-fg-subtle", {
                    "text-ui-fg-base": unread,
                  })}
                  size="small"
                  leading="compact"
                  weight="plus"
                >
                  {formatDistance(notification.created_at, new Date(), {
                    addSuffix: true,
                  })}
                </Text>
                {unread && (
                  <div
                    className="bg-ui-bg-interactive h-2 w-2 rounded"
                    role="status"
                  />
                )}
              </div>
            </div>
            {!!notification.description && (
              <Text
                className="text-ui-fg-subtle whitespace-pre-line"
                size="small"
              >
                {notification.description}
              </Text>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const NotificationsEmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <BellAlertDone />
      <Text size="small" leading="compact" weight="plus" className="mt-3">
        Henüz bildirim yok
      </Text>
      <Text
        size="small"
        className="text-ui-fg-muted mt-1 max-w-[294px] text-center"
      >
        Yeni bildirimler burada görünecek
      </Text>
    </div>
  )
}

const useUnreadNotifications = () => {
  const [hasUnread, setHasUnread] = useState(false)
  const lastNotification = mockNotifications?.[0]

  useEffect(() => {
    if (!lastNotification) {
      return
    }

    const lastNotificationAsTimestamp = Date.parse(lastNotification.created_at)

    const lastReadDatetime = localStorage.getItem(LAST_READ_NOTIFICATION_KEY)
    const lastReadAsTimestamp = lastReadDatetime
      ? Date.parse(lastReadDatetime)
      : 0

    if (lastNotificationAsTimestamp > lastReadAsTimestamp) {
      setHasUnread(true)
    }
  }, [lastNotification])

  return [hasUnread, setHasUnread] as const
}

