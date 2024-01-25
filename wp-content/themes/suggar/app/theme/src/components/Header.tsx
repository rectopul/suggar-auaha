import { getSiteMedia, setNonceToLocalStorage, siteConfig } from "../util/Api";
import { MediaTypes, ShopTypes } from "../util/types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { MenuCategory } from "./MenuCategory/MenuCategory";
import { MenuMobile } from "./MenuMobile";

export function Header() {
    const [, setSite] = useState<ShopTypes>();
    const [logo, setLogo] = useState<MediaTypes>();

    const getInfo = async () => {
        try {
            await setNonceToLocalStorage();
            const result = await siteConfig();
            const media = await getSiteMedia(result.site_logo);

            setLogo(media);
            setSite(result);
            console.log(`logo`, result.site_logo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <>
            {logo && (
                <div className="shadow-footer text-center font-pop">
                    <header className="w-full bg-white py-5">
                        <nav className="w-full lg:max-w-[1024px] xl:max-w-[1300px] px-2 xl:px-0 flex flex-row flex-wrap xl:flex-nowrap items-center mx-auto justify-between">
                            <MenuMobile />

                            <figure className="w-[150px] xl:w-36 text-center">
                                <a href="/" className="w-full">
                                    <img
                                        className="w-full"
                                        src={logo.source_url}
                                        alt={logo.media_details.file}
                                    />
                                </a>
                            </figure>

                            <div className="w-full xl:w-[635px] bg-white rounded border border-cinza2 mx-3 h-10 hidden xl:flex text-lime-green justify-center pl-3 xl:pr-[120px] py-2.5">
                                <button className="w-10 pl-2 flex content-center items-center text-neutral-700">
                                    <Search size={22} strokeWidth={1} />
                                </button>
                                <input
                                    type="text"
                                    name="search"
                                    className="w-full placeholder:text-neutral-700 text-xs text-neutral-700 outline-none px-2 font-pop"
                                    placeholder="Olá, o que você procura hoje?"
                                />
                            </div>

                            <MenuCategory />

                            <div className="w-full xl:w-[635px] bg-white rounded border border-cinza2 mt-3 mx-3 h-10 flex xl:hidden text-lime-green justify-center pl-3 xl:pr-[120px] py-2.5">
                                <button className="w-10 pl-2 flex content-center items-center text-neutral-700">
                                    <Search size={22} strokeWidth={1} />
                                </button>
                                <input
                                    type="text"
                                    name="search"
                                    className="w-full placeholder:text-neutral-700 text-xs text-neutral-700 outline-none px-2 font-pop"
                                    placeholder="Olá, o que você procura hoje?"
                                />
                            </div>
                        </nav>
                    </header>
                </div>
            )}
        </>
    );
}
