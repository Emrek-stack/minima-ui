import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@minimaui/ui'
import { AuthProvider } from './providers/AuthProvider'
import { ThemeProvider } from './providers/ThemeProvider'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { HomePage } from './pages/HomePage'
import { SettingsPage } from './pages/SettingsPage'
import { CategoriesPage } from './pages/CategoriesPage'
import { ProductsPage } from './pages/ProductsPage'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-ui-bg-subtle">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/home" replace />} />
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/categories" element={<CategoriesPage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                    </Routes>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
