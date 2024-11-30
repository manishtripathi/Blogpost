import React, { useCallback, useEffect, useState } from "react";
import { Button, Input, Select, Rte } from '../index';
import appWriteService from '../../appwrite/configration'
import { data, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

const PostForm = () => {

    const {slug} = useParams();
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData)
    
    const [post, setPost] = useState(null)


    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"
        },
    })

    useEffect(() => {
        if (slug) {
            appWriteService.GetPostBySlug(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    setValue("title", fetchedPost.title);
                    setValue("slug", fetchedPost.slug);
                    setValue("content", fetchedPost.content);
                    setValue("status", fetchedPost.status)
                }

            })
        }
    }, [slug, setValue])

    // const submit = async (data) => {
    //     if (post) {
    //         const file = data.image[0] ? await appWriteService.UploadFile(data.image[0]) : null
    //         if (file) {
    //            await appWriteService.DeleteFile(post.titleimage)
    //         }

    //         const dbPost = await appWriteService.UpdatePost
    //             (post.$id, {
    //                 ...data,
    //                 titleimage: file ? file.file.$id : undefined,

    //                 if(dbPost) {
    //                     navigate(`/post/${dbPost.$id}`)
    //                 }
    //             })
    //     }
    //     else {
    //         const file = await appWriteService.UploadFile(data.image[0]);

    //         if (file) {
    //             const fileId = file.$id
                
    //             const dbPost = await appWriteService.CreatePost({
    //                 ...data,
    //                 userId: userData.$id,
    //                 titleimage: fileId
    //             })
    //             if (dbPost) {
    //                 navigate(`/post/${dbPost.$id}`)
    //             }
    //         }
            
    //     }
    // }

    const submit = async (data) => {
        if (post) {
            const file = data.image?.[0] ? await appWriteService.UploadFile(data.image[0]) : null;
            const dbPost = await appWriteService.UpdatePost(post.$id, {
                ...data,
                titleimage: file ? file.$id : post.titleimage, // Keep the old image if no new file is uploaded
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            if (data.image?.[0]) {
                const file = await appWriteService.UploadFile(data.image[0]);
                if (file) {
                    const dbPost = await appWriteService.CreatePost({
                        ...data,
                        userId: userData.$id,
                        titleimage: file.$id,
                    });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        }
    };
    


    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') 
            .replace(/^-+|-+$/g, '');  

        }
         return ''
    }, [])
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))

            }
        })
        return () => {
            subscription.unsubscribe()
        }

    }, [watch, slugTransform, setValue])

    if (!post && slug) {
        return <div>Loading post...</div>;
    }
    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appWriteService.getFilePreview(post.titleimage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}
export default PostForm