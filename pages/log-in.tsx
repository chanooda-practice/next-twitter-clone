import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Inputs/Input";
import { defaultResponse } from "../interface/responseType";
import useMutation from "../lib/client/useMutation";

interface LoginForm {
  phone?: string;
  email?: string;
  password: string;
}

export default function LogIn() {
  const router = useRouter();
  const [errMessage, setErrorMessage] = useState("");
  console.log(errMessage);
  const [type, setType] = useState("email");
  const toggleLoginType = () => {
    setType((prev) => (prev === "email" ? "phone" : "email"));
  };
  const [mutate, { data, loading }] =
    useMutation<defaultResponse>("/api/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onValid = (formData: LoginForm) => {
    if (!loading) {
      mutate(formData);
    }
  };
  useEffect(() => {
    if (data && data?.ok) {
      setErrorMessage("");
      router.push("/");
    }
    if (data && !data?.ok) {
      setErrorMessage("알맞은 정보가 아닙니다.");
    }
  }, [data, router]);
  return (
    <div>
      <h2 className="text-xl mb-4">로그인</h2>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="space-y-4">
          {type === "email" ? (
            <Input
              label="이메일"
              placeholder="이메일"
              {...register("email", { required: "이메일을 입력하세요." })}
              errorMessage={errors.email?.message}
            />
          ) : (
            <Input
              label="전화번호"
              placeholder="전화번호"
              {...register("phone", { required: "전화번호를 입력하세요." })}
              errorMessage={errors.phone?.message}
            />
          )}
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "비밀번호를 입력하세요." })}
            errorMessage={errors.password?.message}
          />
          <div>
            <p
              onClick={toggleLoginType}
              className="text-blue-400 text-right cursor-pointer"
            >
              {type === "email" ? "전화번호로 로그인" : "이메일로 로그인"}
            </p>
          </div>
        </div>
        <input
          type="submit"
          value="로그인"
          className="w-full px-4 py-2 bg-blue-400 text-white rounded-md mt-8 cursor-pointer"
        />
      </form>
      <div className="mt-4 flex justify-between items-center">
        {errMessage && <p className="text-red-500">{errMessage}</p>}
        <Link href="/create-account">
          <a className=" block float-right hover:underline ml-auto">
            계정이 없으신가요? 회원가입하러 가기
          </a>
        </Link>
      </div>
    </div>
  );
}
