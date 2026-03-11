import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";

const BrandingPage = () => {
    return (
        <div className="min-h-full flex flex-col bg-red-50">
            <div className="flex flex-col items-center justify-center text-center gap-y-8 flex-1 px-6 pb-10">
                <Heading />
            </div>
            <Footer />
        </div>
    );

}

export default BrandingPage;