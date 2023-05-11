"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { BsGithub, BsGoogle } from "react-icons/bs";

import { Input } from "@/app/components/inputs/Input";
import { Button } from "@/app/components/Button";
import { AuthSocialButton } from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

export const AuthForm = () => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('Faça seu login')

  //agora no start do formulário para validar a sessão
  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/users')
    }
  }, [session?.status, router])


  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
      setTitle('Faça seu cadastro')
    } else {
      setVariant("LOGIN");
      setTitle('Faça seu login')
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      registerUser(data);
    } else if (variant === "LOGIN") {
      signInUser(data);
    }
  };

  const registerUser: SubmitHandler<FieldValues> = async (data) => {
    await axios
      .post("/api/register", data)
      .then(() => { signIn('credentials', data) })
      .catch(() => toast.error("erro ao efetuar registro"))
      .finally(() => setIsLoading(false));
  };

  const signInUser: SubmitHandler<FieldValues> = async (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Credenciais inválida!");
        } else if (callback?.ok) {
          toast.success("Sucesso!");

          /**para login de cadastro local
           * tem que colocar o router aqui, pois
           * ele não é reconhecido no usereffect
           */
          router.push('/users')
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Credenciais inválida!")
        } else if (callback?.ok) {
          toast.success('Sucesso ao realizar login!')
        }
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <div
      className="
    mt-8
    sm:mx-auto
    sm:w-full
    sm:max-w-md
    "
    >
      <div
        className="
      bg-white
      px-4
      py-8
      shadow
      sm:rounded-lg
      sm:px-10
      "
      >
        <h1 className="
        text-gray-500
        font-bold 
        mb-12"
        >
          {title}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Endereço de email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Senha"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />

          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Acessar" : "Registrar"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="
              absolute
              inset-0
              flex
              items-center
            "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                ou acessar com
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
              text="Github"
            />

            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
              text="Google"
            />
          </div>

          <div
            className="
           flex
           gap-2
           justify-center
           text-sm
           mt-6
           px-2
           text-gray-500
         "
          >
            <div>
              {variant === "LOGIN" ? "Novo message ?" : "Criar nova conta"}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === "LOGIN" ? "Criar conta" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
