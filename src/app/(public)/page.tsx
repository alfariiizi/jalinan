import CompassIcon from "@/components/svg/compass-icon";
import TrendingUpIcon from "@/components/svg/trending-up-icon";
import UserIcon from "@/components/svg/user-icon";
import UsersIcon from "@/components/svg/users-icon";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="relative h-[70vh] w-full bg-[url('/images/hero-image.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-white md:px-6">
          <h1 className="text-center text-4xl font-bold tracking-tight md:text-6xl">
            Jejalin <br /> Connect with the world
          </h1>
          <p className="mt-4 max-w-[600px] text-center text-lg md:text-xl">
            Discover new people, share your thoughts, and build meaningful
            connections on our social media platform.
          </p>
          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-background py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <UsersIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Diverse Community</h3>
              <p className="mt-2 text-muted-foreground">
                Connect with people from all walks of life and expand your
                social circle.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CompassIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">
                Discover New Interests
              </h3>
              <p className="mt-2 text-muted-foreground">
                Explore a wide range of topics and find new passions to pursue.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <TrendingUpIcon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Trending Content</h3>
              <p className="mt-2 text-muted-foreground">
                Stay up-to-date with the latest trends and conversations.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground">
              Hear from real people who have found success and fulfillment on
              our platform.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Jane Doe</h4>
                  <p className="text-sm text-muted-foreground">
                    Marketing Manager
                  </p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;I&apos;ve been using this platform for a year now and
                it&apos;s been a game-changer for my business. The connections
                I&apos;ve made and the insights I&apos;ve gained have been
                invaluable.&quot;
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">John Smith</h4>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;This platform has helped me connect with like-minded
                individuals and discover new opportunities. It&apos;s been a
                valuable resource for both my personal and professional
                growth.&quot;
              </p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Sarah Lee</h4>
                  <p className="text-sm text-muted-foreground">
                    Freelance Designer
                  </p>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;I&apos;ve been using this platform to showcase my work and
                connect with potential clients. The exposure and networking
                opportunities have been invaluable for my freelance
                business.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-t py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 sm:px-10 md:grid-cols-2 md:gap-16">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Join the Community
              </div>
              <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Unlock Your Social Potential
              </h2>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up Now
              </Link>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Why Jejalin?
              </div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Jejalin is the premier platform for building meaningful
                connections, sharing your passions, and unlocking new
                opportunities. Join our vibrant community and take your social
                presence to new heights.
              </p>
              <Link
                href="/learn-more"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
