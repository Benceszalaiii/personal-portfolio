import type { CaseStudy } from "./types";

/*
  Nyaraláshasonlító — saját projekt. A tartalom a valódi forráskódra épül
  (src/lib/transfer.ts, src/lib/og.ts, src/app/api/og/route.ts, src/lib/storage.ts).
*/

export const nyaralashasonlito: CaseStudy = {
  slug: "nyaralashasonlito",
  title: "Nyaraláshasonlító",
  tagline:
    "Privát kutatókonzol nyaralások teljes költségének összevetésére — szerver, adatbázis és regisztráció nélkül.",
  summary:
    "Egy nyaralástervező eszköz, ami csak azt kérdezi meg, amit tényleg utánanéztél: a helyet, a dátumokat, a járatot és a szállás linkjét. Minden mást kiszámol vagy kiolvas. Adatbázis nincs — az adat a böngésződben marad, és egyetlen bemásolható kóddal utazik gépek között.",
  year: "2026",
  kind: "Saját projekt",
  role: "Termékdefiníció, UX, teljes fejlesztés",
  stack: ["Next.js", "TypeScript", "React", "Tailwind CSS", "shadcn/ui"],
  cover: {
    src: "/nyaralas.png",
    alt: "A Nyaraláshasonlító úti cél listája: Korfu, Nápoly és Monte-Carlo teljes költséggel, kibontott repülő- és szállásbontással.",
    width: 2934,
    height: 1688,
  },
  facts: [
    { label: "Típus", value: "Egyszemélyes kutatóeszköz" },
    { label: "Backend", value: "Egyetlen API-végpont" },
    { label: "Adatbázis", value: "Nincs" },
    { label: "Fiók / regisztráció", value: "Nincs" },
    { label: "Nyelv", value: "Magyar" },
  ],
  links: [
    {
      label: "Forráskód a GitHubon",
      href: "https://github.com/Benceszalaiii/compare-holiday",
      primary: true,
    },
  ],

  chapters: [
    /* ------------------------------------------------------------ a feladat */
    {
      id: "feladat",
      nav: "A feladat",
      kicker: "Kiindulás",
      title: "Tizenkét fül, és semmi, ami megmarad",
      lede: "A nyaralástervezés nem inspirációkeresés. Kutatómunka — és a baj az, hogy minden este elölről kezdődik.",
      blocks: [
        {
          kind: "text",
          body: [
            "A kiindulási helyzet ismerős: nyitva a Skyscanner, a Wizz Air, a Booking és az Airbnb, az ember végigárazik egy várost, aztán másnap már nem emlékszik, mennyi is volt a repülő Korfura, és hogy az a szállás a parton volt-e vagy a város másik végén.",
            "A táblázat erre elvileg jó válasz — a gyakorlatban nem az. Egy új úti cél felvétele táblázatban öt percig tart, mert az ember maga számolja az éjszakák számát, az egy főre jutó összeget és a napi költséget. Ami öt percig tart, azt nem viszi fel az ember.",
          ],
        },
        {
          kind: "problem",
          problem:
            "A kutatás eredménye szétszóródik a böngészőfülek és a fejben tartott számok között, az összegyűjtése pedig annyi kézi munka, hogy inkább elmarad.",
          solution:
            "Egy felület, ahol egy úti cél felvétele bőven egy perc alatt megvan, és ahol semmit nem kell kiszámolni, amit a program is ki tud.",
        },
        {
          kind: "quote",
          text: "Az egyetlen dolog, amit be kell gépelni, az, aminek utánanéztél.",
        },
      ],
    },

    /* ---------------------------------------------------------- számolás */
    {
      id: "szamolas",
      nav: "Amit kiszámol",
      kicker: "Alapelv",
      title: "Ne kérdezd, ha ki tudod számolni",
      lede: "Minden mező, amit az űrlapról el lehetett venni, olyan mező, amit nem kell kitölteni.",
      blocks: [
        {
          kind: "text",
          body: [
            "A tervezés első lépése az volt, hogy végigmentem a képzeletbeli űrlapon, és minden mezőnél feltettem a kérdést: ezt tényleg csak a felhasználó tudhatja? Az éjszakák száma nem — az a két dátum különbsége. Az egy főre jutó összeg nem. A napi költség nem. A szállás neve, képe és országa sem: az benne van a linkben, amit amúgy is bemásol.",
            "Ami maradt: a hely, az érkezés és a távozás, a járat adatai, a repülőjegy ára fejenként, és a szállások linkjei. Ennyi. Az űrlap alján futó összesítő sáv élőben mutatja, hogy a beírt számokból mi jön ki — így a felhasználó már mentés előtt látja, hogy jó helyen jár-e.",
          ],
        },
        {
          kind: "figure",
          src: "/nyaralas_form.png",
          alt: "Az úti cél felvételi űrlapja: hely és dátumok, járatadatok oda- és visszaúttal, szállás-link beillesztő mező, és alul élő költségösszesítő sáv.",
          width: 2506,
          height: 1584,
          caption:
            "Az űrlap alsó sávja végig látszik: repülő, szállás, éjszakánként, fejenként, teljes költség — mind számolt érték, egyik sem beírható.",
          bleed: true,
        },
        {
          kind: "points",
          items: [
            {
              title: "Mutasd a munkát",
              body: "Minden származtatott szám mellett ott van, amiből lett — „36 982 Ft / fő × 4 fő = 147 928 Ft”. Valódi pénzügyi döntésnél a felhasználónak látnia kell, hogy az összeadás stimmel, nem elhinnie.",
            },
            {
              title: "Egy szám vezet",
              body: "A teljes költség az összehasonlítás tengelye. Minden más figura tipográfiailag is alárendelt — a lista egyetlen pillantással olvasható.",
            },
            {
              title: "Őszinte hiányzás",
              body: "Ha egy úti célból hiányzik az ár, nem nullaként számol bele, hanem a fejlécben jelzi, hogy „2 kimarad hiányzó ár miatt”. A hiányos adat nem torzíthatja a rangsort.",
            },
          ],
        },
      ],
    },

    /* --------------------------------------------------------- adatbázis */
    {
      id: "adatbazis",
      nav: "Adatbázis nélkül",
      kicker: "Architektúra",
      title: "Nincs adatbázis, és ez nem hiányosság",
      lede: "Egy egyszemélyes kutatóeszközhöz a szerveroldali tárolás nem érték, hanem teher.",
      blocks: [
        {
          kind: "text",
          body: [
            "Az adatbázis regisztrációt jelent, a regisztráció jelszót, a jelszó jelszókezelést, a tárolt adat pedig adatvédelmi felelősséget — mindezt azért, hogy valaki eltárolja a saját nyaralási jegyzeteit. Ez rossz csere. Az egész állapot ezért a böngésző `localStorage`-ában él: nincs fiók, nincs szerverre küldött adat, és az eszköz internet nélkül is megnyílik.",
            "A döntés ára viszont valós: ha a tárolt adat sérült, elavult formátumú vagy kézzel átírt, nincs séma, ami megvédjen. Ezt nem elkerülni kell, hanem kezelni.",
          ],
        },
        {
          kind: "text",
          body: [
            "Minden beolvasott adat egyetlen normalizálón megy át, mielőtt állapotba kerülne. Ez a függvény nem hisz el semmit: minden mezőnek van alapértéke, minden tömb ellenőrzött, és ami értelmezhetetlen, az kiesik — de a többi betöltődik. Egy elgépelt JSON így nem fehér képernyőt eredményez, hanem legfeljebb egy hiányzó sort.",
          ],
        },
        {
          kind: "code",
          label: "src/lib/storage.ts",
          lines: [
            "/**",
            " * Coerces an arbitrary parsed blob into a valid TripState. Every field is",
            " * defaulted rather than trusted, so a payload hand-edited in devtools, pasted",
            " * in from another machine, or left behind by an older shape still loads",
            " * instead of throwing at render time.",
            " */",
            "export function normalizeTrip(input: unknown): TripState | null {",
          ],
        },
        {
          kind: "points",
          items: [
            {
              title: "Verziómigráció menet közben",
              body: "A repülőjegy ára korábban csoportszinten volt tárolva, ma fejenként. A régi alakban mentett adat betöltéskor elosztódik a létszámmal, így a felhasználó ugyanazt a végösszeget látja, amit tegnap — a formátumváltásból semmit nem vesz észre.",
            },
            {
              title: "A régi kulcs marad",
              body: "A profilok bevezetésekor a `v1` kulcs szándékosan a helyén maradt a `v2` mellett: ingyenes visszaállítási másolat arra az esetre, ha a migráció félresikerül.",
            },
            {
              title: "A hibás mentés néma",
              body: "Ha a tárhely tele van vagy le van tiltva, a mentés csendben elbukik, és a munkamenet memóriában él tovább. Gépelés közben egy hibaüzenet nem segítene senkin.",
            },
            {
              title: "Lógó hivatkozás nincs",
              body: "Ha a kiválasztott szállás időközben törlődött, a hivatkozás null-ra vált betöltéskor. Az alternatíva egy olyan úti cél lenne, ami nem létező szállásra hivatkozik.",
            },
          ],
        },
        {
          kind: "figure",
          src: "/nyaralas_profilok.png",
          alt: "A Profilok panel: „USA 2027” és az aktív „Mediterrán nyaralás” profil, mindkettő átnevezhető és másolható, fent Kimentés és Betöltés gombokkal.",
          width: 2500,
          height: 412,
          caption:
            "Profilok: több párhuzamos kutatás egy böngészőben. Ugyanaz a normalizáló futtatja mindet.",
          bleed: true,
        },
      ],
    },

    /* ------------------------------------------------------------ a kód */
    {
      id: "megosztas",
      nav: "A megosztás",
      kicker: "A nehéz rész",
      title: "Megosztás szerver nélkül: egyetlen bemásolható kód",
      lede: "Ha nincs adatbázis, nincs megosztható link sem. A megoldás nem titkosítás — hanem egy kód, ami túléli az utat.",
      blocks: [
        {
          kind: "text",
          body: [
            "Az adatbázis nélküli működés egyetlen valódi ára, hogy nincs mit megosztani. Pedig a nyaralástervezés ritkán magánügy: az ember átküldi a családnak, vagy átviszi a laptopról a másik gépre. Erre a klasszikus válasz egy fájl exportálása lenne — de a JSON-fájl a gyakorlatban rosszul utazik. A chatalkalmazások és a levelezők újratördelik, idézőjeleket cserélnek, a sortöréseket elnyelik.",
            "Ezért a kimentés nem fájl, hanem **egyetlen, szóköz nélküli sor szöveg**. Az állapot JSON-ná alakul, UTF-8 bájtokká kódolódik, majd base64url-be — az a változat, ami `+` és `/` helyett `-` és `_` karaktereket használ, tehát URL-ben, chatablakban és terminálban is sértetlen marad.",
          ],
        },
        {
          kind: "figure",
          src: "/nyaralas_copypaste.png",
          alt: "A Kimentés párbeszédablak: a NYARALAS1: előtagú, egysoros base64url kód szövegdobozban, alatta „1 profil, 5 úti cél” összegzés és Másolás gomb.",
          width: 1156,
          height: 660,
          caption:
            "„Egyetlen sor, szóköz nélkül — e-mailben és chatben is épségben átér.” A súgószöveg pontosan azt ígéri, amit a formátum tud.",
        },
        {
          kind: "text",
          body: [
            "Fontos tisztázni, mert a kód ránézésre annak látszik: **ez nem titkosítás.** A base64url kódolás, nem rejtjelezés — aki megkapja a kódot, vissza tudja fejteni. Nem is ez a dolga. Amit ad, az a hordozhatóság és a formátum-integritás, a bizalmasságot pedig maga a felépítés adja: az adat sosem hagyja el a böngészőt, hacsak a felhasználó maga nem küldi el valakinek. Egy „titkosítottnak” hirdetett base64 rosszabb lenne a semminél, mert hamis biztonságérzetet adna.",
            "A nehézség nem a kódolás volt, hanem minden, ami körülötte van: mi történik, ha valaki rossz kódot illeszt be.",
          ],
        },
        {
          kind: "code",
          label: "src/lib/transfer.ts",
          lines: [
            "/**",
            " * Marks a string as one of ours and pins the format version, so a mistyped or",
            " * truncated paste fails with an explanation instead of a stack trace.",
            " */",
            'const PREFIX = "NYARALAS1:";',
            "",
            "/**",
            " * One destination on its own. A separate prefix from the profile code above,",
            " * because the two are pasted into different boxes and telling someone \"this is",
            " * the other kind of code\" beats letting a profile land in the form.",
            " */",
            'const DESTINATION_PREFIX = "NYARALASCEL1:";',
          ],
        },
        {
          kind: "points",
          items: [
            {
              title: "Kétféle kód, kétféle előtag",
              body: "Egy teljes profil és egy önálló úti cél két különböző dobozba való. Ha valaki a profilkódot illeszti az űrlapba, nem „érvénytelen kód” üzenetet kap, hanem azt, hogy ez a másik gomb — a leggyakoribb hiba javítása így egy kattintás, nem újramásolás.",
            },
            {
              title: "A tördelt kód is jó kód",
              body: "Beolvasás előtt minden whitespace kiesik. Ha a levelezőprogram hat sorba törte a kódot, az attól még ugyanaz a kód.",
            },
            {
              title: "Nyers JSON is elfogadott",
              body: "Ha a beillesztett szöveg `{`-tel kezdődik, a program JSON-ként olvassa. Az emberek azt illesztik be, ami a kezük ügyében van.",
            },
            {
              title: "Az importálás sosem ír felül",
              body: "Két azonos nevű profilból „Nyár” és „Nyár (2)” lesz. A már számozott név pedig a saját számától folytatja, tehát „Nyár (2)”-ből „Nyár (3)” lesz, nem „Nyár (2) (2)”.",
            },
            {
              title: "Friss azonosítók érkezéskor",
              body: "A beolvasott úti cél és minden szállása új azonosítót kap. Enélkül egy ugyanabban a böngészőben beillesztett másolat visszanyúlhatna abba az elembe, amelyikből származik.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "A beérkező kód ugyanazon a normalizálón megy át, mint a tárolt adat. Ez nem kényelmi döntés: a beillesztett kód a rendszer egyetlen olyan bemenete, amit tetszőleges ember tetszőlegesen átírhatott, tehát pontosan itt kell a legszigorúbbnak lenni. Egy kézzel szerkesztett kód így nem tud érvénytelen alakot betenni az állapotba.",
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- OG */
    {
      id: "og",
      nav: "OG-olvasó",
      kicker: "Backend",
      title: "Az OG-olvasó API, és a fal, amibe beleszalad",
      lede: "Egy szállás-link bemásolásából névnek, képnek és helynek kell lennie. Az egyetlen szerveroldali végpont ezt csinálja — és azt is megoldja, amikor nem sikerül.",
      blocks: [
        {
          kind: "text",
          body: [
            "Az egész alkalmazásban egyetlen szerveroldali útvonal van: `/api/og`. Kap egy szállás-URL-t, letölti az oldalt, kiolvassa az OpenGraph metaadatokat, és visszaadja a négy mezőt, amiből a szálláskártya áll — cím, kép, hely, forrásoldal. Böngészőből ezt közvetlenül nem lehetne megtenni, a CORS megakadályozza; ezért van egyáltalán backend.",
            "A HTML-t szándékosan reguláris kifejezésekkel dolgozom fel, nem DOM-parserrel. A listaoldalak nagyok és gyakran hibás felépítésűek, nekünk viszont csak néhány `<head>`-beli tag kell — egy parser bevonása itt csak függőség lenne, haszon nélkül.",
          ],
        },
        {
          kind: "points",
          items: [
            {
              title: "600 KB-nál elvágva",
              body: "A választ streamelve olvasom, és amint a `</head>` lezárul, elengedem a kapcsolatot. Egy Booking-oldal több megabájtnyi értékelés-markupot hoz magával, amiből egy bájtra sincs szükség.",
            },
            {
              title: "8 másodperces időkorlát",
              body: "Kényelmesen a platform saját limitje alatt, hogy egy lassú listaoldal a mi olvasható hibaüzenetünket adja, ne egy értelmezhetetlen gateway-hibát.",
            },
            {
              title: "Belső címek tiltva",
              body: "A loopback, a link-local és az RFC1918 tartományok blokkolva vannak, hogy egy beillesztett URL-lel ne lehessen a szervert a saját belső hálózatának pásztázására használni.",
            },
          ],
        },
        {
          kind: "text",
          body: [
            "És itt jött a projekt legtanulságosabb pontja. A generikus szállásoldalakon mindez működik. A Booking, az Airbnb és az Expedia viszont — vagyis pontosan az a két-három oldal, amire az eszköz valójában irányul — az OpenGraph adatait néven nevezett keresőrobotok engedélyezőlistája mögé zárja. Minden más kérésre kihívás-oldalt küldenek: a Booking egy 4 KB-os törzset ad vissza, 202-es státusszal.",
            "Ezt egyetlen módon lehetne megkerülni: egy konkrét cég keresőrobotjának kiadva magunkat. Ezt az alkalmazás nem teszi meg. Ehelyett a kudarcot terméktulajdonságként kezeli.",
          ],
        },
        {
          kind: "quote",
          text: "A letiltott beolvasás nem hiba, hanem várható kimenetel — a felület kezeli, nem kivételként dobja.",
          source: "src/app/api/og/route.ts",
        },
        {
          kind: "text",
          body: [
            "A végpont ezért elérhető, de olvashatatlan oldalnál is 200-as választ ad, egy `ok` megkülönböztető mezővel. Egy robotellenőrzés nem ugyanaz, mint egy hálózati hiba, és ha HTTP-hibaként modelleznénk, a kliens nem tudná a kettőt megkülönböztetni. Ami viszont ennél is fontosabb: **a sikertelen válasz is hoz adatot.**",
          ],
        },
        {
          kind: "code",
          label: "src/app/api/og/route.ts",
          lines: [
            "/**",
            " * A failure still carries `fallback`: whatever could be worked out from the",
            " * URL itself. The client fills the card with it so a blocked lookup leaves the",
            " * user correcting a name rather than typing one from nothing.",
            " */",
            "export type OgFailure = { ok: false; reason: string; fallback: HotelMeta };",
          ],
        },
        {
          kind: "text",
          body: [
            "A tartalék adat magából az URL-ből készül, hálózat nélkül. És ez nem szépségtapasz: a Booking címsora tartalmazza a szállás azonosítóját és egy ISO országkódot — a `/hotel/at/austria-trend-europa-wien` útvonalból kijön az „Austria Trend Europa Wien” név és az „Ausztria” ország is. Arra a két oldalra, amire az eszköz irányul, a bemásolt link az egyetlen elérhető igazságforrás.",
            "A többi élsimítás ugyanezt a logikát követi. A Booking a szállás nevét lokalizációtól és A/B-teszttől függő reklámszöveggel csomagolja körbe — ezért nem egy, hanem több mintát vágok le róla. Az Airbnb címsora „Condo in Split, Croatia · ★4,92 · 2 bedrooms” alakú, amiből a név és a hely szétválasztható. És ha egy oldal hibaoldalt ad vissza, azt a program felismeri, mert enélkül a felhasználónak egy „404 Page Not Found” nevű szállása lenne — ami adatnak látszik, pedig nem az.",
          ],
        },
        {
          kind: "problem",
          problem:
            "A célként kitűzött szállásoldalak technikailag nem engedik a metaadatok automatikus kiolvasását, és ezen tisztességes úton nem lehet átmenni.",
          solution:
            "Az API minden kudarchoz megnevezi az okot és mellékeli az URL-ből kinyerhető adatot. A felhasználó így egy előre kitöltött nevet javít, nem egy üres mezőt tölt ki — a beolvasás megbukhat anélkül, hogy a folyamat megakadna.",
        },
      ],
    },

    /* -------------------------------------------------------- részletek */
    {
      id: "reszletek",
      nav: "Részletek",
      kicker: "Kidolgozás",
      title: "A vágólap, ami mindenhol működik",
      blocks: [
        {
          kind: "text",
          body: [
            "A másolás az egész megosztási folyamat szűk keresztmetszete: ha a Másolás gomb nem működik, a funkció nem létezik. A modern `navigator.clipboard` API viszont csak biztonságos környezetben érhető el, és a felhasználó megtagadhatja — ezért a másolás mögött tartalék megoldás áll, és a gomb minden esetben visszajelez, hogy sikerült-e.",
            "Ugyanez a gondolkodás végigmegy a felületen: a származtatott értékek sosem csak színnel jelölik, hogy melyik olcsóbb — szövegben és sorrendben is ott van, mert a színre épülő jelentés akadálymentességi zsákutca. A mozgás mindenhol követi a `prefers-reduced-motion` beállítást, a kontrasztok pedig a halvány kiegészítő számokon is megfelelnek a WCAG 2.1 AA szintnek.",
          ],
        },
        {
          kind: "stats",
          items: [
            { value: "1", label: "szerveroldali végpont" },
            { value: "0", label: "adatbázis és fiók" },
            { value: "4", label: "mező egy szálláskártyán" },
            { value: "AA", label: "WCAG 2.1 célszint" },
          ],
        },
      ],
    },
  ],

  takeaway: [
    "A projekt tanulsága nem a base64 és nem a metaadat-olvasás. Az, hogy a megszorítások — nincs adatbázis, nincs fiók, a céloldalak nem engedik be a robotokat — nem akadályok voltak, amiket meg kellett kerülni, hanem a termék alakját meghatározó döntések.",
    "Egy megrendelői projektben ugyanez a gondolkodás annyit jelent, hogy nem építek szervert oda, ahol nincs rá szükség, nem ígérek titkosítást ott, ahol kódolás van, és minden külső rendszernél, amitől függ az oldal, végiggondolom, mi történik akkor, amikor az a rendszer nem válaszol. Mert egyszer nem fog.",
  ],
};
