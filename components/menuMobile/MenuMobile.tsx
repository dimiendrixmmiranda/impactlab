import { Menu } from "@/types/Menu";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { FaCube, FaUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineDashboard, MdOutlinePlayCircle } from "react-icons/md";

interface MenuMobileProps {
    menuAtivo: Menu
    setMenuAtivo: Dispatch<SetStateAction<Menu>>;
}

export default function MenuMobile({ setMenuAtivo, menuAtivo }: MenuMobileProps) {

    function getMenuClass(menu: Menu) {
        return `
        flex justify-center items-center gap-1 text-3xl w-full px-4 py-3
        transition-all duration-300
        cursor-pointer
        text-shadow-[1px_1px_2px_black]
       
        ${menuAtivo === menu
                ? 'bg-laranja-impacto text-white'
                : 'hover:bg-zinc-800  bg-zinc-900'
            }
    `;
    }
    return (
        <div className="fixed bottom-0 bg-laranja-impacto w-full grid grid-cols-5 xl:hidden z-[999]">
            <button
                onClick={() => setMenuAtivo('dashboard')}
                className={getMenuClass('dashboard')}
            >
                <MdOutlineDashboard className="drop-shadow-[1px_1px_2px_black]"/>
            </button>
            <button
                onClick={() => setMenuAtivo('simulacoes')}
                className={getMenuClass('simulacoes')}
            >
                <MdOutlinePlayCircle className="drop-shadow-[1px_1px_2px_black]"/>
            </button>
            <button
                onClick={() => setMenuAtivo('dados')}
                className={getMenuClass('dados')}
            >
                <FaCube className="drop-shadow-[1px_1px_2px_black]"/>
            </button>
            <button
                onClick={() => setMenuAtivo('relatorios')}
                className={getMenuClass('relatorios')}
            >
                <IoDocumentTextOutline className="drop-shadow-[1px_1px_2px_black]"/>
            </button>
            <button
                onClick={() => setMenuAtivo('perfil')}
                className={getMenuClass('perfil')}
            >
                <FaUser className="drop-shadow-[1px_1px_2px_black]"/>
            </button>
        </div>
    )
}