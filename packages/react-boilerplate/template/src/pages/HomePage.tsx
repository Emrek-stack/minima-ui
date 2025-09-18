import { Heading, Text, Container, Badge, Button } from "@minimaui/ui"
import { ShoppingCart, Users, BuildingStorefront, ChartBar, Tag } from "@minimaui/icons"
import { Link } from "react-router-dom"

export function HomePage() {
  const stats = [
    {
      title: "Toplam Sipariş",
      value: "1,234",
      change: "+12%",
      icon: <ShoppingCart className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Kullanıcılar",
      value: "5,678",
      change: "+8%",
      icon: <Users className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      title: "Ürünler",
      value: "890",
      change: "+5%",
      icon: <BuildingStorefront className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      title: "Gelir",
      value: "₺45,678",
      change: "+15%",
      icon: <ChartBar className="h-5 w-5" />,
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <Heading level="h1">Dashboard</Heading>
        <Text className="text-ui-fg-subtle">
          Hoş geldiniz! İşte genel bakışınız.
        </Text>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Container key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Text size="small" className="text-ui-fg-subtle">
                  {stat.title}
                </Text>
                <Text size="large" weight="plus" className="mt-1">
                  {stat.value}
                </Text>
                <div className="mt-2 flex items-center gap-x-1">
                  <Badge size="small">
                    {stat.change}
                  </Badge>
                  <Text size="small" className="text-ui-fg-subtle">
                    geçen aya göre
                  </Text>
                </div>
              </div>
              <div className={`${stat.color} flex h-12 w-12 items-center justify-center rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </Container>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Container className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Heading level="h2">
              Son Siparişler
            </Heading>
            <Button variant="transparent" size="small">
              Tümünü Gör
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { id: "#1234", customer: "Ahmet Yılmaz", amount: "₺245", status: "Tamamlandı" },
              { id: "#1235", customer: "Ayşe Demir", amount: "₺189", status: "Beklemede" },
              { id: "#1236", customer: "Mehmet Kaya", amount: "₺456", status: "Kargoda" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-ui-border-base pb-3 last:border-b-0">
                <div>
                  <Text size="small" weight="plus">
                    {order.id}
                  </Text>
                  <Text size="small" className="text-ui-fg-subtle">
                    {order.customer}
                  </Text>
                </div>
                <div className="text-right">
                  <Text size="small" weight="plus">
                    {order.amount}
                  </Text>
                  <Badge 
                    size="small"
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Container>

        <Container className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <Heading level="h2">
              Hızlı İşlemler
            </Heading>
          </div>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="secondary" asChild>
              <Link to="/products">
                <BuildingStorefront className="mr-2 h-4 w-4" />
                Ürünleri Görüntüle
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="secondary" asChild>
              <Link to="/categories">
                <Tag className="mr-2 h-4 w-4" />
                Kategorileri Görüntüle
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Yeni Sipariş Oluştur
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <Users className="mr-2 h-4 w-4" />
              Kullanıcı Ekle
            </Button>
            <Button className="w-full justify-start" variant="secondary">
              <ChartBar className="mr-2 h-4 w-4" />
              Rapor Görüntüle
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}
