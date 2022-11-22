import { Twit } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { defaultResponse, TwitsResponse } from "../interface/responseType";
import useMutation from "../lib/client/useMutation";
import useUser from "../lib/client/useUser";

interface TwitForm {
  text: string;
}

export default function Home() {
  const router = useRouter();
  const {} = useUser();
  const [isModal, setModal] = useState(false);
  const [mutate, { loading, data }] =
    useMutation<defaultResponse<Twit>>("/api/twit");
  const { data: twits } = useSWR<defaultResponse<TwitsResponse[]>>("/api/twit");
  const { register, handleSubmit } = useForm<TwitForm>();
  const onValid = (formData: TwitForm) => {
    if (!formData.text) return;
    if (!loading) {
      mutate(formData);
    }
  };
  useEffect(() => {
    if (data?.ok && data?.data?.id) {
      router.push(`/twit/${data.data.id}`);
    }
  }, [router, data]);
  return (
    <div className="mt-14">
      <div>
        {twits?.data?.map((twit) => (
          <div
            key={twit.id}
            className="flex flex-col gap-2  border-b border-gray-200 p-2"
          >
            <div>{twit.user.name}</div>
            <div>{twit.text}</div>
            <div className="flex justify-end items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5  text-ba-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <span>{Number(twit._count.Like)}</span>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setModal(true)}
        className="fixed w-16 h-16 bg-blue-400 rounded-full text-white flex items-center justify-center text-4xl font-bold right-16 bottom-16"
      >
        +
      </button>
      {isModal && (
        <form onSubmit={handleSubmit(onValid)}>
          <div className="fixed w-full h-full top-0  bg-[rgba(0,0,0,0.4)] shadow-2xl left-0 px-8 flex items-end">
            <div className="w-full h-[340px] rounded-lg bg-white p-4 flex flex-col items-end">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="mb-4 mr-1 text-xl"
              >
                X
              </button>
              <textarea
                {...register("text")}
                rows={7}
                className="border border-blue-400 w-full resize-none rounded-lg outline-none p-4 text-gray-600 text-lg"
              ></textarea>
              <button className="px-4 py-2 bg-blue-400 text-white rounded-md mt-2 ">
                트윗
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
