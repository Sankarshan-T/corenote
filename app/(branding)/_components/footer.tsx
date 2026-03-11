import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-2 z-50 ">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant={"ghost"}>
                    Github Repository
                </Button>
                <Button variant={"ghost"}>
                    Slack
                </Button>
            </div>
        </div>
    );
};