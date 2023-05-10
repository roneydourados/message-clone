import Image from "next/image";
import { AuthForm } from "./components/AuthForm";

/**
 * aqui o nextjs entente que é a index
 * o uque inicia de fato com projeto
 * página inicial
 */
export default function Home() {
  return (
    <div
      className="
    flex
    min-h-full
    flex-col
    justify-center
    py-12
    sm:px-6
    lg:px-8
    bg-gray-100
    "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="Logo"
          height={48}
          width={48}
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
        <h2
          className="
         mt-6
         text-center
         text-3xl
         font-bold
         tracking-tight
         text-tray-900
       "
        >
          Entre em sua conta
        </h2>
      </div>
      <AuthForm />
    </div>
  )
}
