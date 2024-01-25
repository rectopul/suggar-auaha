import { useCallback, useEffect, useState } from "react";
import { PostsMain } from "../../@types/Posts";
import { getPostsByCategory } from "../../util/Api";
import { PostItem } from "../Posts/PostItem";
import { ChevronRight } from "lucide-react";

export function SingleArchive() {
    const [posts, setPostList] = useState<PostsMain[] | null>(null);

    const listPosts = useCallback(async () => {
        try {
            if (window.category_info) {
                const postList = await getPostsByCategory(
                    window.category_info.id
                );
                postList && setPostList(postList);
            }
        } catch (error) {
            console.log(`erro ao listar posts da categoria`, error);
        }
    }, []);

    useEffect(() => {
        listPosts();
    }, [listPosts]);

    return (
        <div className="w-full px-4 xl:px-2 my-20">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col gab-[22px]">
                <div>
                    <span className="text-black text-xl font-medium font-['Poppins']">
                        As matérias{" "}
                    </span>
                    <span className="text-blue-900 text-xl font-bold font-['Poppins']">
                        mais recentes
                    </span>
                </div>

                <div className="flex flex-wrap items-center mt-5">
                    {posts &&
                        posts.length &&
                        posts.map((p, k) => <PostItem key={k} post={p} />)}
                </div>

                <div className="w-full flex justify-center mt-10">
                    <span className="w-[51px] h-[50px] bg-blue-900 rounded-[3px] justify-center items-center flex text-white text-xl font-medium font-pop">
                        1
                    </span>

                    <span className="w-[51px] h-[50px] bg-white mx-2 rounded-[3px] justify-center items-center flex text-white text-xl">
                        <ChevronRight
                            size={40}
                            strokeWidth={2}
                            className="text-blue-900"
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}
