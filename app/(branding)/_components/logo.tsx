import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src={"/favicon-light.png"}
                width={40}
                height={30}
                alt={"logo"}
            />
            <p className={cn("font-semibold text-red-800", font.className)}>CoreNote</p>
        </div>
    );
}