import { redirect } from "next/navigation";

// Login removed from the prototype — landing page handles role selection.
export default function Page() {
  redirect("/pemilik");
}
