import { getShopInfos } from "../util/Api";
import { useEffect, useState } from "react";

export default function FullBanner() {
    const [banner, setBanner] = useState<string>();
    const [bannerMobile, setBannerMobile] = useState<string>();

    const getBanner = async () => {
        const shopInfo = await getShopInfos();

        if (shopInfo && shopInfo.full_banner_mobile && shopInfo.full_banner) {
            setBannerMobile(shopInfo.full_banner_mobile);
            setBanner(shopInfo.full_banner);
        }
    };

    useEffect(() => {
        getBanner();
    }, []);

    return (
        <div className="w-full text-center mb-[20px] xl:mb-[60px] h-[300px] xl:h-[630px] overflow-hidden relative">
            <figure className="w-full mx-auto overflow-hidden absolute xl:relative left-[50%] top-0 xl:le-[initial] translate-x-[-50%]">
                {banner && (
                    <img
                        src={banner}
                        className="object-cover hidden xl:flex xl w-full xl:w-full h-[300px] xl:h-[630px]"
                        alt="..."
                    />
                )}

                {bannerMobile && (
                    <img
                        src={bannerMobile}
                        className="object-cover flex xl:hidden w-full xl:w-full h-[300px] xl:h-[630px]"
                        alt="..."
                    />
                )}
            </figure>
        </div>
    );
}
