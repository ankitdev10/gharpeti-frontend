import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
          <div className="flex flex-col justify-center items-center p-8 md:p-12 lg:p-16">
            <div className="max-w-md space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Welcome to the lands of homes.
              </h1>
              <p className="">
                Embark on a journey through the ever-changing realms of the
                homes.
              </p>
              {/* <div className="relative w-full aspect-video"> */}
              {/*   <Image */}
              {/*     src="/register.jpg" */}
              {/*     alt="Fantasy Illustration" */}
              {/*     fill */}
              {/*     className="rounded-lg" */}
              {/*   /> */}
              {/* </div> */}
            </div>
          </div>
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
