import { Locale } from '@qualweb/locale';

export const sv: Locale = {
  'act-rules': {
    'QW-ACT-R1': {
      name: 'På HTML-sidan finns en rubrik',
      description: 'Denna regel kontrollerar att HTML-sidan har ett `title`-element.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Title`-elementet hittas och är inte tomt.',
        F1: '`Title`-elementet hittas inte.',
        F2: '`Title`-elementet är tomt.',
        F3: '`Title`-elementet som hittats är inte sidans rubrik.'
      }
    },
    'QW-ACT-R2': {
      name: '`Html`-elementet innehåller attributet `lang`',
      description:
        'TDenna regel kontrollerar att elementet `html` har ett `lang`- eller `xml:lang`-attribut som inte är tomt.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Lang`-attributet hittades och ett värde har fastställts för det.',
        F1: '`Lang`-attributet hittats inte eller är tomt.'
      }
    },
    'QW-ACT-R3': {
      name: 'HTML-elementets `lang` och `xml:lang` motsvarar varandra',
      description:
        'Denna regel kontrollerar om elementet `html` innehåller både `lang` och `xml:lang`-attribut och de inte är tomma, att deras värden motsvarar varandra.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Attributen `lang` och `xml:lang’ har samma värde.',
        F1: 'Attributen `lang’ och `xml:lang’ motsvarar inte varandra.'
      }
    },
    'QW-ACT-R4': {
      name: 'Ingen fördröjning vid omladdning av elementet `meta`',
      description:
        'Denna regel kontrollerar att elementet `meta’ inte har använts för fördröjd omdirigering eller omladdning.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet laddas om eller omdirigeras omedelbart.',
        P2: 'Objektet laddas om eller omdirigeras efter mer än 20 timmar.',
        F1: 'Objektet laddas om efter {seconds} sekunder.',
        F2: 'Objektet omdirigeras efter {seconds} sekunder.'
      }
    },
    'QW-ACT-R5': {
      name: 'Dugligheten för `html`-elementets `lang`-attribut',
      description: 'Denna regel kontrollerar att attributet `lang` eller `xml:lang` har en godkänd språkkod.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Lang`-attributet innehåller en godkänd språkkod.',
        F1: '`Lang`-attributet innehåller ingen godkänd språkkod.'
      }
    },
    'QW-ACT-R6': {
      name: 'Knappar i form av bilder har ett tillgängligt namn',
      description: 'Denna regel kontrollerar att varje knapp som är i form av en bild har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn.'
      }
    },
    'QW-ACT-R7': {
      name: 'Positioneringen på sidan är inte begränsad med CSS:s `transform`-regel',
      description:
        'Denna regel kontrollerar att sidans innehåll inte är begränsat till horisontellt eller vertikalt läge med CSS:s `transform`-regel.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Funktionen `rotateZ` i CSS:s `transform`-regel på sidan används tillsammans med `orientation`-villkoret på ett sätt som inte begränsar elementet vertikalt eller horisontellt till visningssättet.',
        F1: 'Funktionen `rotate` i CSS:s `transform`-regel på sidan används tillsammans med `orientation`-villkoret på ett sätt som begränsar elementet vertikalt eller horisontellt till visningssättet.'
      }
    },
    'QW-ACT-R9': {
      name: 'Länkar med samma tillgängliga namn har också samma betydelse',
      description:
        'Denna regel kontrollerar att länkar med samma tillgängliga namn leder till samma eller motsvarande innehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Länkar med samma tillgängliga namn leder till samma innehåll.',
        F1: 'Länkar med samma tillgängliga namn leder till olika innehåll. Kontrollera att innehållen motsvarar varandra.'
      }
    },
    'QW-ACT-R10': {
      name: '`Iframe`-element med samma tillgängliga namn har också samma syfte',
      description:
        'Denna regel kontrollerar att `iframe`-element med samma tillgängliga namn används samma eller motsvarande innehåll vid inbäddning.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Iframe`-element med samma tillgängliga namn har samma innehåll.',
        F1: '`Iframe`-element med samma tillgängliga namn har olika innehåll.'
      }
    },
    'QW-ACT-R11': {
      name: 'Knappen har ett tillgängligt namn',
      description: 'Denna regel kontrollerar att varje knapp-element har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R12': {
      name: 'Länken har ett tillgängligt namn',
      description: 'Denna regel kontrollerar att varje länk har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R13': {
      name: 'Element för vilka attributet `aria-hidden` har definierats har inget fokuserat innehåll',
      description:
        'Denna regel kontrollerar att element med attributet `aria-hidden` inte innehåller underelement som kan ställas i fokus.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets underelement kan inte ställas i fokus.',
        P2: 'Objektet kan inte fokuseras.',
        F1: 'Objektet har underelement som ställas i fokus.',
        F2: 'Objektet kan ställas i fokus.'
      }
    },
    'QW-ACT-R14': {
      name: '`Meta viewport’ förhindrar inte zoomning',
      description: 'Denna regel kontrollerar att `meta`-elementet bibehåller webbläsarens zoomfunktion.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Meta`-element med `name=viewport`-attribut definierar inte värdena `maximum-scale` eller `user-scalable`.',
        P2: 'Ett `meta`-element med attribut `name=viewport` gör det möjligt att använda webbläsarens zoomfunktion.',
        F1: 'Ett `meta`-element med attribut `name=viewport` tar bort möjligheten att zooma i webbläsaren med hjälp av definitionerna `user-scalable=no` eller `maximum-scale< 2`.'
      }
    },
    'QW-ACT-R15': {
      name: 'Ljud- eller videoinnehåll innehåller inte ljud som spelas upp automatiskt',
      description:
        'Denna regel kontrollerar att den automatiska uppspelningen av ljudinnehållet inte varar längre än tre (3) sekunder, eller att det finns en mekanism för att stoppa eller dämpa ljudinnehållet.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R16': {
      name: 'Blankettelementet har ett tillgängligt namn',
      description: 'Blankettelementet har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R17': {
      name: 'Bilden har ett tillgängligt namn',
      description:
        'Denna regel kontrollerar att alla bilder som inte är märkta som dekorativa måste ha ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Målet är dekorativt.',
        P2: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn.'
      }
    },
    'QW-ACT-R18': {
      name: '`Id`-attributets värde är unikt',
      description: 'Denna regel kontrollerar att varje `id`-attribut på samma sida har ett unikt värde.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Värdet för objektets `id`-attributet är unikt',
        F1: 'Flera element har samma värde för `id`-attributet.'
      }
    },
    'QW-ACT-R19': {
      name: '`Iframe`-elementet har ett tillgängligt namn',
      description: 'Denna regel kontrollerar att varje `iframe`-elementet har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R20': {
      name: '`Role`-attributet har ett tillåtet värde',
      description: 'Denna regel kontrollerar att varje `role`-attribut har ett tillåtet värde.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillåtet värde i `role`-attributet.',
        F1: 'Värdet för objektets `role`-attribut är felaktigt.'
      }
    },
    'QW-ACT-R21': {
      name: '`Svg `-element med en explicit roll ska ha ett tillgängligt namn',
      description:
        'Denna regel kontrollerar att varje bild i formatet `svg’,  som explicit har inkluderats i innehållsmodellen för tillgänglighet, har ett tillgängligt namn.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R22': {
      name: 'Värde för `lang`-attributet för element inom `body` element är tillåtet.',
      description:
        'Denna regel kontrollerar att attributet `lang` för element inom sidans `body` innehåller en godkänd språkkod.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets `lang`-attribut innehåller en godkänd språkkod.',
        F1: 'Språkkoden för objektets `lang`-attribut är felaktig.'
      }
    },
    'QW-ACT-R23': {
      name: 'Det synliga innehållet i videon måste ges ett tillgängligt alternativ',
      description:
        'Denna regel kontrollerar att det i videor som innehåller ljud finns ett alternativ till visuellt innehåll även i ljud- eller textform.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R24': {
      name: '`Autocomplete`-attributet har ett tillåtet värde',
      description: 'Denna regel kontrollerar att HTML:s attribut `autocomplete` har ett tillåtet värde.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets `autocomplete`-attribut har ett tillåtet värde',
        F1: 'Värdet för objektets `autocomplete`-attribut är felaktigt.'
      }
    },
    'QW-ACT-R25': {
      name: 'Det är tillåtet att använda ARIA-läget eller -egenskapen.',
      description: 'Denna regel kontrollerar att WAI-ARIA-lägen och -egenskaper har använts endast i tillåtna element.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`{attr}`-egenskapen stöds eller hämtas från rollen `{role}`.',
        F1: '`{attr}`-egenskapen har varken hämtats från eller stöds för rollen `{role}`.'
      }
    },
    'QW-ACT-R26': {
      name: 'Videons ljudinnehåll har ett tillgängligt alternativ',
      description: 'Denna regel kontrollerar att det finns ett alternativt sätt att återge videons ljudinnehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R27': {
      name: 'Attributet ARIA finns i WAI-ARIA-dokumentationen',
      description:
        'Denna regel kontrollerar att varje aria-*`-attribut som används har definierats i WAI-ARIA 1.1-dokumentationen.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Alla attribut som förekommer i elementet och börjar med `aria` ingår i WAI-ARIA 1.1-definitionerna.',
        F1: 'Ett eller flera attribut som börjar med `aria` ingår inte i WAI-ARIA 1.1-definitionerna.'
      }
    },
    'QW-ACT-R28': {
      name: 'Ett element för vilket ett `role`-attribut har definierats har också de statusar och egenskaper som krävs',
      description:
        'Denna regel kontrollerar att element för vilka ett `role`-attribut har definierats också har tilldelats alla statusar och egenskaper som krävs i samband med `role`-attributet i fråga.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Alla obligatoriska attribut för objektelementet har angetts.',
        P2: 'Objektelementets `role`-attribut innehåller inga obligatoriska status- eller egenskapsdefinitioner.',
        F1: 'Objektets element saknar de status- eller egenskapsdefinitioner som krävs.'
      }
    },
    'QW-ACT-R29': {
      name: 'Ljudelementets innehåll kan också fås som text',
      description: 'Denna regel kontrollerar om det finns ett textalternativ till innehåll som endast består av ljud.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R30': {
      name: 'Elementets synliga namn är en del av dess tillgängliga namn',
      description:
        'Denna regel kontrollerar att det är det visuellt synliga namnet som är en del av det tillgängliga namnet för interaktiva element.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets synliga text motsvarar helt och hållet eller är en del av dess tillgängliga namn.',
        F1: 'Objektet har inte ett tillgängligt namn.',
        F2: 'Objektets synliga text motsvarar inte det tillgängliga namnet och är inte en del av det.'
      }
    },
    'QW-ACT-R31': {
      name: 'Det synliga innehållet i en ljudlös video måste ges ett tillgängligt alternativ',
      description:
        'Denna regel kontrollerar att datainnehållet i en video som saknar ljudinnehåll också finns tillgängligt i alternativ form.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R32': {
      name: 'Det synliga innehållet i videon måste ges ett tillgängligt alternativ',
      description: 'Denna regel kontrollerar att videor som innehåller ljud även innehåller syntolkning.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R33': {
      name: 'ARIA:s obligatoriska roll i kontexten',
      description:
        'Denna regel kontrollerar att ett element som har en explicit semantisk roll finns i den kontext som denna roll förutsätter.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets moderelement har den roll som kontexten kräver.',
        F1: 'Objektets moderelement har inte den roll som kontexten kräver.'
      }
    },
    'QW-ACT-R34': {
      name: 'ARIA-statusen eller -egenskap har ett tillåtet värde',
      description: 'Denna regel kontrollerar att varje angiven ARIA-status och -egenskap har ett tillåtet värde.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets `{attr}`-attribut har ett tillåtet värde',
        F1: 'Värdet för objektets `{attr}`-attribut är felaktigt.'
      }
    },
    'QW-ACT-R35': {
      name: 'Rubriken har ett tillgängligt namn',
      description:
        'Denna regel gäller alla HTML-element som till sin semantiska betydelse definieras som rubriker och som ingår i innehållsmodellen för tillgänglighet.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn som inte är tomt.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt (``).'
      }
    },
    'QW-ACT-R36': {
      name: 'Cellens `headers`-attribut avser en cell i samma tabellelement.',
      description:
        'Denna regel kontrollerar att cellens `headers`-attribut avser en cell i samma tabell som är av semantisk betydelse för kolumnens eller radens rubrik.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Alla värden i attributet `headers` hänvisar till rubrikceller i kolumnen och raden i samma tabell.',
        F1: '`Headers`-attributets värde `{attr}` hänvisar till elementets `id`-värde som inte förekommer i samma tabell.',
        F2: '`Headers`-attributets värde `{attr}` hänvisar till ett element i samma tabell som inte är kolumnens eller radens rubrik.'
      }
    },
    'QW-ACT-R37': {
      name: 'Texten uppfyller minimikraven för kontrast',
      description:
        'Denna regel kontrollerar att den största möjliga kontrasten mot bakgrunden för varje tecken i texten uppfyller minimikraven för kontrast.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Elementets kontrast överskrider minimikraven.',
        P2: 'Med elementets tecken presenteras inte text på ett naturligt språk.',
        P3: 'Elementets kontrast mot bakgrundens gradientfärg överskrider minimikraven.',
        W1: 'Elementets text har skuggning som kräver manuell granskning.',
        W2: 'Bakom elementet finns en bild.',
        W3: 'Elementet har en gradientfärg som vi inte kan verifiera.',
        F1: 'Elementets kontrast uppfyller inte minimikraven.',
        F2: 'Elementets kontrast mot bakgrundens gradientfärg uppfyller inte minimikraven.'
      }
    },
    'QW-ACT-R38': {
      name: 'Dedikerade element som krävs av ARIA',
      description:
        'Denna regel kontrollerar att ett element som har en explicit semantisk roll har minst ett dedikerat element som rollen kräver.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet tillägnar endast element som har den roll som krävs.',
        F1: 'Objektet tillägnar element som inte har den roll som krävs.'
      }
    },
    'QW-ACT-R39': {
      name: 'Alla rubrikceller i tabellen riktar sig till innehållsceller',
      description:
        'Denna regel kontrollerar att varje rubrikcell i tabellelementet riktar sig till någon innehållscell.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Kolumnens rubrikelement riktar sig till åtminstone en cell.',
        F1: 'Kolumnens rubrikelement riktar sig inte till någon cell.'
      }
    },
    'QW-ACT-R40': {
      name: 'CSS:s `overflow`-definition kommer inte att beskära den zoomade texten.',
      description:
        'Denna regel kontrollerar att texterna inte oavsiktligt beskärs med `overflow`-definitionen när sidan zoomas med 200 % i en vy på 1280 x 1024.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att texterna eller de element som ramar in dem inte beskärs med `overflow`-definitionen.'
      }
    },
    'QW-ACT-R41': {
      name: 'Felmeddelandet förklarar felet i blankettfältets inmatning.',
      description:
        'Denna regel kontrollerar att när användaren har matat in ett felaktigt värde i fältet på blanketten eller gett det i felaktig form anger felmeddelandet orsaken till felet eller hur det kan korrigeras.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att felmeddelandet anger orsaken till felet eller hur det kan korrigeras.'
      }
    },
    'QW-ACT-R42': {
      name: '`Object`-elementet har ett tillgängligt namn som inte är tomt.',
      description: 'Denna regel kontrollerar att varje `object`-element har ett tillgängligt namn som inte är tomt.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn som inte är tomt.',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R43': {
      name: 'Skrollbart element är åtkomligt med ett tangentbord',
      description: 'Denna regel kontrollerar att man kan skrolla skrollbara element enbart med hjälp av tangentbordet.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Denna skrollbara del ingår i navigerbart innehåll som fokuseras in i ordningsföljd.',
        F1: 'Detta vertikalt eller horisontellt skrollbara delelement ingår inte i det navigerbara innehållet som fokuseras i ordningsföljd och innehåller inte heller sådana underelement.'
      }
    },
    'QW-ACT-R44': {
      name: 'Länkar i samma sammanhang och som har samma tillgängliga namn har samma användningsändamål.',
      description:
        'Denna regel kontrollerar att länkar i samma sammanhang och med samma tillgängliga namn returnerar samma eller motsvarande innehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Länkar med samma tillgängliga namn hänvisar till samma innehåll.',
        W1: 'Länkar med samma tillgängliga namn hänvisar till olika innehåll. Se till att innehållet stämmer överens.'
      }
    },
    'QW-ACT-R48': {
      name: 'Dekorativa element syns inte i tillgänglighetsträdet',
      description:
        'Denna regel kontrollerar att element som betecknats som dekorativa inte ingår i innehållsmodellen för tillgänglighet eller att de endast har en visualiserande roll.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet ingår inte i innehållsmodellen för tillgänglighet.',
        F1: 'Objektet ingår i innehållsmodellen för tillgänglighet.'
      }
    },
    'QW-ACT-R49': {
      name: 'Ljud- eller videoinnehåll som spelas upp automatiskt innehåller inget ljud som varar över tre (3) sekunder',
      description:
        'Ljud- eller videoinnehåll som spelas upp automatiskt producerar inte ljud som varar mer än tre (3) sekunder.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektets uppspelning tar tre (3) sekunder eller mindre.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att objektet har synliga funktioner för att hantera det.'
      }
    },
    'QW-ACT-R50': {
      name: 'Ljud- eller videoinnehåll som spelas upp automatiskt har styrverktyg.',
      description:
        'För ljud- eller videoinnehåll som spelas upp automatiskt måste det finnas funktioner för att hantera det.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har synliga styrverktyg.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att objektet har synliga funktioner för att hantera det.'
      }
    },
    'QW-ACT-R51': {
      name: 'Videons synliga innehåll är mediemotsvarighet till texten',
      description:
        'Denna regel kontrollerar att en videoinspelning som endast innehåller bild är mediemotsvarighet till texten på sidan.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att innehållet i videoinspelningen motsvarar texten.'
      }
    },
    'QW-ACT-R52': {
      name: 'Det finns textningsspår för syntolkning av videoinnehållet i en video som inte innehåller ljud',
      description:
        'Denna regel kontrollerar att textningsspåren för syntolkning av videoinspelningar som inte innehåller ljud beskriver det synliga innehållet.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att det finns ett tillgängligt alternativ till det synliga innehållet.'
      }
    },
    'QW-ACT-R53': {
      name: 'Video med endast visuellt innehåll har transkription.',
      description: 'All synlig information i en videoinspelningen som inte innehåller ljud ska ha en transkription.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att det finns ett tillgängligt alternativ till det synliga innehållet.'
      }
    },
    'QW-ACT-R54': {
      name: 'Videoinspelningar med visuellt innehåll kan ges alternativt som ljudupptagningar.',
      description:
        'För videoinspelningar som inte innehåller ljud måste det finnas ett alternativ i form av en ljudupptagning.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att det finns ett tillgängligt alternativ till det synliga innehållet.'
      }
    },
    'QW-ACT-R55': {
      name: 'För synligt innehåll i videon ges syntolkning',
      description:
        'Denna regel kontrollerar att allt synligt innehåll i videoinspelningen också finns på videons ljudspår.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Målelementet har ljudspår, men det gick inte att verifiera dess styrka. Kontrollera att objektet har ett ljudspår och i förekommande fall att det finns ett tillgängligt alternativ till det synliga innehållet i videon.'
      }
    },
    'QW-ACT-R56': {
      name: 'Videon är mediemotsvarigheten till texten',
      description: 'Denna regel kontrollerar att en videoinspelning är mediemotsvarighet till texten på sidan.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Kontrollera att innehållet i videoinspelningen motsvarar texten.'
      }
    },
    'QW-ACT-R57': {
      name: 'Textspår för syntolkning av videons synliga innehåll',
      description:
        'Denna regel kontrollerar att textningsspåren för syntolkning av videoinspelningar beskriver det synliga innehållet.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Målelementet har ljudspår, men det gick inte att verifiera dess styrka. Kontrollera att objektet har ett ljudspår och i förekommande fall att det finns ett tillgängligt alternativ till det visuella innehållet i videon.'
      }
    },
    'QW-ACT-R58': {
      name: 'Ljudupptagningen har en transkription',
      description: 'Ljudupptagningar ska ha ett textalternativ som innehåller all ljudinformation.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att det finns ett textalternativ till objektets ljudspår.'
      }
    },
    'QW-ACT-R59': {
      name: 'Ljudupptagningen är mediemotsvarigheten till texten',
      description: 'Denna regel kontrollerar att en ljudupptagning är mediemotsvarighet till texten på sidan.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att innehållet i ljudupptagningen motsvarar texten.'
      }
    },
    'QW-ACT-R60': {
      name: 'Videons ljudinnehåll har textning',
      description: 'TDenna regel kontrollerar att det finns textning för videoinspelningens ljudinnehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Målelementet har ljudspår, men det gick inte att verifiera dess styrka. Kontrollera att objektet har ett ljudspår och om det finns en motsvarande textning för ljudinnehållet.'
      }
    },
    'QW-ACT-R61': {
      name: 'Det finns en transkription för videoelementets ljud- och bildinnehåll.',
      description:
        'Denna regel kontrollerar att det inspelade videoinnehållet har en transkription som täcker allt ljud- och bildinnehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Det gick inte att få information om målelementet.',
        W2: 'Målelementet har ljudspår, men det gick inte att verifiera dess styrka. Kontrollera att objektet har ljudspår och transkription. I förekommande fall, kontrollera att transkriptionen beskriver allt ljud- och bildinnehåll på videon.'
      }
    },
    'QW-ACT-R62': {
      name: 'Ett element som hör till innehåll som fokuseras ordningsföljd har ett synligt fokus',
      description:
        'Denna regel kontrollerar att varje element som fokuseras ordningsföljd har någon synlig indikation på fokuset.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att elementet har någon synlig indikation på fokuset.'
      }
    },
    'QW-ACT-R63': {
      name: 'Dokumentet har ett landmärke för innehåll som inte upprepas',
      description:
        'Denna regel kontrollerar att varje sida har ett element vars semantiska betydelse är att vara ett landmärke för innehåll som inte upprepas.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Sidan innehåller inget innehåll som upprepas.',
        W1: 'Kontrollera att det antingen inte finns innehåll som inte upprepas på sidan efter upprepat innehåll eller att det förekommer ett element som uppfyller följande villkor: elementet har semantisk betydelse som landmärke, det första underelementet som observeras i elementets utskriftsordning är innehåll som inte upprepas efter upprepat innehåll och elementet ingår i innehållsmodellen för tillgänglighet.'
      }
    },
    'QW-ACT-R64': {
      name: 'Dokumentet har en rubrik för innehåll som inte upprepas',
      description: 'Denna regel kontrollerar att det finns en rubrik för innehåll som inte upprepas.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Sidan innehåller inget innehåll som upprepas.',
        W1: 'Kontrollera att det antingen inte finns innehåll som inte upprepas på sidan efter upprepat innehåll eller att det förekommer ett element som uppfyller följande villkor:  elementet är innehåll som inte upprepas efter upprepat innehåll; elementet har semantisk betydelse som rubrik; elementet syns och elementet ingår i innehållsmodellen för tillgänglighet.'
      }
    },
    'QW-ACT-R65': {
      name: 'Element som endast innehåller visualiserande underelement har inget fokuserat innehåll',
      description:
        'Denna regel kontrollerar att element vars roll gör deras underelement endast visualiserande inte innehåller fokuserade element.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'I utskriftshierarkin har elementet inga underelement som fokuseras i ordningsföljd.',
        F1: 'I utskriftshierarkin har elementet underelement som fokuseras i ordningsföljd.'
      }
    },
    'QW-ACT-R66': {
      name: 'I menyn finns ett tillgängligt namn som inte är tomt',
      description:
        'Denna regel kontrollerar att varje element som har en `menuitem`-roll har ett tillgängligt namn som inte är tomt.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet har ett tillgängligt namn som inte är tomt',
        F1: 'Objektet har inte ett tillgängligt namn eller är tomt.'
      }
    },
    'QW-ACT-R67': {
      name: 'I stildefinitionerna har mellanrummet mellan bokstäverna inte definierats med `!important`-regeln',
      description:
        'Denna regel kontrollerar att stildefinitionerna inte har hindrat bearbetning av bokstävernas mellanrum med `!important`-regeln, utom när värdet på definitionen `letter-spacing` är minst 0,12 gånger bokstavens storlek.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Letter-spacing`-egenskapen har ingen `!important`-definition.',
        P2: '`Letter-spacing`-värdet är minst 0,12 gånger bokstavens storlek.',
        P3: 'Det `letter-spacing`-värde som fastställts för elementet är inte detsamma som det värde som antecknats för elementet.',
        F1: 'CSS-reglerna hindrar `letter-spacing`-värdet från att uppfylla minimikravet.'
      }
    },
    'QW-ACT-R68': {
      name: 'I stildefinitionerna har radhöjden inte definierats med `!important`-regeln',
      description:
        'Denna regel kontrollerar att stildefinitionerna inte har hindrat bearbetning av radhöjden med `!important`-regeln, utom när radhöjden är minst 1,5 gånger bokstavens storlek.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Line-height`-egenskapen har ingen `!important`-definition.',
        P2: '`Line-height`-värdet är minst 1,5 gånger bokstavens storlek..',
        P3: 'Det `line-height`-värde som fastställts för elementet är inte detsamma som det värde som antecknats för elementet.',
        F1: 'CSS-reglerna hindrar `line-height`-värdet från att uppfylla minimikravet.'
      }
    },
    'QW-ACT-R69': {
      name: 'I stildefinitionerna har mellanrummet mellan ord inte definierats med `!important`-regeln',
      description:
        'Denna regel kontrollerar att stildefinitionerna inte har hindrat bearbetning av ordens mellanrum med `!important`-regeln, utom när värdet på definitionen `word-spacing` är minst 0,16 gånger bokstavens storlek.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: '`Word-spacing`-egenskapen har ingen `!important`-definition.',
        P2: '`Word-spacing`-värdet är minst 0,16 gånger bokstavens storlek.',
        P3: 'Det `word-spacing`-värde som fastställts för elementet är inte detsamma som det värde som antecknats för elementet.',
        F1: 'CSS-reglerna hindrar `word-spacing`-värdet från att uppfylla minimikravet.'
      }
    },
    'QW-ACT-R70': {
      name: '`Iframe` med negativt `tabindex`-attribut innehåller inga interaktiva element',
      description:
        'Denna regel kontrollerar att ett `iframe`-element vars `tabindex`-attribut har ett negativt värde inte innehåller interaktiva element.',
      results: {
        I1: 'Inga objekt hittades.',
        RC1: 'Den inkluderade kontexten innehåller inga element som är synliga och fokuseras i ordningsföljd.',
        RC2: 'Den inkluderade kontexten innehåller element som är synliga och fokuseras i ordningsföljd.'
      }
    },
    'QW-ACT-R71': {
      name: '`Meta`-elementet har ingen uppdateringsfördröjning (inget undantag)',
      description:
        'Denna regel kontrollerar att elementet `meta’ inte har använts för fördröjd omdirigering eller omladdning.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Objektet laddas om eller omdirigeras omedelbart.',
        F1: 'Objektet laddas om efter {seconds} sekunder.',
        F2: 'Objektet omdirigeras efter {seconds} sekunder.'
      }
    },
    'QW-ACT-R72': {
      name: 'Det första fokuserade elementet är en länk till innehåll som inte upprepas',
      description:
        'Denna regel kontrollerar att det första fokuserade elementet är en länk till innehåll som inte upprepas på sidan.',
      results: {
        I1: 'Inga objekt hittades.',
        W1: 'Kontrollera att det första fokuserade elementet har ett tillgängligt namn som låter förstå att man hoppar över innehåll med den.',
        W2: 'Kontrollera att det första fokuserade elementet hoppar till sidans huvudinnehåll och att dess tillgängliga namn också låter förstå detta.',
        F1: 'Det första fokuserade elementet är inte åtkomligt med tangentbord.',
        F2: 'Det första fokuserade elementet ingår inte i innehållsmodellen för tillgänglighet.',
        F3: 'Det första fokuserade elementet är inte en länk.',
        F4: 'Det första fokuserade elementet hoppar inte till sidans huvudinnehåll.',
        F5: 'På sidan finns inga fokuserade element.'
      }
    },
    'QW-ACT-R73': {
      name: 'Blocket med upprepat innehåll måste krympas',
      description: 'Denna regel kontrollerar att block med upprepat innehåll kan krympas.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Sidan innehåller inget innehåll som upprepas.',
        W1: 'Kontrollera i varje block med upprepat innehåll som finns i ett element som i utskriftsordningen åtföljs av minst ett element med innehåll som upprepas efter upprepat innehåll att följande villkor uppfylls: det finns en funktion för att dölja alla delar av detta block och det finns en funktion för att ta bort dessa delar från innehållsmodellen för tillgänglighet.'
      }
    },
    'QW-ACT-R74': {
      name: 'Dokumentet har en mekanism för att flytta fokus till innehåll som inte upprepas',
      description:
        'Denna regel kontrollerar att det finns en mekanism för att flytta fokus till innehåll som inte upprepas på sidan.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Sidan innehåller inget innehåll som upprepas.',
        W1: 'På sidan finns en eller flera funktioner för att flytta fokus. Kontrollera att någon av dessa används före blocket med upprepat innehåll och att fokuset placeras strax före blocket med innehåll som inte upprepas.',
        W2: 'Kontrollera att det finns minst en funktion på sidan för att flytta fokus. Kontrollera att någon av dessa används före blocket med upprepat innehåll och att fokuset placeras strax före blocket med innehåll som inte upprepas.'
      }
    },
    'QW-ACT-R75': {
      name: 'Hoppa över block med upprepat innehåll',
      description:
        'Denna regel kontrollerar att det på varje sida finns en mekanism för att hoppa över block med upprepat innehåll.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Villkoret uppfylls på grund av regeln ',
        W1: 'Uppfyllandet av villkoret kunde inte verifieras på grund av regeln ',
        F1: 'Villkoret uppfylls inte på grund av regeln '
      }
    },
    'QW-ACT-R76': {
      name: 'Texten uppfyller kraven på utökad kontrast',
      description:
        'Denna regel kontrollerar att den största möjliga kontrasten mot bakgrunden för varje tecken i texten uppfyller kraven på utökad kontrast.',
      results: {
        I1: 'Inga objekt hittades.',
        P1: 'Elementets kontrast överskrider minimikraven.',
        P2: 'Med elementets tecken presenteras inte text på ett naturligt språk.',
        P3: 'Elementets kontrast mot bakgrundens gradientfärg överskrider minimikraven.',
        W1: 'Elementets text har skuggning som kräver manuell granskning.',
        W2: 'Bakom elementet finns en bild.',
        W3: 'Elementet har en gradientfärg som vi inte kan verifiera.',
        F1: 'Elementets kontrast uppfyller inte minimikraven.',
        F2: 'Elementets kontrast mot bakgrundens gradientfärg uppfyller inte minimikraven.'
      }
    },
    'QW-ACT-R77': {
      name: 'ARIA required ID references exist',
      description: 'This rule checks that every ID reference required by WAI-ARIA exists.',
      results: {
        I1: 'No test targets found.',
        P1: 'Referenced element exists.',
        F1: 'Referenced element does not exist.'
      }
    }
  }
};
