import Footer from "./footer/Footer";
import Header from "./header/Header";

interface TemplateProps {
    children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
    return (
        <>
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </>
    )
}