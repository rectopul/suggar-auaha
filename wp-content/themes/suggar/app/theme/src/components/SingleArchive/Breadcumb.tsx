import { ChevronRight } from "lucide-react";

export function ArchiveBreadCumb() {
    return (
        <div className="w-full px-4 xl:px-2 h-[58px] py-2.5 bg-neutral-50 justify-start items-center flex">
            <div className="w-full max-w-[1300px] mx-auto flex items-center">
                <span className="flex items-center text-blue-900">
                    <a
                        href="/"
                        className="text-neutral-700 px-2 text-xs font-normal font-pop"
                    >
                        Home
                    </a>
                    <ChevronRight size={20} className="mr-2 text-blue-900" />
                </span>

                {window.category_info && (
                    <span className="px-2 text-blue-900 text-xs font-bold font-pop">
                        {window.category_info.title}
                    </span>
                )}
            </div>
        </div>
    );
}
