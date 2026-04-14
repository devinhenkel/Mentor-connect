import { HomeClient } from "@/components/HomeClient";
import { genres, mentors } from "@/lib/data";

export default function HomePage() {
  return <HomeClient genres={genres} allMentors={mentors} />;
}
