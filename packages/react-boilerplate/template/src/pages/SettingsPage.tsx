import { Heading, Text, Container, Button, Input, Label, Switch, Select } from "@minimaui/ui"
import { useTheme } from "../providers/ThemeProvider"
import { useState } from "react"

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <Heading level="h1">Ayarlar</Heading>
        <Text className="text-ui-fg-subtle">
          Uygulama ayarlarınızı buradan yönetebilirsiniz.
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Appearance Settings */}
        <Container className="p-6">
          <Heading level="h2" className="mb-4">
            Görünüm
          </Heading>
          <div className="space-y-4">
            <div>
              <Label htmlFor="theme">Tema</Label>
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as any)}
              >
                <Select.Trigger>
                  <Select.Value placeholder="Tema seçin" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="light">Açık Tema</Select.Item>
                  <Select.Item value="dark">Koyu Tema</Select.Item>
                  <Select.Item value="system">Sistem Teması</Select.Item>
                </Select.Content>
              </Select>
            </div>
          </div>
        </Container>

        {/* Notification Settings */}
        <Container className="p-6">
          <Heading level="h2" className="mb-4">
            Bildirimler
          </Heading>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Bildirimleri</Label>
                <Text size="small" className="text-ui-fg-subtle">
                  Yeni siparişler ve güncellemeler için bildirim al
                </Text>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Güncellemeleri</Label>
                <Text size="small" className="text-ui-fg-subtle">
                  Haftalık raporlar ve önemli güncellemeler
                </Text>
              </div>
              <Switch
                checked={emailUpdates}
                onCheckedChange={setEmailUpdates}
              />
            </div>
          </div>
        </Container>

        {/* Profile Settings */}
        <Container className="p-6">
          <Heading level="h2" className="mb-4">
            Profil Bilgileri
          </Heading>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Ad Soyad</Label>
              <Input id="name" placeholder="Adınızı girin" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Email adresinizi girin" />
            </div>
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" placeholder="Telefon numaranızı girin" />
            </div>
            <Button>Değişiklikleri Kaydet</Button>
          </div>
        </Container>

        {/* Security Settings */}
        <Container className="p-6">
          <Heading level="h2" className="mb-4">
            Güvenlik
          </Heading>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-password">Mevcut Şifre</Label>
              <Input id="current-password" type="password" />
            </div>
            <div>
              <Label htmlFor="new-password">Yeni Şifre</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Şifreyi Onayla</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button variant="secondary">Şifreyi Güncelle</Button>
          </div>
        </Container>
      </div>

      {/* Danger Zone */}
      <Container className="p-6 border-ui-border-error">
        <Heading level="h2" className="mb-4 text-ui-fg-error">
          Tehlikeli Bölge
        </Heading>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text weight="plus">Hesabı Sil</Text>
              <Text size="small" className="text-ui-fg-subtle">
                Hesabınızı kalıcı olarak silin. Bu işlem geri alınamaz.
              </Text>
            </div>
            <Button variant="danger">Hesabı Sil</Button>
          </div>
        </div>
        </Container>
    </div>
  )
}
