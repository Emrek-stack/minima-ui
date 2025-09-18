import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Heading, Hint, Input, Text } from "@minimaui/ui"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as z from "zod"
import { useAuth } from "../providers/AuthProvider"

const LoginSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
})

export function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const from = location.state?.from?.pathname || "/home"

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (error) {
      form.setError("root.serverError", {
        type: "manual",
        message: error instanceof Error ? error.message : "Bir hata oluştu",
      })
    }
  })

  const serverError = form.formState.errors?.root?.serverError?.message
  const validationError =
    form.formState.errors.email?.message ||
    form.formState.errors.password?.message

  return (
    <div className="bg-ui-bg-subtle flex min-h-dvh w-dvw items-center justify-center">
      <div className="m-4 flex w-full max-w-[280px] flex-col items-center">
        <div className="mb-6">
          <div className="bg-ui-bg-interactive flex h-12 w-12 items-center justify-center rounded-lg">
            <Text className="text-ui-fg-on-color text-xl font-bold">M</Text>
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center">
          <Heading>Giriş Yap</Heading>
          <Text size="small" className="text-ui-fg-subtle text-center">
            Hesabınıza giriş yapın
          </Text>
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-1">
              <div>
                <Input
                  autoComplete="email"
                  {...form.register("email")}
                  className="bg-ui-bg-field-component"
                  placeholder="Email"
                />
                {form.formState.errors.email && (
                  <Text size="small" className="text-ui-fg-error mt-1">
                    {form.formState.errors.email.message}
                  </Text>
                )}
              </div>
              <div>
                <Input
                  type="password"
                  autoComplete="current-password"
                  {...form.register("password")}
                  className="bg-ui-bg-field-component"
                  placeholder="Şifre"
                />
                {form.formState.errors.password && (
                  <Text size="small" className="text-ui-fg-error mt-1">
                    {form.formState.errors.password.message}
                  </Text>
                )}
              </div>
            </div>
            {validationError && (
              <div className="text-center">
                <Hint className="inline-flex" variant="error">
                  {validationError}
                </Hint>
              </div>
            )}
            {serverError && (
              <Alert
                className="bg-ui-bg-base items-center p-2"
                dismissible
                variant="error"
              >
                {serverError}
              </Alert>
            )}
            <Button className="w-full" type="submit" isLoading={isLoading}>
              Giriş Yap
            </Button>
          </form>
        </div>
        <div className="mt-6 text-center">
          <Text size="small" className="text-ui-fg-muted">
            Demo hesap: admin@example.com / password
          </Text>
        </div>
      </div>
    </div>
  )
}
