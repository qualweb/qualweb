import { Locale } from '..';

export const nn: Locale = {
  'act-rules': {
    'QW-ACT-R1': {
      name: 'HTML-side har ein tittel',
      description: 'Denne regelen sjekkar at ei HTML-side har ein tittel.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: "`title`-element eksisterer og er ikkje tomt ('').",
        F1: '`title`-element eksisterer ikkje.',
        F2: "`title`-element er tomt ('').",
        F3: '`title`-element er ikkje i same kontekst.'
      }
    },
    'QW-ACT-R2': {
      name: 'HTML har eit lang-attributt',
      description: 'Denne regelen sjekkar at html-element ikkje har eit tomt lang- eller xml:lang-attributt.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: '`lang`-attributtet finst og har ein verdi.',
        F1: "`lang`-attributtet finst ikkje eller er tomt ('')."
      }
    },
    'QW-ACT-R3': {
      name: 'HTML lang og xml:lang er like',
      description:
        'Regelen sjekkar at det for html-element er brukt same verdi for primærspråk i ikkje-tomme lang- og xml:lang-attributt, der begge desse attributta er brukt.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Attributta `lang` og `xml:lang` har same verdi.',
        F1: 'Attributta `lang` og `xml:lang` har ikkje same verdi.'
      }
    },
    'QW-ACT-R4': {
      name: 'Meta-refresh er ikkje forsinka',
      description:
        'Denne regelen sjekkar at meta-element ikkje blir brukt til forsinka omdirigering eller oppdatering.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet blir oppdatert/omdirigert med ein gong.',
        P2: 'Testobjektet blir oppdatert/omdirigert etter meir enn 20 timar.',
        F1: 'Testobjektet blir oppdatert etter {seconds} sekund.',
        F2: 'Testobjektet blir omdirigert etter {seconds} sekund.'
      }
    },
    'QW-ACT-R5': {
      name: 'HTML lang-attributtet har gyldig innhald',
      description: 'Denne regelen sjekkar at lang- eller xml:lang-attributtet har ein gyldig språkundertag.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: '`lang`-attributtet har ein gyldig verdi.',
        F1: '`lang`-attributtet har ikkje ein gyldig verdi.'
      }
    },
    'QW-ACT-R6': {
      name: 'Knappar koda som bilde har eit tilgjengeleg namn',
      description: 'Denne testregelen sjekkar at knappar koda som bilde har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Knapp koda som bilde har eit tilgjengeleg namn.',
        F1: 'Knapp koda som bilde har ikkje eit tilgjengeleg namn.'
      }
    },
    'QW-ACT-R7': {
      name: 'Visningsretning på nettsida er ikkje avgrensa med bruk av CSS-transformeringseigenskap',
      description:
        'Denne regelen sjekkar at innhald på sida, ikkje er avgrensa til berre liggande eller ståande visningsretning med bruk av CSS-transformeringseigenskapar.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Ei side der CSS-eigenskapar ikkje avgrensar visningsretninga til anten ståande eller liggande visningsretning.',
        F1: 'Ei side der CSS-eigenskapar avgrensar visningsretninga til berre liggande visningsretning.'
      }
    },
    'QW-ACT-R9': {
      name: 'Lenker med identisk tilgjengeleg namn har same formål',
      description:
        'Denne regelen sjekkar at lenker med identisk tilgjengeleg namn har same eller tilsvarande lenkemål.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: '`Lenker` med same tilgjengeleg namn har same lenkemål.',
        F1: '`Lenker` med same tilgjengeleg namn har ulikt lenkemål. Verifiser at lenkemålet er tilsvarande.'
      }
    },
    'QW-ACT-R10': {
      name: '`iframe`-element med identisk tilgjengeleg namn har tilsvarande formål',
      description: 'Denne regelen sjekkar at `iframe`-element med identisk tilgjengeleg namn har same innhald.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: '`iframes` med same tilgjengeleg namn har likt innhald.',
        F1: '`iframes` med same tilgjengeleg namn har forskjellig innhald.'
      }
    },
    'QW-ACT-R11': {
      name: 'Knappar har eit tilgjengeleg namn',
      description: 'Denne regelen sjekkar at alle knappar koda som button har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Knapp har eit tilgjengeleg namn.',
        F1: "Knapp manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R12': {
      name: 'Lenker har eit tilgjengeleg namn',
      description: 'Denne regelen sjekkar at alle lenker har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Lenke med tilgjengeleg namn.',
        F1: "Lenke manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R13': {
      name: 'Element med `aria-hidden` inneheld ikkje element som kan få fokus',
      description:
        'Denne regelen sjekkar at element koda med aria-aria-hidden-attributtet ikkje inneheld element som kan få fokus.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet inneheld ikkje element som kan få fokus.',
        P2: 'Testobjektet kan ikkje få fokus.',
        F1: 'Testobjektet inneheld element som kan få fokus.',
        F2: 'Testobjektet kan få fokus.'
      }
    },
    'QW-ACT-R14': {
      name: 'Bruk av meta viewport hindrar ikkje zoom',
      description: 'Denne regelen sjekkar at bruk av meta-element beheld brukeragenten si evne til å zoome.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: "`meta` element med `name='viewport'` attributt definerer ikkje verdiane `maximum-scale` og `user-scalable`.",
        P2: "`meta` element med `name='viewport'` attributt avgrenser ikkje brukeragenten si evne til å zoome",
        F1: "`meta` element med `name='viewport'` attributt avgrenser brukeragenten si evne til å zoome med bruk av user-scalable=no eller maximum-scale < 2."
      }
    },
    'QW-ACT-R15': {
      name: 'Lyd eller video har ikkje lyd som blir spelt av automatisk',
      description:
        'Denne regelen sjekkar at automatisk avspeling av lyd ikkje varer i meir enn 3 sekund, eller at det finst en kontrollmekanisme for å stoppa eller dempa lyd.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R16': {
      name: 'Skjemaelement har eit tilgjengeleg namn',
      description: 'Denne regelen sjekkar at alle skjemaelement har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Skjemaelementet har eit tilgjengeleg namn.',
        F1: "Skjemaelementet manglar et tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R17': {
      name: 'Bilde har eit tilgjengeleg namn',
      description:
        'Denne regelen sjekkar at alle bilde som ikkje er markert som dekorative, har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Bilde er markert som dekorativt.',
        P2: 'Bilde har et tilgjengeleg namn.',
        F1: "Bilde som ikkje er markert som dekorativt manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R18': {
      name: '`id`-attributt har ein unik verdi',
      description: 'Denne regelen sjekkar at alle id-attributt på ei enkelt nettside er unike.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjekt har unik verdi på `id`-attributt.',
        F1: 'Flere testobjekt har same verdi på `id`-attributt.'
      }
    },
    'QW-ACT-R19': {
      name: 'iframe-element har tilgjengeleg namn',
      description: 'Denne regelen sjekkar at alle iframe-element har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'iframe-element har eit tilgjengeleg namn.',
        F1: "iframe-element manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R20': {
      name: 'role-attributt har ein gyldig verdi',
      description: 'Denne regelen sjekkar at alle role-attributt har ein gyldig verdi.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med gyldig `role`-attributt.',
        F1: 'Element med ugyldig `role`-attributt.'
      }
    },
    'QW-ACT-R21': {
      name: 'svg-element med en eksplisitt rolle har eit tilgjengeleg namn',
      description:
        'Denne regelen sjekkar at alle SVG-element som er eksplisitt inkludert i accessibility tree har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'svg-element som er inkludert i accessibility tree har eit tilgjengeleg namn.',
        F1: "svg-element som er inkludert i accessibility tree manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R22': {
      name: 'lang-attributt har ein gyldig språkkode',
      description:
        'Denne regelen sjekkar at alle lang-attributt, som ikkje er tome, for eit element på nettsida har ein gyldig språkkode.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element har `lang`-attributt med gyldig språkkode.',
        F1: 'Element har `lang`-attributt med ugyldig språkkode.'
      }
    },
    'QW-ACT-R23': {
      name: 'Visuelt innhald i video med lyd er synstolka eller har eit tekstalternativ',
      description:
        'Denne regelen sjekkar at alle video-element med lyd har eit alternativ for det visuelle innhaldet i form av lyd eller tekst.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R24': {
      name: 'autocomplete-attributt har ein gyldig verdi',
      description: 'Denne regelen sjekkar at alle HTML autocomplete-attributt har ein gyldig verdi.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element har `autocomplete`-attributt med gyldig verdi.',
        F1: 'Element har `autocomplete`-attributt med ugyldig verdi.'
      }
    },
    'QW-ACT-R25': {
      name: 'ARIA tilstandar og eigenskapar er gyldige',
      description:
        'Denne regelen sjekkar at WAI-ARIA tilstandar og eigenskapar er gyldige for elementet dei er spesifisert på.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: '`{attr}` eigenskapen er gyldig for eller arva av `role` {role}.',
        F1: '`{attr}` eigenskapen er verken arva av eller gyldig for `role` {role}.'
      }
    },
    'QW-ACT-R26': {
      name: 'Video med lyd har eit tilgjengeleg alternativ',
      description:
        'Denne regelen sjekkar at video-element med lyd anten er teksta eller har eit tekstalternativ til lyden.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk resultatet samsvar basert på resultatet frå testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på resultatet frå testregelen ',
        F1: 'Testobjektet fekk resultatet feila basert på resultatet frå testregelen '
      }
    },
    'QW-ACT-R27': {
      name: 'aria-* attributt er definert i WAI-ARIA',
      description: 'Denne regelen sjekkar at alle aria-* attributt som er brukt er definert i ARIA 1.1.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Alle aria-* attributt brukt i element er definert i ARIA 1.1.',
        F1: 'En eller flere aria-* attributt er ikkje definert i ARIA 1.1.'
      }
    },
    'QW-ACT-R28': {
      name: 'Element med role-attributt har nødvendige tilstandar og eigenskapar',
      description:
        'Denne regelen sjekkar at element som har ei eksplisitt rolle òg spesifiserer alle nødvendige tilstandar og eigenskapar.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med eksplisitt rolle har alle nødvendige tilstandar og eigenskapar.',
        P2: 'Element med eksplisitt rolle, der den definerte rolla ikkje har obligatorisk tilstand eller eigenskap.',
        F1: 'Element med eksplisitt rolle manglar nødvendige tilstandar eller eigenskapar.'
      }
    },
    'QW-ACT-R29': {
      name: 'Lydklipp har eit tekstalternativ',
      description: 'Denne regelen sjekkar at lydklipp har eit tekstalternativ.',
      results: {
        I1: 'Testobjekt ikkje funnet.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R30': {
      name: 'Synleg ledetekst er del av tilgjengeleg namn',
      description:
        'Denne regelen sjekkar at alle interaktive element, med synleg ledetekst, òg har denne som del av sitt tilgjengelege namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med visuell ledetekst har eit tilgjengeleg namn som er identisk med eller inneheld den visuelle ledeteksten.',
        F1: 'Element med visuell ledetekst manglar eit tilgjengeleg namn.',
        F2: 'Element med visuell ledetekst har eit tilgjengeleg namn som ikkje er inneheld den visuelle ledeteksten.'
      }
    },
    'QW-ACT-R31': {
      name: 'Video utan lyd har eit tilgjengeleg alternativ',
      description: 'Denne regelen sjekkar at video-element utan lyd har eit tilgjengeleg alternativ.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R32': {
      name: 'Video med lyd er synstolka',
      description: 'Denne regelen sjekkar at video-element med lyd er synstolka.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R33': {
      name: 'ARIA påkravd kontekst-rolle',
      description: 'Denne regelen sjekkar at element med ei eksplisitt semantisk rolle finst i sin påkrevde kontekst.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med en eksplisitt semantisk rolle har overordna element der påkravd `role` finst.',
        F1: 'Element med en eksplisitt semantisk rolle har overordna element der påkravd `role` manglar.'
      }
    },
    'QW-ACT-R34': {
      name: 'ARIA tilstandar og eigenskapar har gyldig verdi',
      description: 'Denne regelen sjekkar at alle ARIA tilstandar og eigenskapar har ein gyldig verdi.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med `{attr}`-attributtet har en gyldig verdi.',
        F1: 'Element med `{attr}`-attributtet har en ugyldig verdi.'
      }
    },
    'QW-ACT-R35': {
      name: 'Overskrifter har eit tilgjengeleg namn',
      description:
        'Denne regelen sjekkar at alle HTML-element med semantisk rolle overskrift har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'HTML-element med semantisk rolle overskrift har eit tilgjengeleg namn.',
        F1: "HTML-element med semantisk rolle overskrift manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R36': {
      name: 'Overskrifts-attributt i tabellar har gyldig referanse',
      description:
        'Denne regelen sjekkar at overskrift-attributt på ei celle i ein tabell refererer til andre celler i same tabell-element, og at desse har ei semantisk rolle som kolonne eller radoverskrift.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Alle overskrifts-attributt refererer til ei celle i same tabell med semantisk rolle som kolonne- eller radoverskrift.',
        F1: 'Overskrifts-attributtet `{attr}` refererer til ein id som ikkje finst i same tabell.',
        F2: 'Overskrifts-attributtet `{attr}` refererer til eit element i same tabell som manglar semantisk rolle som kolonne- eller radoverskrift.'
      }
    },
    'QW-ACT-R37': {
      name: 'Kontrast mellom tekst og bakgrunn (minimum)',
      description:
        'Denne regelen sjekkar at element med tekst oppfyller minstekravet til kontrast mellom tekst og bakgrunn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med målt kontrast over minstekravet.',
        P2: 'Element har ikkje tekst på eit menneskeleg språk.',
        P3: 'Element har ein gradient med kontrast over minstekravet.',
        W1: 'Element har tekst-skygge som må bli verifisert manuelt.',
        W2: 'Element har bilde som bakgrunn.',
        W3: 'Element har ein gradient som ikkje kan bli verifisert automatisk.',
        F1: 'Element har målt kontrast under minstekravet.',
        F2: 'Element har ein gradient med målt kontrast under minstekravet.'
      }
    },
    'QW-ACT-R38': {
      name: 'ARIA påkrevde element finst',
      description:
        'Denne regelen sjekkar at element med en eksplisitt semantisk rolle eig minst eitt av sine påkravde element.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med en eksplisitt semantisk rolle eig berre element med gyldig rolle.',
        F1: 'Element med en eksplisitt semantisk rolle eig element som ikkje har gyldig rolle.'
      }
    },
    'QW-ACT-R39': {
      name: 'Alle overskriftceller i ein tabell er knytt til dataceller',
      description:
        'Denne regelen sjekkar at alle overskriftsceller i ein tabell er kobla til minst ei datacelle i same table-element',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Overskriftcelle er kobla til minst ei datacelle.',
        F1: 'Overskriftcelle manglar kobling til ei datacelle.'
      }
    },
    'QW-ACT-R40': {
      name: 'CSS-overflow fører ikkje til tap av innhald ved zooming',
      description:
        'Denne regelen sjekkar at bruk av CSS-overflow på tekst-element ikkje fører til tap av innhald når sida blir zooma inn med 200% på ein 1280 x 1024 piksel stor viewport.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at tekst-element og underliggande element ikkje mistar innhald som følge av overflow.'
      }
    },
    'QW-ACT-R41': {
      name: 'Feilmeldingar i skjema er beskrivande',
      description:
        'Denne regelen sjekkar at det blir gitt beskrivande feilmeldingar i skjemaelement når ein brukar skriv ein verdi som er ugyldig eller i feil format.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at feilmeldinga identifiser årsaka til feilen eller beskriv korleis feilen kan bli retta.'
      }
    },
    'QW-ACT-R42': {
      name: 'object-element har eit tilgjengeleg namn',
      description: 'Denne regelen sjekkar at alle `object`-element har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'object-element har eit tilgjengeleg namn.',
        F1: "object-element manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R43': {
      name: 'Element som skrollar kan betenast med tastatur',
      description: 'Denne regelen sjekkar at element som skrollar kan betenast med tastatur.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element som skrollar kan få fokus med tastatur.',
        F1: 'Element som skrollar inkludert underordna element får ikkje fokus med tastatur.'
      }
    },
    'QW-ACT-R44': {
      name: 'Lenker med same tilgjengelege namn går til same eller tilsvarande lenkemål',
      description:
        'Denne regelen sjekkar at lenker med same tilgjengelege namn går til same eller tilsvarande lenkemål.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Lenker med same tilgjengelege namn har same lenkemål.',
        W1: 'Lenker med same tilgjengelege namn har forskjellig lenkemål. Verifiser at lenkemålet er tilsvarande.'
      }
    },
    'QW-ACT-R48': {
      name: 'Element markert som dekorative er ikkje del av accessibility tree',
      description: 'Denne regelen sjekkar at element markert som dekorative, ikkje er del av accessibility tree.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element markert som dekorativt, er ikkje del av accessibility tree.',
        F1: 'Element markert som dekorativt, er del av accessibility tree.'
      }
    },
    'QW-ACT-R49': {
      name: 'Lyd eller video som blir spelt av automatisk, har ikkje lyd som varer meir enn 3 sekund',
      description:
        'Denne regelen sjekkar at lyd eller video som blir spelt av automatisk, ikkje har lyd som varer meir enn 3 sekund.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Lyd/video som blir spelt av automatisk har ei avspelingstid på 3 sekund eller mindre.',
        W1: 'Kan ikkje samle inn data frå element med lyd eller video.',
        W2: 'Sjekk om lyd/video som blir spelt av automatisk har ein synleg kontrollmekanisme.'
      }
    },
    'QW-ACT-R50': {
      name: 'Lyd eller video som blir spelt av automatisk, har ein kontrollmekanisme',
      description:
        'Denne regelen sjekkar at lyd eller video som blir spelt av automatisk, har ein synleg kontrollmekanisme.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Lyd/video som blir spelt av automatisk, har ein synleg kontrollmekanisme.',
        W1: 'Kan ikkje samle inn data frå element med lyd eller video.',
        W2: 'Sjekk om lyd/video som blir spelt av automatisk, har ein synleg kontrollmekanisme.'
      }
    },
    'QW-ACT-R51': {
      name: 'Video utan lyd er eit mediealternativ til tekst',
      description:
        'Denne regelen sjekkar at førehandsinnspelt video utan lyd er eit mediealternativ for tekst på sida.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data om video-element.',
        W2: 'Sjekk at innhaldet i videoen gjengir informasjonen i teksten.'
      }
    },
    'QW-ACT-R52': {
      name: 'Video utan lyd har eit beskrivande track-element',
      description:
        'Denne regelen sjekkar at førehandsinnspelt video-element utan lyd inneheld eit track-element som gjengir innhaldet i videoen.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Sjekk at innhaldet i videoen sitt track-element gjengir innhaldet i videoen.'
      }
    },
    'QW-ACT-R53': {
      name: 'Video utan lyd har tekstalternativ',
      description:
        'Denne regelen sjekkar at førehandsinnspelt video utan lyd har eit tekstalternativ som gjengir innhaldet i videoen.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Sjekk at videoen har eit tekstalternativ som gjengir innhaldet i videoen.'
      }
    },
    'QW-ACT-R54': {
      name: 'Video utan lyd har eit alternativt lydspor',
      description: 'Denne regelen sjekkar at førehandsinnspelt video utan lyd har eit lyd-alternativ.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Sjekk at videoen har minst eit lyd-alternativ som gjengir innhaldet i videoen.'
      }
    },
    'QW-ACT-R55': {
      name: 'Førehandsinnspelt video er synstolka',
      description: 'Denne regelen sjekkar at førehandsinnspelt video er synstolka.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Videoen har eit lydspor, men vi kan ikkje verifisere lydstyrken. Sjekk at lydsporet inneheld lyd og at det gjengir det visuelle innhaldet i videoen.'
      }
    },
    'QW-ACT-R56': {
      name: 'Video er eit mediealternativ for tekst',
      description: 'Denne regelen sjekkar at førehandsinnspelt video er eit mediealternativ for tekst på sida.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Sjekk at innhaldet i videoen gjengir informasjonen i teksten.'
      }
    },
    'QW-ACT-R57': {
      name: 'Video med lyd har eit beskrivande track-element',
      description:
        'Denne regelen sjekkar at førehandsinnspelt video med lyd har eit track-element gjengir innhaldet i videoen.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Videoen har eit lydspor, men vi kan ikkje verifisere lydstyrken. Sjekk at videoen har lyd og at innhaldet i track-element gjengir det visuelle innhaldet i videoen.'
      }
    },
    'QW-ACT-R58': {
      name: 'Lydklipp har tekstalternativ',
      description:
        'Denne regelen sjekkar at førehandsinnspelt lydklipp har eit tekstalternativ som gjengir innhaldet i lydklippet.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at tekstalternativet gjengir innhaldet i lydklippet.'
      }
    },
    'QW-ACT-R59': {
      name: 'Lydklipp er eit mediealternativ for tekst',
      description: 'Denne regelen sjekkar at lydklipp er eit mediealternativ til tekst på sida.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at innhaldet i lydklippet gjengir innhaldet i teksten.'
      }
    },
    'QW-ACT-R60': {
      name: 'Video med lyd er teksta',
      description: 'Denne regelen sjekkar at førehandsinnspelt video med lyd er teksta.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Videoen har eit lydspor, men vi kan ikkje verifisere lydstyrken. Sjekk at videoen har lyd og at det finst teksting som formidlar innhaldet i videoen sitt lydspor.'
      }
    },
    'QW-ACT-R61': {
      name: 'Video har eit tekstalternativ',
      description: 'Denne regelen sjekkar at førehandsinnspelt video med lyd har eit tekstalternativ.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Kan ikkje samla inn data frå video-element.',
        W2: 'Videoen har eit lydspor, men vi kan ikkje verifisere lydstyrken. Sjekk at videoen har lyd og at det finst eit tekstalternativ som gjengir innhaldet i videoen.'
      }
    },
    'QW-ACT-R62': {
      name: 'Element som kan nåast med tastatur har visuell fokusmarkering',
      description: 'Denne regelen sjekkar at alle element som kan nåast med tastaturet har visuell fokusmarkering.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at element har visuell fokusmarkering.'
      }
    },
    'QW-ACT-R63': {
      name: 'Dokument har eit landemerke med ikkje-gjenteke innhald',
      description:
        'Denne regelen sjekkar at kvar side inneheld eit element med semantisk rolle som landmerke og som startar med ikkje-gjenteke innhald.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Sida har ikkje gjenteke innhald.',
        W1: 'Sjekk at det ikkje finst gjenteke innhald som blir følgt av ikkje-gjenteke innhald. Dersom ja sjekk om det eksisterer eit element der følgande føresetnader er oppfylt: - element har ei semantisk rolle som arver frå landemerket; og - det første synlege innhaldet (in tree order in the flat tree) som er ein inkludert etterkomar av element er ikkje-gjenteke innhald etter gjenteke innhald; og - element er inkludert i accessibility tree.'
      }
    },
    'QW-ACT-R64': {
      name: 'Dokument har overskrift for ikkje-gjenteke innhald',
      description: 'Denne regelen sjekkar at ikkje-gjenteke innhald på nettsider inneheld ei overskrift.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Sida har ikkje gjenteke innhald.',
        W1: 'Sjekk at det ikkje finst gjenteke innhald som blir følgt av ikkje-gjenteke innhald. Dersom ja sjekk om det eksisterer eit element der følgende føresetnader er oppfylt: - element har ei semantisk rolle som overskrift. - element er visuelt synleg - element er inkludert i accessibility tree.'
      }
    },
    'QW-ACT-R65': {
      name: 'Element meint for presentasjon får ikkje fokus',
      description:
        'Denne regelen sjekkar at element med ei rolle som gjer at alle underordna element er meint for presentasjon ikkje inneheld element som kan få fokus.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element har ingen underordna element som kan få fokus.',
        F1: 'Element har underordna element som kan få fokus.'
      }
    },
    'QW-ACT-R66': {
      name: 'Element med rolle som menuitem har eit tilgjengeleg namn',
      description: 'Denne regelen sjekkar at element med rolle som menuitem har eit tilgjengeleg namn.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med rolle som menuitem har eit tilgjengeleg namn.',
        F1: "Element med rolle som menuitem manglar eit tilgjengeleg namn eller det er tomt ('')."
      }
    },
    'QW-ACT-R67': {
      name: 'Bokstavavstand i style-attributt brukar ikkje !important',
      description:
        'Denne regelen sjekkar at style-attributtet gir ei bokstavavstand(letter-spacing) på minst 0,12 gonger skriftstørrelsen eller at det ikkje er brukt !important for å hindra justering av bokstavavstand.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element der letter-spacing i style-attributtet ikkje er sett til !important.',
        P2: 'Element der letter-spacing i style-attributtet er sett til 0.12 ganger skriftstørrelsen eller meir.',
        P3: 'Element der letter-spacing er sett i stilarket.',
        F1: 'Element der letter-spacing i style-attributtet er sett slik at det hindrar at bokstavavstand kan bli høgare enn 0.12 gonger skriftstørrelsen.'
      }
    },
    'QW-ACT-R68': {
      name: 'Linjehøgde i style-attributt brukar ikkje !important',
      description:
        'Denne regelen sjekkar om style-attributtet anten gir ei linjehøgde (line-height) på minst 1.5 ganger skriftsstørelse eller at at det ikkje er brukt !important for å hindra justering av linjehøgda.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element der line-height i style-attributtet ikkje er sett til !important.',
        P2: 'Element der line-height er sett til 1.5 gonger skriftstørrelsen eller meir.',
        P3: 'Element der line-height er sett i stilarket.',
        F1: 'Element der line-height i style-attributtet er satt slik at det hindrar at linjehøgda kan blir høgare enn 1.5 gonger skriftstørrelsen.'
      }
    },
    'QW-ACT-R69': {
      name: 'Ordavstand i style-attributt brukar ikkje !important',
      description:
        'Denne regelen sjekkar om style-attributtet gir ei ordavstand (word-spacing) for å hindra justering av ordavstand ved å bruke !important, med mindre verdien er minst 0.16 gonger skriftstørrelsen.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element der word-spacing i style-attributtet ikkje er sett til !important.',
        P2: 'Element der word-spacing i style-attributtet er sett til 0.16 gonger skriftstørrelsen  eller meir.',
        P3: 'Element der word-spacing er sett i stilarket.',
        F1: 'Element der word-spacing i style-attributtet er sett slik at det hindrar at ordavstanden kan bli høgare enn 0.16 gonger skriftstørrelsen.'
      }
    },
    'QW-ACT-R70': {
      name: 'iframe-element med negativ tabindex har ingen interaktive element.',
      description:
        'Denne regelen sjekkar om `iframe`-element med ein negativ `tabindex`-attributtverdi inneheld interaktive element.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'iframe-element med negativ tabindex inneheld ikkje element som er synlege eller kan få fokus.',
        F1: 'iframe-element med negativ tabindex inneheld element som er synlege eller kan få fokus.'
      }
    },
    'QW-ACT-R71': {
      name: '`meta`-element har ingen oppdateringsforsinkelse (ingen unntak)',
      description:
        'Denne regelen sjekkar om meta-element blir brukt for forsinka omdirigering eller oppdatering av ei nettside.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Nettsida oppdaterer/omdirigerer umiddelbart.',
        F1: 'Nettsida oppdaterer seg etter {seconds} sekund.',
        F2: 'Nettsida omdirigerer etter {seconds} sekund.'
      }
    },
    'QW-ACT-R72': {
      name: 'Første fokuserbare element på nettsida er ei lenke til ikkje-gjenteke innhald.',
      description:
        'Denne regelen sjekkar om første fokuserbare element på nettsia er ei lenke til ikkje-gjenteke innhald.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        W1: 'Sjekk at første fokuserbare element har eit tilgjengeleg namn som formidlar at det hoppar over innhald.',
        W2: 'Sjekk at første fokuserbare element lenker til hovudinnhaldet på sida og at det tilgjengelege namnet formidlar dette.',
        F1: 'Første fokuserbare element kan ikkje bli aktivert med tastaturet.',
        F2: 'Første fokuserbare element er ikkje i accessibility tree.',
        F3: 'Første fokuserbare element har ikkje rolle som lenke.',
        F4: 'Første fokuserbare element lenker ikkje til hovudinnhaldet.',
        F5: 'Sida har ingen element som kan få fokus.'
      }
    },
    'QW-ACT-R73': {
      name: 'Blokker med gjenteke innhald kan bli folda saman',
      description: 'Denne regelen sjekkar at blokker med gjenteke innhald kan bli folda saman.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Sida har ikkje gjenteke innhald.',
        W1: 'For kvar blokk med gjenteke innhald som er plassert (in the flat tree) før minst éin node med ikkje-gjenteke innhald etter gjenteke innhald, sjekk at det finst ein mekanisme for å gjera alle noder i denne blokka usynlege både visuelt og i accessibility tree.'
      }
    },
    'QW-ACT-R74': {
      name: 'Sida har ein mekanisme for å flytta fokus til ikkje-gjenteke innhald',
      description:
        'Denne regelen sjekkar om det finst ein mekanisme for å flytta fokus til ikkje-gjenteke innhald på sida.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Sida har ikkje gjenteke innhald.',
        W1: 'Sida har ein eller fleire mekanismar for å flytta fokus. Sjekk om nokon av mekanismane blir brukt før ei blokk med gjenteke innhald, og om fokus blir flytta til rett før ei blokk med ikkje-gjenteke innhald.'
      }
    },
    'QW-ACT-R75': {
      name: 'Hopp over blokker med gjenteke innhald',
      description:
        'Denne regelen sjekkar at kvar side har ein mekanisme for å hoppa over blokker med gjenteke innhald.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Testobjektet fekk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikkje bli verifisert basert på testregelen ',
        F1: 'Testobjektet feila basert på testregelen '
      }
    },
    'QW-ACT-R76': {
      name: 'Kontrast mellom tekst og bakgrunn (forbedra)',
      description: 'Denne regelen sjekkar at element med tekst oppfyller kravet til forbedra kontrast.',
      results: {
        I1: 'Testobjekt ikkje funne.',
        P1: 'Element med målt kontrast over minstekravet (forbedra).',
        P2: 'Element har ikkje tekst på et menneskeleg språk.',
        P3: 'Element har ein gradient med kontrast over minstekravet (forbedra).',
        W1: 'Element har tekst-skygge som må bli verifisert manuelt.',
        W2: 'Element har bilde som bakgrunn.',
        W3: 'Element har ein gradient som ikkje kan bli verifisert automatisk.',
        F1: 'Element har målt kontrast under minstekravet (forbedra).',
        F2: 'Element har ein gradient med målt kontrast under minstekravet (forbedra).'
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
