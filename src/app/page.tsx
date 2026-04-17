import DecryptedText from "@/components/DecryptedText";
import PlasmaWave from "@/components/PlasmaWave";
import Image from "next/image";
import StackSection from "./Components/StackSection";
import CurvedLoop from "@/components/CurvedLoop";
import GradientText from "@/components/GradientText";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogDescription,
  MorphingDialogClose,
} from "@/components/ui/morphing-dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  href: string;
  action: string;
  image: string;
  imageClassName?: string;
};

export default function Home() {
  const projects: Project[] = [
    {
      title: "Inua Saunamanufaktur",
      description: "Egyedi szaunák tervezése és kivitelezése Dániában, Németországban, Ausztriában és Magyarországon nyújtott szolgáltatásokkal. A weboldal fejlett struktúrával, egyedi dizájnnal és animációkkal rendelkezik. A weboldal célja az adminisztráció megkönnyítése, a cég bemutatása és az érdeklődők tájékoztatása a szolgáltatásokról. Az adminisztrációt a PayloadCMS segítségével lehet végezni, a weboldal pedig Next.js-ben íródott.",
      href: "https://inuasaunamanufaktur.de",
      action: "Weboldal megnyitása",
      image: "/saunamanufaktur.png",
    },
    {
      title: "További projektek hamarosan...",
      description: "Az oldalra feltöltött adatok, hiányosak, a jövőben frissülni fog. Az összes projektemet az alábbi GitHub linken elérheted.",
      href: "https://github.com/benceszalaiii",
      action: "GitHub megnyitása",
      image: "/github.png",
      imageClassName: "invert"
      
    }
  ];
  return (
    <main className="h-full min-h-screen font-mono">
      <section
        id="home"
        about="hero"
        className="w-full relative h-screen min-h-screen"
      >
        <PlasmaWave
          colors={["#360a60", "#390a48"]}
          speed1={0.065}
          speed2={0.1}
          focalLength={1.45}
          bend1={1.1}
          bend2={0.6}
          dir2={1}
          rotationDeg={30}
        />
        <div
          about="overlay-hero"
          className="z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <h2 className="text-6xl font-mono font-semibold mb-4">
            Bence Szalai
          </h2>
          <p className="text-2xl font-mono font-semibold">
            Full-stack web developer
          </p>
        </div>
      </section>
      <StackSection />
      <section id="loop" className="w-full h-72">
        <CurvedLoop
          curveAmount={150}
          marqueeText="Typescript✦Next.js✦PayloadCMS✦TailwindCSS✦FramerMotion✦ShadcnUI✦PostgreSQL✦Vercel✦"
        />
      </section>
      <section id="about" className="w-full py-16 md:px-16 px-4">
        <GradientText
          colors={["#2c0bb3", "#5d109e", "#ffffff", "#ffffff", "#2c0bb3"]}
          animationSpeed={5}
          showBorder={false}
          yoyo={false}
          className="text-6xl font-mono font-bold cursor-text text-left mr-auto"
        >
          Rólam
        </GradientText>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 place-items-center gap-8">
          <p className="text-lg font-mono font-semibold text-justify">
            Szia! Én Szalai Bence vagyok, egy 19 éves{" "}
            <span className="text-purple-600">full-stack webfejlesztő</span>. 16
            éves korom óta foglalkozom webfejlesztéssel, és azóta rengeteg
            mindent tanultam. Jelenleg a Győri SZC Jedlik Ányos Technikumba
            járok, ahol{" "}
            <span className="text-purple-600">szoftverfejlesztőnek</span>{" "}
            tanulok. Több projektem is van, amiket megtekinthetsz a{" "}
            <a className="bg-purple-600" href="#projects">
              projektek
            </a>{" "}
            szekcióban. Több vállalkozásnak is készítettem már weboldalt, és
            több magánszemélynek is segítettem már weboldal készítésében.
          </p>
          <div className="size-72 relative">
            <MorphingDialog>
              <MorphingDialogTrigger>
                <MorphingDialogImage
                  src="/picture.JPEG"
                  className="aspect-square"
                  alt="..."
                />
              </MorphingDialogTrigger>

              <MorphingDialogContainer>
                <MorphingDialogContent>
                  <MorphingDialogClose />
                  <MorphingDialogImage src="/picture.JPEG" alt="..." />
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          </div>
        </div>
      </section>
      <section
        id="projects"
        className="w-full border-t py-16 px-4 md:px-16 border-purple-600/20"
      >
        <GradientText
          colors={["#2c0bb3", "#5d109e", "#ffffff", "#ffffff", "#2c0bb3"]}
          animationSpeed={5}
          showBorder={false}
          yoyo={false}
          className="text-6xl font-mono font-bold cursor-text text-left mr-auto"
        >
          Projektek
        </GradientText>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 place-items-center gap-8">
          {projects.map((item) => {
            return (
              <MorphingDialog>
                <MorphingDialogTrigger>
                  <MorphingDialogImage className={cn("", item.imageClassName)} src={item.image} alt="..." />
                  <MorphingDialogTitle>{item.title}</MorphingDialogTitle>
                  <MorphingDialogSubtitle>
                    {item.description}
                  </MorphingDialogSubtitle>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent className="text-white">
                    <MorphingDialogClose />
                    <MorphingDialogImage className={cn("", item.imageClassName)} src={item.image} alt="..." />
                    <MorphingDialogTitle className="text-2xl my-4">{item.title}</MorphingDialogTitle>
                    <MorphingDialogSubtitle className="mt-4 mb-8">
                      {item.description}
                    </MorphingDialogSubtitle>
                    <MorphingDialogDescription className="text-right">
                      <Link target="_blank" className="bg-purple-600 text-white px-4 py-2 rounded-md" href={item.href}>{item.action}</Link>
                    </MorphingDialogDescription>
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </div>
      </section>
      <section className="min-h-[80vh] w-full flex flex-col items-center gap-8">
        <GradientText
          colors={["#2c0bb3", "#5d109e", "#ffffff", "#ffffff", "#2c0bb3"]}
          animationSpeed={5}
          showBorder={false}
          yoyo={false}
          className="text-6xl font-mono font-bold cursor-text text-left mr-auto"
        >
          Kapcsolat
        </GradientText>
        <p className="text-lg font-mono font-semibold text-justify my-auto animate-pulse duration-6000 text-neutral-500">Kapcsolattartó ürlap hamarosan...</p>
      </section>
    </main>
  );
}
