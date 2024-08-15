import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Form from "./_components/form";
import { AppLogoIcon } from "@/components/app-logo";

export default function page() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <AppLogoIcon className="w-[100px]" />
            <h1 className="text-3xl font-bold tracking-tighter">
              Connect with the world
            </h1>
            <p className="text-muted-foreground">
              Sign up and start sharing your life with friends and family.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <Form />
          </Card>
        </div>
      </main>
    </div>
  );
}
