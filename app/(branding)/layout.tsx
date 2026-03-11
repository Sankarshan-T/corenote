import { Navbar } from "./_components/navbar";

const BrandingLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <Navbar />
            <main className="h-full">
                {children}
            </main>
        </div>
    );
};

export default BrandingLayout;