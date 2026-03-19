import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Signin = () => {
  return (
    <div className="absolute inset-0 backdrop-blur-xs bg-black/40">
      <main className="relative flex min-h-screen justify-center items-center">
      <Card className="w-full dark max-w-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        
        <CardAction>
          <Button variant={"outline"}>Signup</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" placeholder="*******" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full hover:opacity-50">
          Sign Up
        </Button>
      </CardFooter>
    </Card>
    </main>
    </div>
  )
}

export default Signin