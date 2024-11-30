import React from "react";
import {Editor} from '@tinymce/tinymce-react';
import { Controller } from "react-hook-form";

export default function Rte({name, control, label, defaultValue=""}){
    return (
        <>
        <div className="w-full">
            {label && <label className="inline-block"> 
                {label}
                </label>}

                <Controller
                name={name || "content"}
                control={control}
                render={({field: {onChange}}) => (
                    <Editor 
                    initialValue={defaultValue}
                     apiKey='g862ew239567zxk4uosq0m510nxm1o3j7bb4e6bo9r8yi0fj'
                    init={{

                        initialValue: defaultValue,
                        height: 500,
                        menubar: true,
                       
                          toolbar: 'undo redo | formatselect | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'

                    }}
                    onEditorChange={onChange}
                    />
                )}
                />
            <div> hello rte</div>
        </div>
        </>
    )
}