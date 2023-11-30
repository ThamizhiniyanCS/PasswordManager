import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <p className="text-primary text-4xl">404 - NOT FOUND</p>
      <p className="text-xl my-4">Could not find requested resource</p>

      <div className="flex">
        <Link href="/">
          <Button
            variant="default"
            className="w-14 h-14 lg:w-32 lg:h-32 flex flex-col justify-center items-center text-white rounded-l-full hover:mr-4"
          >
            <span className="material-symbols-outlined">home</span>
            Home
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button
            variant="default"
            className="w-14 h-14 lg:w-32 lg:h-32 flex flex-col justify-center items-center text-white hover:mx-4 rounded-none"
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Button>
        </Link>
        <Link href="/login">
          <Button
            variant="default"
            className="w-14 h-14 lg:w-32 lg:h-32 flex flex-col justify-center items-center text-white hover:mx-4 rounded-none"
          >
            <span className="material-symbols-outlined">login</span>
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="default"
            className="w-14 h-14 lg:w-32 lg:h-32 flex flex-col justify-center items-center text-white rounded-r-full hover:ml-4"
          >
            <span className="material-symbols-outlined">app_registration</span>
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
}

// headersList.entries()
// host: localhost:3000
// connection: keep-alive
// pragma: no-cache
// cache-control: no-cache
// sec-ch-ua: "Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"
// sec-ch-ua-mobile: ?0
// sec-ch-ua-platform: "Linux"
// upgrade-insecure-requests: 1
// user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36
// accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
// sec-fetch-site: same-origin
// sec-fetch-mode: navigate
// sec-fetch-dest: document
// referer: http://localhost:3000/login
// accept-encoding: gzip, deflate, br
// accept-language: en-GB,en-US;q=0.9,en;q=0.8
// x-forwarded-host: localhost:3000
// x-forwarded-port: 3000
// x-forwarded-proto: http
// x-forwarded-for: ::1
