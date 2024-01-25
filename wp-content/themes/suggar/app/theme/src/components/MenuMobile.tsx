import { useCallback, useEffect, useState } from "react";
import { getShopInfos } from "../util/Api";
import { SiteInfoMain } from "../@types/Infos";
import { Menu, X } from "lucide-react";

export function MenuMobile() {
    const [infos, setInfos] = useState<SiteInfoMain | null>(null);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const getInfos = useCallback(async () => {
        try {
            const infos = await getShopInfos();

            infos && setInfos(infos);
        } catch (error) {
            console.log(`Erro ao pegar informações do site`, error);
        }
    }, []);

    useEffect(() => {
        getInfos();
    }, [getInfos]);

    return (
        <div className="h-[12px] flex xl:hidden mr-2 items-center text-neutral-700 text-sm font-medium font-pop uppercase">
            <span onClick={() => setMenuOpen(!menuOpen)} className="w-[20]">
                <Menu size={16} className="text-blue-900" />
            </span>
            MENU
            <div
                data-open={menuOpen}
                className="fixed top-0 data-[open=false]:hidden left-0 w-full h-full bg-black bg-opacity-60 z-10"
            >
                <div className="w-full text-center h-[50px] bg-white bg-opacity-60 text-black font-pop text-sm flex items-center justify-center relative">
                    MENU
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="absolute right-0 top-0 w-11 h-[50px] bg-blue-900 justify-center items-center flex"
                    >
                        <X size={35} className="text-white" />
                    </button>
                </div>
                <ul className="bg-white h-full flex flex-col px-4 text-xs xl:text-sm font-semibold text-start font-pop uppercase relative">
                    {infos &&
                        infos.menus &&
                        Object.entries(infos.menus).map(([, menuItems]) => (
                            <>
                                {menuItems.map((m, k) => (
                                    <li
                                        className={`px-5 py-3 border-b border-zinc-100 ${
                                            k === menuItems.length - 1 &&
                                            `hidden`
                                        }`}
                                        key={k}
                                    >
                                        <a
                                            className={`p-2 relative ${
                                                k === menuItems.length - 1
                                                    ? `text-white`
                                                    : `text-neutral-700`
                                            }`}
                                            href={m.url}
                                            onMouseEnter={() =>
                                                setHoveredItem(k)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredItem(null)
                                            }
                                        >
                                            {m.title}
                                            {hoveredItem === k && (
                                                <span className="w-full h-[1px] absolute bg-neutral-700 bottom-0 left-0"></span>
                                            )}
                                        </a>
                                        <span></span>
                                    </li>
                                ))}
                            </>
                        ))}
                </ul>
            </div>
        </div>
    );
}
