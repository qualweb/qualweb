import { Locale } from '@qualweb/locale';

export const nb: Locale = {
  'act-rules': {
    'QW-ACT-R1': {
      name: 'HTML-side har en tittel',
      description: 'Denne regelen sjekker at en HTML-side har en tittel.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: "`title`-element eksisterer og er ikke tomt ('').",
        F1: '`title`-element eksisterer ikke.',
        F2: "`title`-element er tomt ('').",
        F3: '`title`-element er ikke i samme kontekst.'
      }
    },
    'QW-ACT-R2': {
      name: 'HTML har en lang-attributt',
      description: 'Denne regelen sjekker at html-element ikke har et tomt lang- eller xml:lang-attributt.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: '`lang`-attributtet finnes og har en verdi.',
        F1: "`lang`-attributtet finnes ikke eller er tomt ('')."
      }
    },
    'QW-ACT-R3': {
      name: 'HTML lang og xml:lang er like',
      description:
        'Regelen sjekker at det for html-element er brukt samme verdi for primærspråk i ikke-tomme lang- og xml:lang-attributt, der begge disse attributtene er brukt.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Attributtene `lang` og `xml:lang` har samme verdi.',
        F1: 'Attributtene `lang` og `xml:lang` har ikke samme verdi.'
      }
    },
    'QW-ACT-R4': {
      name: 'Meta-refresh ingen forsinkelse',
      description: 'Denne regelen sjekker at meta-element ikke brukes til forsinket omdirigering eller oppdatering.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet oppdateres/omdirigeres umiddelbart.',
        P2: 'Testobjektet oppdateres/omdirigeres etter mer enn 20 timer.',
        F1: 'Testobjektet oppdateres etter {seconds} sekunder.',
        F2: 'Testobjektet omdirigeres etter {seconds} sekunder.'
      }
    },
    'QW-ACT-R5': {
      name: 'HTML lang-attributtet har gyldig innhold',
      description: 'Denne regelen sjekker at lang- eller xml:lang-attributtet har en gyldig språkundertag.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: '`lang`-attributtet har en gyldig verdi.',
        F1: '`lang`-attributtet har ikke en gyldig verdi.'
      }
    },
    'QW-ACT-R6': {
      name: 'Knapper kodet som bilde har et tilgjengelig navn',
      description: 'Denne testregelen sjekker at knapper kodet som bilde har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Knapp kodet som bilde har et tilgjengelig navn.',
        F1: 'Knapp kodet som bilde har ikke et tilgjengelig navn.'
      }
    },
    'QW-ACT-R7': {
      name: 'Visningsretning på nettsiden er ikke begrenset ved bruk av CSS-transformeringsegenskap',
      description:
        'Denne regelen sjekker at innhold på siden, ikke er begrenset til bare liggende eller stående visningsretning ved bruk av CSS-transformeringsegenskaper.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'En side der CSS-egenskaper ikke begrenser visningsretningen til verken stående eller liggende visningsretning.',
        F1: 'En side der CSS-egenskaper begrenser visningsretningen til bare liggende visningsretning.'
      }
    },
    'QW-ACT-R9': {
      name: 'Lenker med identisk tilgjengelig navn har samme formål',
      description:
        'Denne regelen sjekker at lenker med identisk tilgjengelig navn har samme eller tilsvarende lenkemål.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: '`Lenker` med samme tilgjengelige navn har samme lenkemål.',
        F1: '`Lenker` med samme tilgjengelige navn har ulikt lenkemål. Verifiser at lenkemålet er tilsvarende.'
      }
    },
    'QW-ACT-R10': {
      name: '`iframe`-element med identisk tilgjengelige navn har tilsvarende formål',
      description: 'Denne regelen sjekker at `iframe`-element med identiske tilgjengelige navn har samme innhold.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: '`iframes` med samme tilgjengelige navn har likt innhold.',
        F1: '`iframes` med samme tilgjengelige navn har forskjellig innhold.'
      }
    },
    'QW-ACT-R11': {
      name: 'Knapper har et tilgjengelig navn',
      description: 'Denne regelen sjekker at alle knapper kodet som button har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Knapp har et tilgjengelig navn.',
        F1: "Knapp mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R12': {
      name: 'Lenker har et tilgjengelig navn',
      description: 'Denne regelen sjekker at alle lenker har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Lenke med tilgjengelig navn.',
        F1: "Lenke mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R13': {
      name: 'Element med `aria-hidden` inneholder ikke element som kan få fokus',
      description:
        'Denne regelen sjekker at element kodet med aria-aria-hidden-attributtet ikke inneholder element som kan få fokus.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet inneholder ikke element som kan få fokus.',
        P2: 'Testobjektet kan ikke få fokus.',
        F1: 'Testobjektet inneholder element som kan få fokus.',
        F2: 'Testobjektet kan få fokus.'
      }
    },
    'QW-ACT-R14': {
      name: 'Bruk av meta viewport hindrer ikke zoom',
      description: 'Denne regelen sjekker at bruk av meta-element beholder brukeragentens evne til å zoome.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: "`meta` element med `name='viewport'` attributt definerer ikke verdiene `maximum-scale` og `user-scalable`.",
        P2: "`meta` element med `name='viewport'` attributt begrenser ikke brukeragentens evne til å zoome",
        F1: "`meta` element med `name='viewport'` attributt begrenser brukeragentens evne til å zoome ved bruk av user-scalable=no eller maximum-scale < 2."
      }
    },
    'QW-ACT-R15': {
      name: 'Lyd eller video har ikke lyd som spilles av automatisk',
      description:
        'Denne regelen sjekker at automatisk avspilling av lyd ikke varer i mer enn 3 sekunder, eller at det finnes en kontrollmekanisme for å stoppe eller dempe lyd.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R16': {
      name: 'Skjemaelement har et tilgjengelig navn',
      description: 'Denne regelen sjekker at alle skjemaelement har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Skjemaelementet har et tilgjengelig navn.',
        F1: "Skjemaelementet mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R17': {
      name: 'Bilder har et tilgjengelig navn',
      description: 'Denne regelen sjekker at alle bilder som ikke er markert som dekorative, har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Bilde er markert som dekorativt.',
        P2: 'Bilde har et tilgjengelig navn.',
        F1: "Bilde som ikke er markert som dekorativt mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R18': {
      name: '`id`-attributt har en unik verdi',
      description: 'Denne regelen sjekker at alle id-attributt på en enkelt nettside er unike.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjekt har unik verdi på `id`-attributt.',
        F1: 'Flere testobjekt har samme verdi på `id`-attributtet.'
      }
    },
    'QW-ACT-R19': {
      name: 'iframe-element har tilgjengelig navn',
      description: 'Denne regelen sjekker at alle iframe-element har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'iframe-element har et tilgjengelig navn.',
        F1: "iframe-element mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R20': {
      name: 'role-attributt har en gyldig verdi',
      description: 'Denne regelen sjekker at alle role-attributt har en gyldig verdi.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med gyldig `role`-attributt.',
        F1: 'Element med ugyldig `role`-attributt.'
      }
    },
    'QW-ACT-R21': {
      name: 'svg-element med en eksplisitt rolle har et tilgjengelig navn',
      description:
        'Denne regelen sjekker at alle SVG-element som er eksplisitt inkludert i accessibility tree har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'svg-element som er inkludert i accessibility tree har et tilgjengelig navn.',
        F1: "svg-element som er inkludert i accessibility tree mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R22': {
      name: 'lang-attributt har en gyldig språkkode',
      description:
        'Denne regelen sjekker at alle ikke-tomme lang-attributt for et element på nettsiden har en gyldig språkkode.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element har `lang`-attributt med gyldig språkkode.',
        F1: 'Element har `lang`-attributt med ugyldig språkkode.'
      }
    },
    'QW-ACT-R23': {
      name: 'Visuelt innhold i video med lyd er synstolket eller har et tekstalternativ.',
      description:
        'Denne regelen sjekker at alle video-element med lyd har et alternativ for det visuelle innholdet i form av lyd eller tekst.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R24': {
      name: 'autocomplete-attributt har en gyldig verdi',
      description: 'Denne regelen sjekker at alle HTML autocomplete-attributt har en gyldig verdi.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element har `autocomplete`-attributt med gyldig verdi.',
        F1: 'Element har `autocomplete`-attributt med ugyldig verdi.'
      }
    },
    'QW-ACT-R25': {
      name: 'ARIA tilstander og egenskaper er gyldige',
      description:
        'Denne regelen sjekker at WAI-ARIA tilstander og egenskaper er gyldige for elementet de er spesifisert på.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: '`{attr}` egenskapen er gyldig for eller arvet av `role` {role}.',
        F1: '`{attr}` egenskapen er hverken arvet eller gyldig for `role` {role}.'
      }
    },
    'QW-ACT-R26': {
      name: 'Video med lyd har et tilgjengelig alternativ',
      description:
        'Denne regelen sjekker at video-element med lyd enten er tekstet eller har et tekstalternativ til lyden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk resultatet samsvar basert på resultatet fra testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på resultatet fra testregelen ',
        F1: 'Testobjektet fikk resultatet feilet basert på resultatet fra testregelen '
      }
    },
    'QW-ACT-R27': {
      name: 'aria-* attributt er definert i WAI-ARIA',
      description: 'Denne regelen sjekker at alle aria-* attributt som er brukt er definert i ARIA 1.1.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Alle aria-* attributt brukt i element er definert i ARIA 1.1.',
        F1: 'En eller flere aria-* attributt er ikke definert i ARIA 1.1.'
      }
    },
    'QW-ACT-R28': {
      name: 'Element med role-attributt har nødvendige tilstander og egenskaper',
      description:
        'Denne regelen sjekker at element som har en eksplisitt rolle også spesifiserer alle nødvendige tilstander og egenskaper.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med eksplisitt rolle har alle nødvendige tilstander og egenskaper.',
        P2: 'Element med eksplisitt rolle, der den definerte rollen ikke har obligatorisk tilstander eller egenskaper.',
        F1: 'Element med eksplisitt rolle mangler nødvendige tilstander eller egenskaper.'
      }
    },
    'QW-ACT-R29': {
      name: 'Lydklipp har et tekstalternativ',
      description: 'Denne regelen sjekker at lydklipp har et tekstalternativ.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R30': {
      name: 'Synlig ledetekst er del av tilgjengelig navn',
      description:
        'Denne regelen sjekker at alle interaktive element med synlig ledetekst også har denne som del av sitt tilgjengelige navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med visuell ledetekst har et tilgjengelig navn som er identisk med eller inneholder den visuelle ledeteksten.',
        F1: 'Element med visuell ledetekst mangler et tilgjengelig navn.',
        F2: 'Element med visuell ledetekst har et tilgjengelig navn som ikke inneholder den visuelle ledeteksten.'
      }
    },
    'QW-ACT-R31': {
      name: 'Video uten lyd har et tilgjengelig alternativ',
      description: 'Denne regelen sjekker at video-element uten lyd har et tilgjengelig alternativ.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R32': {
      name: 'Video med lyd er synstolket',
      description: 'Denne regelen sjekker at video-element med lyd er synstolket.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R33': {
      name: 'ARIA påkrevd kontekst-rolle',
      description:
        'Denne regelen sjekker at element med en eksplisitt semantisk rolle finnes inni sin påkrevde kontekst.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med en eksplisitt semantisk rolle har overordnet element der påkrevd `role` finnes.',
        F1: 'Element med en eksplisitt semantisk rolle har overordnet element der påkrevd `role` mangler.'
      }
    },
    'QW-ACT-R34': {
      name: 'ARIA tilstander og egenskaper har gyldig verdi',
      description: 'Denne regelen sjekker at alle ARIA tilstander og egenskaper har en gyldig verdi.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med `{attr}`-attributtet har en gyldig verdi.',
        F1: 'Element med `{attr}`-attributtet har en ugyldig verdi.'
      }
    },
    'QW-ACT-R35': {
      name: 'Overskrifter har et tilgjengelig navn',
      description:
        'Denne regelen sjekker at alle HTML-element med semantisk rolle overskrift har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'HTML-element med semantisk rolle overskrift har et tilgjengelig navn.',
        F1: "HTML-element med semantisk rolle overskrift mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R36': {
      name: 'Overskrifts-attributt i tabeller har gyldig referanse',
      description:
        'Denne regelen sjekker at overskrift-attributt på en celle i en tabell refererer til andre celler i samme tabell-element og at disse har en semantisk rolle som kolonne eller radoverskrift.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Alle overskrifts-attributt refererer til en celle i samme tabell med semantisk rolle som kolonne- eller radoverskrift.',
        F1: 'Overskrifts-attributtet `{attr}` refererer til en id som ikke finnes i samme tabell.',
        F2: 'Overskrifts-attributtet `{attr}` refererer til et element i samme tabell som mangler semantisk rolle som kolonne- eller radoverskrift.'
      }
    },
    'QW-ACT-R37': {
      name: 'Kontrast mellom tekst og bakgrunn (minimum)',
      description:
        'Denne regelen sjekker at element med tekst oppfyller minstekravet til kontrast mellom tekst og bakgrunn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med målt kontrast over minstekravet.',
        P2: 'Element har ikke tekst på et menneskelig språk.',
        P3: 'Element har en gradient med kontrast over minstekravet.',
        W1: 'Element har tekst-skygge som må verifiseres manuelt.',
        W2: 'Element har bilde som bakgrunn.',
        W3: 'Element har en gradient som ikke kan verifiseres automatisk.',
        F1: 'Element har målt kontrast under minstekravet.',
        F2: 'Element har en gradient med målt kontrast under minstekravet.'
      }
    },
    'QW-ACT-R38': {
      name: 'ARIA påkrevde element finnes',
      description:
        'Denne regelen sjekker at element med en eksplisitt semantisk rolle eier minst ett av sine påkrevde element.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med en eksplisitt semantisk rolle eier bare element med gyldig rolle.',
        F1: 'Element med en eksplisitt semantisk rolle eier element som ikke har gyldig rolle.'
      }
    },
    'QW-ACT-R39': {
      name: 'Alle overskriftceller i en tabell er tilknyttet dataceller',
      description:
        'Denne regelen sjekker at alle overskriftsceller i en tabell er koblet til minst en datacelle i samme table-element',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Overskriftcelle er koblet til minst en datacelle.',
        F1: 'Overskriftcelle mangler kobling til en datacelle.'
      }
    },
    'QW-ACT-R40': {
      name: 'CSS-overflow fører ikke til tap av innhold ved zooming.',
      description:
        'Denne regelen sjekker at bruk av CSS-overflow på tekst-elementer ikke fører til tap av innhold når siden blir zoomet inn med 200% på en 1280 x 1024 piksel stor viewport.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at tekst-element og underliggende element ikke mister innhold som følger av overflow.'
      }
    },
    'QW-ACT-R41': {
      name: 'Feilmeldinger i skjema er beskrivende',
      description:
        'Denne regelen sjekker at det blir gitt beskrivende feilmeldinger i skjemaelement når en bruker oppgir en verdi som er ugyldig eller i feil format.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at feilmeldingen identifiser årsaken til feilen eller beskriver hvordan feilen kan rettes.'
      }
    },
    'QW-ACT-R42': {
      name: 'object-element har et tilgjengelig navn',
      description: 'Denne regelen sjekker at alle `object`-element har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'object-element har et tilgjengelig navn.',
        F1: "object-element mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R43': {
      name: 'Element som skroller kan betjenes med tastatur',
      description: 'Denne regelen sjekker at element som skroller kan betjenes med tastatur.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element som skroller kan få fokus med tastatur.',
        F1: 'Element som skroller inkludert underordna element får ikke fokus med tastatur.'
      }
    },
    'QW-ACT-R44': {
      name: 'Lenker med samme tilgjengelige navn går til samme eller tilsvarende lenkemål.',
      description:
        'Denne regelen sjekker at lenker med samme tilgjengelige navn går til samme eller tilsvarende lenkemål.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Lenker med samme tilgjengelige navn har samme lenkemål.',
        W1: 'Lenker med samme tilgjengelige navn har forskjellig lenkemål. Verifiser at lenkemålet er tilsvarende.'
      }
    },
    'QW-ACT-R48': {
      name: 'Element markert som dekorative er ikke er del av accessibility tree',
      description: 'Denne regelen sjekker at element markert som dekorative, ikke er del av accessibility tree.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element markert som dekorativt er ikke del av accessibility tree.',
        F1: 'Element markert som dekorativt er en del av accessibility tree.'
      }
    },
    'QW-ACT-R49': {
      name: 'Lyd eller video som spilles av automatisk har ikke lyd som varer mer enn 3 sekunder',
      description:
        'Denne regelen sjekker at lyd eller video som spilles av automatisk, ikke har lyd som varer mer enn 3 sekunder.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Lyd/video som spilles av automatisk har en avspillingstid på 3 sekunder eller mindre.',
        W1: 'Kan ikke samle inn data fra element med lyd eller video.',
        W2: 'Sjekk om lyd/video som spilles av automatisk har en synlig kontrollmekanisme.'
      }
    },
    'QW-ACT-R50': {
      name: 'Lyd eller video som spilles av automatisk har en kontrollmekanisme.',
      description:
        'Denne regelen sjekker at lyd eller video som spilles av automatisk har en synlig kontrollmekanisme.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Lyd/video som spilles av automatisk har en synlig kontrollmekanisme.',
        W1: 'Kan ikke samle inn data fra element med lyd eller video.',
        W2: 'Sjekk om lyd/video som spilles av automatisk har en synlig kontrollmekanisme.'
      }
    },
    'QW-ACT-R51': {
      name: 'Video uten lyd er et mediealternativ til tekst',
      description: 'Denne regelen sjekker at forhåndsinnspilt video uten lyd er et mediealternativ for tekst på siden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data om video-element.',
        W2: 'Sjekk at innholdet i videoen gjengir informasjonen i teksten.'
      }
    },
    'QW-ACT-R52': {
      name: 'Video uten lyd har et beskrivende track-element',
      description:
        'Denne regelen sjekker at forhåndsinnspilt video-element uten lyd inneholder et track-element som gjengir innholdet i videoen.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Sjekk at innholdet i videoens track-element gjengir innholdet i videoen.'
      }
    },
    'QW-ACT-R53': {
      name: 'Video uten lyd har har tekstalternativ',
      description:
        'Denne regelen sjekker at forhåndsinnspilt video uten lyd har et tekstalternativ som gjengir innholdet i videoen.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Sjekk at videoen har et tekstalternativ som gjengir innholdet i videoen.'
      }
    },
    'QW-ACT-R54': {
      name: 'Video uten lyd har et alternativt lydspor',
      description: 'Denne regelen sjekker at forhåndsinnspilt video uten lyd har et lyd-alternativ.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Sjekk at videoen har minst et lyd-alternativ som gjengir innholdet i videoen.'
      }
    },
    'QW-ACT-R55': {
      name: 'Forhåndsinnspilt video er synstolka',
      description: 'Denne regelen sjekker at forhåndsinnspilt video er synstolka.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Videoen har et lydspor, men vi kan ikke verifisere lydstyrken. Sjekk at lydsporet inneholder lyd og at det gjengir det visuelle innholdet i videoen.'
      }
    },
    'QW-ACT-R56': {
      name: 'Video er et mediealternativ for tekst.',
      description: 'Denne regelen sjekker at forhåndsinnspilt video er et mediealternativ for tekst på siden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Sjekk at innholdet i videoen gjengir informasjonen i teksten.'
      }
    },
    'QW-ACT-R57': {
      name: 'Video med lyd har et beskrivende track-element',
      description:
        'Denne regelen sjekker at forhåndsinnspilt video med lyd har et track-element gjengir innholdet i videoen.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Videoen har et lydspor, men vi kan ikke verifisere lydstyrken. Sjekk at videoen har lyd og at innholdet i track-element gjengir det visuelle innholdet i videoen.'
      }
    },
    'QW-ACT-R58': {
      name: 'Lydklipp har tekstalternativ',
      description:
        'Denne regelen sjekker at forhåndsinnspilt lydklipp har et tekstalternativ som gjengir innholdet i lydklippet.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at tekstalternativet gjengir innholdet i lydklippet.'
      }
    },
    'QW-ACT-R59': {
      name: 'Lydklipp er et mediealternativ for tekst',
      description: 'Denne regelen sjekker at lydklipp er et mediealternativ til tekst på siden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at innholdet i lydklippet gjengir innholdet i teksten'
      }
    },
    'QW-ACT-R60': {
      name: 'Video med lyd er teksta',
      description: 'Denne regelen sjekker at forhåndsinnspilt video med lyd er teksta.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Videoen har et lydspor, men vi kan ikke verifisere lydstyrken. Sjekk at videoen har lyd og at det finnes teksting som formidler innholdet i videoens lydspor.'
      }
    },
    'QW-ACT-R61': {
      name: 'Video har et tekstalternativ',
      description: 'Denne regelen sjekket at forhåndsinnspilt video med lyd har et tekstalternativ.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Kan ikke samle inn data fra video-element.',
        W2: 'Videoen har et lydspor, men vi kan ikke verifisere lydstyrken. Sjekk at videoen har lyd og at det finnes et tekstalternativ som gjengir innholdet i videoen.'
      }
    },
    'QW-ACT-R62': {
      name: 'Element som kan nås med tastatur har visuell fokusmarkering',
      description: 'Denne regelen sjekker at alle element som kan nås med tastaturet har visuell fokusmarkering.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at element har visuell fokusmarkering'
      }
    },
    'QW-ACT-R63': {
      name: 'Dokument har et landemerke med ikke-gjentatt innhold',
      description:
        'Denne regelen sjekker at hver side inneholder et element med semantisk rolle som landmerke og som starter med ikke-gjentatt innhold.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Siden har ikke gjentatt innhold.',
        W1: 'Sjekk at det ikke finnes gjentatt innhold som etterfølges av ikke-gjentatt innhold. Dersom ja sjekk om det eksisterer et element der følgende betingelser er oppfylt: - element har en semantisk rolle som arver fra landemerke; og - det første synlige innholdet (in tree order in the flat tree) som er en inkluderende etterkommer av element er ikke-gjentatt innhold etter gjentatt innhold; og - element er inkludert i accessibility tree.'
      }
    },
    'QW-ACT-R64': {
      name: 'Dokument har overskrift for ikke-gjentatt innhold',
      description: 'Denne regelen sjekker at ikke-gjentatt innhold på nettsider inneholder en overskrift.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Siden har ikke gjentatt innhold.',
        W1: 'Sjekk at det ikke finnes gjentatt innhold som etterfølges av ikke-gjentatt innhold. Dersom ja, sjekk om det eksisterer et element der følgende betingelser er oppfylt: - element er ikke-gjentatt innhold etter gjentatt innhold. - element har en semantisk rolle som overskrift. - element er visuelt synlig - element er inkludert i accessibility tree.'
      }
    },
    'QW-ACT-R65': {
      name: 'Element ment for presentasjon får ikke fokus',
      description:
        'Denne regelen sjekker at element med en rolle som gjør at alle underordna element er ment for presentasjon ikke inneholder element som kan få fokus.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element har ingen underordna element som kan få fokus.',
        F1: 'Element har underordna element som kan få fokus.'
      }
    },
    'QW-ACT-R66': {
      name: 'Element med rolle som menuitem har et tilgjengelig navn',
      description: 'Denne regelen sjekker at element med en rolle som menuitem har et tilgjengelig navn.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med rolle som menuitem har et tilgjengelig navn.',
        F1: "Element med rolle som menuitem mangler et tilgjengelig navn eller det er tomt ('')."
      }
    },
    'QW-ACT-R67': {
      name: 'Bokstavavstand i style-attributt bruker ikke !important',
      description:
        'Denne regelen sjekker at style-attributtet angir en bokstavavstand (letter-spacing) på minst minst 0,12 ganger skriftstørrelsen eller at det ikke er brukt !important for å hindre justering av bokstavavstanden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element der letter-spacing i style-attributtet ikke er satt til !important.',
        P2: 'Element der letter-spacing i style-attributtet er satt til 0.12 ganger skriftstørrelsen eller mer.',
        P3: 'Element der letter-spacing er satt i stilarket.',
        F1: 'Element der letter-spacing i style-attributtet er satt slik at det hindrer at bokstavavstanden kan bli høyere enn 0.12 ganger skriftstørrelsen.'
      }
    },
    'QW-ACT-R68': {
      name: 'Linjehøyde i style-attributt bruker ikke !important',
      description:
        'Denne regelen sjekker om style-attributtet enten angir en linjehøyde (line-height) på minst 1.5 ganger skriftsstørelse eller at at det ikke er brukt !important for å hindre justering av linjehøyden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element der line-height i style-attributtet ikke er satt til !important.',
        P2: 'Element der line-height er satt til 1.5 ganger skriftstørrelsen eller mer.',
        P3: 'Element der line-height er satt i stilarket.',
        F1: 'Element der line-height i style-attributtet er satt slik at det hindrer at linjehøyden kan bli høyere enn 1.5 ganger skriftstørrelsen.'
      }
    },
    'QW-ACT-R69': {
      name: 'Ordavstand i style-attributt bruker ikke !important',
      description:
        'Denne regelen sjekker om style-attributtet angir en ordavstand (word-spacing) for å hindre justering av ordavstand ved å bruke !important, med mindre verdien er minst 0.16 ganger skriftstørrelsen.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element der word-spacing i style-attributtet ikke er satt til !important.',
        P2: 'Element der word-spacing i style-attributtet er satt til 0.16 ganger skriftstørrelsen  eller mer.',
        P3: 'Element der word-spacing er satt i stilarket.',
        F1: 'Element der word-spacing i style-attributtet er satt slik at det hindrer at ordavstanden kan bli høyere enn 0.16 ganger skriftstørrelsen.'
      }
    },
    'QW-ACT-R70': {
      name: 'iframe-element med negativ tabindex har ingen interaktive elementer.',
      description:
        'Denne regelen sjekker om `iframe`-element med en negativ `tabindex`-attributtverdi inneholder interaktive elementer.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'iframe-element med negativ tabindex inneholder ikke elementer som er synlige eller kan få fokus.',
        F1: 'iframe-element med negativ tabindex inneholder elementer som er synlige eller kan få fokus.'
      }
    },
    'QW-ACT-R71': {
      name: '`meta`-element har ingen oppdateringsforsinkelse (ingen unntak)',
      description:
        'Denne regelen sjekker om meta-element blir brukt for forsinket omdirigering eller oppdatering av en nettside.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Nettsiden oppdaterer/omdirigerer umiddelbart.',
        F1: 'Nettsiden oppdaterer seg etter {seconds} sekunder.',
        F2: 'Nettsiden omdirigerer etter {seconds} sekunder.'
      }
    },
    'QW-ACT-R72': {
      name: 'Første fokuserbare element på nettsiden er en lenke til ikke-gjentatt innhold.',
      description:
        'Denne regelen sjekker om første fokuserbare element på nettsiden er en lenke til ikke-gjentatt innhold.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        W1: 'Sjekk at første fokuserbare element har et tilgjengelig navn som formidler at det hopper over innhold.',
        W2: 'Sjekk at første fokuserbare element lenker til sidens hovedinnhold og at det tilgjengelige navnet formidler dette.',
        F1: 'Første fokuserbare element kan ikke aktiveres med tastaturet.',
        F2: 'Første fokuserbare element er ikke i accessibility tree.',
        F3: 'Første fokuserbare element har ikke rolle som lenke.',
        F4: 'Første fokuserbare element lenker ikke til hovedinnholdet.',
        F5: 'Siden har ingen element som kan få fokus.'
      }
    },
    'QW-ACT-R73': {
      name: 'Blokker med gjentatt innhold kan foldes sammen',
      description: 'Denne regelen sjekker at blokker med gjentatt innhold kan foldes sammen.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Siden har ikke gjentatt innhold.',
        W1: 'For hver blokk med gjentatt innhold som er plassert (in the flat tree) før minst én node med ikke-gjentatt innhold etter gjentatt innhold, sjekk at det finnes en mekanisme for å gjøre alle noder i denne blokken usynlige både visuelt og i accessibility tree.'
      }
    },
    'QW-ACT-R74': {
      name: 'Siden har en mekanisme for å flytte fokus til ikke-gjentatt innhold',
      description:
        'Denne regelen sjekker om det finnes en mekanisme for å flytte fokus til ikke-gjentatt innhold på siden.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Siden har ikke gjentatt innhold.',
        W1: 'Siden har en eller flere mekanismer for å flytte fokus. Sjekk om noen av disse mekanismene blir brukt før en blokk med gjentatt innhold, og om fokus blir flyttet til rett før en blokk med ikke-gjentatt innhold.'
      }
    },
    'QW-ACT-R75': {
      name: 'Hopp over blokker med gjenntatt innhold',
      description: 'Denne regelen sjekker at hver side har en mekanisme for å hoppe over blokker med gjentatt innhold.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Testobjektet fikk samsvar basert på testregelen ',
        W1: 'Testobjektet kunne ikke verifiseres basert på testregelen ',
        F1: 'Testobjektet feilet basert på testregelen '
      }
    },
    'QW-ACT-R76': {
      name: 'Kontrast mellom tekst og bakgrunn (forbedret)',
      description: 'Denne regelen sjekker at element med tekst oppfyller kravet til forbedret kontrast.',
      results: {
        I1: 'Ingen testobjekt funnet.',
        P1: 'Element med målt kontrast over minstekravet (forbedret).',
        P2: 'Element har ikke tekst på et menneskelig språk.',
        P3: 'Element har en gradient med kontrast over minstekravet (forbedret).',
        W1: 'Element har tekst-skygge som må verifiseres manuelt.',
        W2: 'Element har bilde som bakgrunn.',
        W3: 'Element har en gradient som ikke kan verifiseres automatisk.',
        F1: 'Element har målt kontrast under minstekravet (forbedret).',
        F2: 'Element har en gradient med målt kontrast under minstekravet (forbedret).'
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
