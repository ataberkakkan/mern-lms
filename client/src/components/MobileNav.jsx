import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import DarkMode from "./DarkMode";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const MobileNav = ({ user, handleLogout }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-row items-center w-full justify-between mt-2">
          <SheetTitle>E-Learning</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="my-3" />
        <nav className="flex flex-col items-start space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          {user?.role === "instructor" && (
            <SheetFooter>
              <SheetClose asChild>
                <Link to="/admin/dashboard">Dashboard</Link>
              </SheetClose>
            </SheetFooter>
          )}
        </nav>

        <Link asChild>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
