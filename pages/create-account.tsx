import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Inputs/Input";
import { defaultResponse } from "../interface/responseType";
import useMutation from "../lib/client/useMutation";

interface userForm {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateAccount() {
  const router = useRouter();
  const [type, setType] = useState("email");
  const toggleLoginType = () => {
    setType((prev) => (prev === "email" ? "phone" : "email"));
  };
  const [mutate, { data, loading }] = useMutation<defaultResponse>("/api/join");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<userForm>();
  const onValid = (formData: userForm) => {
    const { password, confirmPassword, ...data } = formData;
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        message: "비밀번호가 같지 않습니다.",
      });
      return;
    }
    if (!loading) mutate({ password, ...data });
  };
  useEffect(() => {
    if (data?.ok) {
      router.push("/log-in");
    }
  }, [router, data]);
  return (
    <div className="">
      <h2 className="text-xl mb-4">지금 트위터에 가입하세요.</h2>
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
          <div>
            <p onClick={toggleLoginType} className="text-blue-400 text-right cursor-pointer">
              {type === "email" ? "전화번호로 가입" : "이메일로 가입"}
            </p>
          </div>
          <Input
            label="이름"
            {...register("name", { required: "이름을 입력하세요." })}
            placeholder="이름"
            errorMessage={errors.name?.message}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "비밀번호를 입력하세요." })}
            errorMessage={errors.password?.message}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호"
            {...register("confirmPassword", { required: "비밀번호 확인을 입력하세요." })}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>

        <input
          type="submit"
          value="회원가입"
          className="w-full px-4 py-2 bg-blue-400 text-white rounded-md mt-8 cursor-pointer"
        />
      </form>
      <Link href="/log-in">
        <a className="mt-4 block float-right hover:underline">계정이 있으신가요? 로그인하러 가기</a>
      </Link>
    </div>
  );
}
