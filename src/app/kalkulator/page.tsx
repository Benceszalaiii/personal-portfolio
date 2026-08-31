import type { Metadata } from "next";
import PriceCalculator from "@/components/calculator/PriceCalculator";

export const metadata: Metadata = {
  // "Mennyibe kerül egy weboldal" is a high-intent Hungarian search, and this
  // is the only page on the site that answers it with numbers.
  title: "Árkalkulátor — mennyibe kerül egy weboldal? | Szalai Bence",
  description:
    "Állítsd össze, mire van szükséged, és nézd meg az árát azonnal: landing page, CMS-es weboldal, időpontfoglaló, egyedi dizájn, üzemeltetés. Átlátható árak, magyar nyelven.",
};

/*
  The whole page is the calculator: it locks itself to exactly one viewport on
  desktop (see the note in PriceCalculator on why the shell is a grid), so
  there is nothing to compose around it here. The footer knows to stand down on
  this route — see components/SiteFooter.
*/
export default function CalculatorPage() {
  return <PriceCalculator />;
}
