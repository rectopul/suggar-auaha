import { SubmitHandler, useForm } from "react-hook-form";
import { UserMain } from "../../@types/User";
import { createCommentPost, CommentProps } from "../../util/Api";
import { useEffect } from "react";

interface PostCommentProps {
    user: UserMain;
}

export function PostComments({ user }: PostCommentProps) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CommentProps>();

    const onSubmit: SubmitHandler<CommentProps> = async (
        data: CommentProps
    ) => {
        try {
            if (window.post_info) {
                const comment = await createCommentPost(data);
                console.log(`comentário feito`, comment);
            }
        } catch (error) {
            console.log(`Erro ao criar comentário`, error);
        }
    };

    useEffect(() => {
        window.post_info && setValue("data.post", window.post_info.id);
    }, [window.post_info]);

    console.log(`comentarios carregados`);
    return (
        <div className="w-full my-20">
            <div className="w-full max-w-[1300px] mx-auto flex flex-col">
                <div className="w-full flex-col xl:flex-row flex items-start">
                    <figure className="w-[150px] mr-4">
                        <img
                            src={user.avatar_urls[96]}
                            alt={user.slug}
                            className="w-[150px] rounded-full"
                        />
                    </figure>

                    <div className="flex flex-col max-w-[550px]">
                        <h2 className="text-blue-900 text-lg font-medium font-pop mb-3">
                            {user.name}
                        </h2>
                        <p className="text-neutral-700 text-sm font-normal font-pop">
                            {user.description}
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col mt-8">
                    <form
                        className="flex flex-col w-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <span className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Meu nome"
                                className="w-full h-[41px] p-2.5 outline-none rounded-[3px] border border-neutral-300 justify-start items-start gap-2.5 inline-flex text-neutral-700 placeholder:text-neutral-700 text-sm font-normal font-pop"
                                id="author_name"
                                {...register("data.author_name", {
                                    required: true,
                                })}
                            />

                            {errors.data?.author_name && (
                                <span className="w-full p-1 mt-1 rounded bg-red-500 text-white flex items-center text-xs font-semibold">
                                    Por favor informe seu nome
                                </span>
                            )}
                        </span>

                        <span className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Meu e-mail"
                                className="w-full my-4 h-[41px] p-2.5 outline-none rounded-[3px] border border-neutral-300 justify-start items-start gap-2.5 inline-flex text-neutral-700 placeholder:text-neutral-700 text-sm font-normal font-pop"
                                id="author_email"
                                {...register("data.author_email", {
                                    required: true,
                                })}
                            />

                            {errors.data?.author_email && (
                                <span className="w-full p-1 mt-[-15px] rounded bg-red-500 text-white flex items-center text-xs font-semibold">
                                    Por favor informe seu E-mail
                                </span>
                            )}
                        </span>

                        <span className="flex flex-col">
                            <textarea
                                placeholder="Comentários"
                                className="w-full h-[101px] pl-2.5 pt-2.5 pb-[70px] rounded-[3px] border border-neutral-300 justify-start items-start gap-2.5 inline-flex text-neutral-700 placeholder:text-neutral-700 text-sm font-normal font-pop"
                                id="comment"
                                {...register("data.content", {
                                    required: true,
                                })}
                            ></textarea>
                            {errors.data?.author_email && (
                                <span className="w-full p-1 mt-1 rounded bg-red-500 text-white flex items-center text-xs font-semibold">
                                    Por favor informe seu comentário
                                </span>
                            )}
                        </span>

                        <button className="w-[127px] mt-3 h-[41px] px-10 py-2.5 bg-blue-900 rounded-[3px] justify-center items-center gap-2.5 inline-flex text-white text-sm font-normal font-pop">
                            Enviar
                        </button>
                    </form>
                </div>

                <div className="w-full flex flex-col">
                    <h2 className="text-blue-900 text-xl font-bold font-pop mt-20">
                        Comentários
                    </h2>

                    <div className="w-full flex flex-col">
                        {window.post_info &&
                            window.post_info.comments.map((c, k) => (
                                <div className="flex flex-col my-5" key={k}>
                                    <div className="flex items-center">
                                        <span className="text-black text-sm font-medium font-pop">
                                            {c.comment_author}
                                        </span>
                                        <span className="ml-5 text-neutral-700 text-xs font-normal font-pop">
                                            {c.comment_date}
                                        </span>
                                    </div>

                                    <div
                                        className="mt-5 text-neutral-700 text-sm font-normal font-pop"
                                        dangerouslySetInnerHTML={{
                                            __html: c.comment_content,
                                        }}
                                    ></div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
