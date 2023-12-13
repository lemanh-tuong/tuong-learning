import { useLoaderData } from "@remix-run/react";
import electron from "~/electron.server";
import { QrScanner } from "@yudiel/react-qr-scanner";

export function loader() {
  return {
    userDataPath: electron.app.getPath("userData"),
  };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (typeof window === "undefined") {
    return null;
  }
  return (
    <main>
      <QrScanner
        onDecode={(result) => console.log(result)}
        onError={(error) => console.log(error?.message)}
      />
      <h1>Welcome to Remix</h1>
      <p>User data path: {data.userDataPath}</p>
    </main>
  );
}
