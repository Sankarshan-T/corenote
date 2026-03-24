import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-2 z-50 ">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                ©️ Built with 💖 by @cool cream, 2026
                <Button variant={"ghost"}>
                    <Link href={"https://github.com/Sankarshan-T/corenote"}>
                        Github Repository
                    </Link>
                </Button>
                <Button variant={"ghost"}>
                    <Link href={"https://hackclub.enterprise.slack.com/team/U096RMRG03G"}>
                        Slack
                    </Link>
                </Button>
            </div>
        </div>
    );
};