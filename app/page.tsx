import Feed from "@/components/Feed";
import News from "@/components/News";
import Sidebar from "@/components/Sidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {

  const userDetails = await currentUser();

  return (
    <div className="pt-20">
      <div className="max-w-6xl flex justify-between gap-8">
        <Sidebar user={userDetails}/>
        <Feed/>
        <News/>
      </div>
    </div>
  );
}
 