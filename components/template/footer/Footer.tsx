import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="lg:grid lg:grid-cols-4">
            <div>
                <Link href={'/'}>
                    <div className="relative w-[300px] h-[250px]">
                        <Image alt="Logo da ImpactLab" src={'/logo/logo.png'} fill className="object-cover" />
                    </div>
                </Link>
            </div>
        </footer>
    )
}