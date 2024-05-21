import { Locale } from '@shared/types';

export const fi: Locale = {
  'act-rules': {
    'QW-ACT-R1': {
      name: 'HTML-sivulla on sivuotsikko',
      description: "Tämä sääntö tarkastaa, että HTML-sivulla on 'title'-elementti.",
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Title`-elementti löytyy eikä se ole tyhjä.',
        F1: '`Title`-elementtiä ei löydy.',
        F2: '`Title`-elementti on tyhjä.',
        F3: 'Löytynyt `title`-elementti ei ole sivun otsikkona.'
      }
    },
    'QW-ACT-R2': {
      name: '`Html` -elementissä on `lang`-attribuutti',
      description:
        'Tämä sääntö tarkastaa, että `html`-elementillä on `lang`- tai `xml:lang`-attribuutti, joka ei ole tyhjä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Lang`-attribuutti löytyi ja sille on asetettu arvo.',
        F1: '`Lang`-attribuuttia ei löydy tai se on tyhjä.'
      }
    },
    'QW-ACT-R3': {
      name: 'HTML-elementin `lang` ja `xml:lang` vastaavat toisiaan',
      description:
        'Tämä sääntö tarkastaa, että jos `html`-elementti sisältää sekä `lang`- että `xml:lang`-attribuutit, jotka eivät ole tyhjiä, niiden arvot vastaavat toisiaan.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Lang`- ja `xml:lang`-attribuuteilla on sama arvo.',
        F1: '`Lang`- ja `xml:lang`-attribuuttien arvot eivät vastaa toisiaan.'
      }
    },
    'QW-ACT-R4': {
      name: '`Meta`-elementin uudelleenlatauksessa ei viivettä',
      description:
        'Tämä sääntö tarkastaa, että `meta`-elementtiä ei ole käytetty viivästettyyn uudelleenohjaukseen tai uudelleenlataukseen.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen uudelleen lataaminen tai uudelleenohjaus tehdään välittömästi.',
        P2: 'Kohteen uudelleen lataaminen tai uudelleenohjaus tapahtuu yli 20 tunnin kuluttua.',
        F1: 'Kohde uudelleenladataan {seconds} sekunnin jälkeen.',
        F2: 'Kohde uudelleenohjataan {seconds} sekunnin jälkeen.'
      }
    },
    'QW-ACT-R5': {
      name: '`Html`-elementin `lang`-attribuutin kelpoisuus',
      description: 'Tämä sääntö tarkastaa, että `lang` tai `xml:lang` -attribuutilla on hyväksytty kielikoodi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Lang`-attribuutti sisältää hyväksytyn kielikoodin.',
        F1: '`Lang`-attribuutti ei sisällä hyväksyttyä kielikoodia.'
      }
    },
    'QW-ACT-R6': {
      name: 'Kuvaa esittävällä painikkeella on saavutettava nimi',
      description: 'Tämä sääntö tarkastaa, että jokaisella kuvaa esittävällä painikkeella on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä.'
      }
    },
    'QW-ACT-R7': {
      name: 'Sivun asentoa ei ole rajoitettu CSS:n `transform`-säännöllä',
      description:
        'Tämä sääntö tarkastaa, että sivun sisältöä ei ole rajoitettu vaaka- eikä pystyasentoon CSS:n `transform`-säännöllä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sivulla olevan CSS:n `transform`-säännön `rotateZ`-funktiota käytetään `orientation`-ehdon kanssa tavalla, joka ei rajoita elementtiä pysty- tai vaakasuoraan esitystapaan.',
        F1: 'Sivulla olevan CSS:n `transform`-säännön `rotate`-funktiota käytetään `orientation`-ehdon kanssa tavalla, joka rajoittaa elementin vaakasuoraan esitystapaan.'
      }
    },
    'QW-ACT-R9': {
      name: 'Linkeillä, joilla on samat saavutettavat nimet, on myös sama merkitys',
      description:
        'Tämä sääntö tarkastaa, että linkit, joilla on samat saavutettavat nimet, johtavat samaan tai vastaavaan sisältöön.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Linkit, joilla on sama saavutettava nimi, johtavat samaan sisältöön.',
        F1: 'Linkit, joilla on sama saavutettava nimi, johtavat eri sisältöihin. Varmista, että sisällöt vastaavat toisiaan.'
      }
    },
    'QW-ACT-R10': {
      name: '`Iframe`-elementeillä, joilla on samat saavutettavat nimet, on myös sama tarkoitus',
      description:
        'Tämä sääntö tarkastaa, että `iframe`-elementit, joilla on sama saavutettava nimi, käyttävät upotuksessa samaa tai vastaavaa sisältöä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Iframe`-elementeillä, joilla on sama saavutettava nimi, on sama sisältö.',
        F1: '`Iframe`-elementeillä, joilla on sama saavutettava nimi, on eri sisältö.'
      }
    },
    'QW-ACT-R11': {
      name: 'Painikkeella on saavutettava nimi',
      description: 'Tämä sääntö tarkastaa, että jokaisella painike-elementillä on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R12': {
      name: 'Linkillä on saavutettava nimi',
      description: 'Tämä sääntö tarkastaa, että jokaisella linkillä on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R13': {
      name: 'Elementillä, jolle on määritelty `aria-hidden`-attribuutti, ei ole kohdistettavaa sisältöä',
      description:
        'Tämä sääntö tarkastaa, että `aria-hidden` -attribuutin omaavat elementit eivät sisällä kohdistettavia alielementtejä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen alielementit eivät ole kohdistettavia.',
        P2: 'Kohde ei ole kohdistettava.',
        F1: 'Kohteella on kohdistettavia alielementtejä.',
        F2: 'Kohde on kohdistettava.'
      }
    },
    'QW-ACT-R14': {
      name: '`Meta viewport` ei estä zoomausta',
      description: 'Tämä sääntö tarkastaa, että `meta`-elementti säilyttää selaimen zoom-toiminnon.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Meta`-elementti, jolla on `name=viewport`-attribuutti, ei määritä `maximum-scale`- tai `user-scalable`-arvoja.',
        P2: '`Meta`-elementti, jolla on `name=viewport`-attribuutti mahdollistaa selaimen zoom-toiminnon käytön.',
        F1: '`Meta`-elementti, jolla on `name=viewport`-attribuutti, poistaa selaimelta mahdollisuuden zoomata käyttäen määrityksiä `user-scalable=no` tai `maximum-scale < 2`.'
      }
    },
    'QW-ACT-R15': {
      name: 'Ääni- tai videosisältö ei sisällä ääntä, joka käynnistyy automaattisesti',
      description:
        'Tämä sääntö tarkastaa, että äänisisällön automaattitoisto ei kestä yli kolmea (3) sekuntia, tai äänisisällölle on olemassa mekanismi, jonka avulla käyttäjä voi sen pysäyttää tai hiljentää.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voitu todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R16': {
      name: 'Lomake-elementillä on saavutettava nimi',
      description: 'Lomake-elementillä on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R17': {
      name: 'Kuvalla on saavutettava nimi',
      description:
        'Tämä sääntö tarkastaa, että kaikilla kuvilla, joita ei ole merkitty koristeellisiksi, on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohde on koristeellinen.',
        P2: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä.'
      }
    },
    'QW-ACT-R18': {
      name: '`Id`-attribuutin arvo on yksilöllinen',
      description:
        'Tämä sääntö tarkastaa, että jokaisen samalla sivulla esiintyvällä `id`-attribuutilla on yksilöllinen arvo.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen `id`-attribuutin arvo on yksilöllinen.',
        F1: 'Usealla elementillä on sama `id`-attribuutin arvo.'
      }
    },
    'QW-ACT-R19': {
      name: '`Iframe`-elementillä on saavutettava nimi',
      description: 'Tämä sääntö tarkastaa, että jokaisella `iframe`-elementillä on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R20': {
      name: '`Role`-attribuutilla on sallittu arvo',
      description: 'Tämä sääntö tarkastaa, että jokaisella `role`-attribuutilla on sallittu arvo.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on sallittu arvo `role`-attribuutissa.',
        F1: 'Kohteen `role`-attribuutin arvo on virheellinen.'
      }
    },
    'QW-ACT-R21': {
      name: '`Svg`-elementillä, jolla on eksplisiittinen rooli, on saavutettava nimi',
      description:
        'Tämä sääntö tarkastaa, että jokaisella `svg`-muotoisella kuvalla, joka on eksplisiittisesti sisällytetty saavutettavuuden sisältömalliin, on saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R22': {
      name: '`Body`-elementin alielementin `lang`-attribuutin arvo on sallittu.',
      description:
        'Tämä sääntö tarkastaa, että sivun `body`-elementin sisällä olevan elementin `lang`-attribuutti sisältää hyväksytyn kielikoodin.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen `lang`-attribuutti sisältää hyväksytyn kielikoodin.',
        F1: 'Kohteen `lang`-attribuutin kielikoodi on virheellinen.'
      }
    },
    'QW-ACT-R23': {
      name: 'Videon näkyvälle sisällölle on saavutettava vaihtoehto',
      description:
        'Tämä sääntö tarkastaa, että ääntä sisältävissä videoissa visuaaliselle sisällölle on tarjolla vaihtoehto myös ääni- tai tekstimuodossa.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R24': {
      name: '`Autocomplete`-attribuutilla on sallittu arvo',
      description: 'Tämä sääntö tarkastaa, että HTML:n `autocomplete` -attribuutilla on sallittu arvo.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen `autocomplete`-attribuutilla on sallittu arvo.',
        F1: 'Kohteen `autocomplete`-attribuutin arvo on virheellinen.'
      }
    },
    'QW-ACT-R25': {
      name: '`ARIA-tilan tai -ominaisuuden käyttö on sallittua.',
      description:
        'Tämä sääntö tarkastaa, että WAI-ARIA-tiloja ja -ominaisuuksia on käytetty vain sallituissa elementeissä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`{attr}`-ominaisuus on tuettu tai peritty roolista `{role}`.',
        F1: '`{attr}`-ominaisuutta ei ole peritty eikä tuettu roolille `{role}`.'
      }
    },
    'QW-ACT-R26': {
      name: 'Videon äänisisällölle on saavutettava vaihtoehto',
      description: 'Tämä sääntö tarkastaa, että videon äänisisällöille on olemassa vaihtoehtoinen esitystapa.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R27': {
      name: 'ARIA-attribuutti löytyy WAI-ARIA -dokumentaatiosta',
      description:
        'Tämä sääntö tarkastaa, että jokainen käytetty `aria-*`-attribuutti on määritelty WAI-ARIA 1.1 -dokumentaatiossa.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kaikki elementissä esiintyvät `aria`-alkuiset attribuutit sisältyvään WAI-ARIA 1.1 -määrityksiin.',
        F1: 'Yksi tai useampi `aria`-alkuinen attribuutti ei sisälly WAI-ARIA 1.1 -määrityksiin.'
      }
    },
    'QW-ACT-R28': {
      name: 'Elementillä, jolle on määritelty `role`-attribuutti, on annettu myös vaaditut tilat ja ominaisuudet',
      description:
        'Tämä sääntö tarkastaa, että elementeille, joille on määritelty `role`-attribuutti, on myös annettu kaikki kyseisen `role`-attribuutin yhteydessä vaadittavat tilat ja ominaisuudet.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kaikki kohde-elementin vaaditut attribuutit on annettu.',
        P2: 'Kohde-elementin `role`-attribuuttiin ei liity pakollisia tila- tai ominaisuusmäärityksiä.',
        F1: 'Kohde-elementiltä puuttuu vaadittuja tila- tai ominaisuusmäärityksiä.'
      }
    },
    'QW-ACT-R29': {
      name: 'Äänielementin sisältö on saatavissa myös tekstinä',
      description:
        'Tämä sääntö tarkastaa, onko pelkkää ääntä sisältävää sisällölle tarjolla myös tekstimuotoinen vaihtoehto.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R30': {
      name: 'Elementin näkyvä nimi on osa sen saavutettavaa nimeä',
      description:
        'Tämä sääntö tarkastaa, että interaktiivisten elementtien kohdalla visuaalisesti näkyvissä nimi on osa sen saavutettavaa nimeä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen näkyvä teksti vastaa kokonaan tai on osa sen saavutettavaa nimeä.',
        F1: 'Kohteella ei ole saavutettavaa nimeä.',
        F2: 'Kohteen näkyvä teksti ei vastaa sen saavutettavaa nimeä eikä ole sen osa.'
      }
    },
    'QW-ACT-R31': {
      name: 'Äänettömän videon näkyvälle sisällölle on saavutettava vaihtoehto',
      description:
        'Tämä sääntö tarkastaa, että tietosisältö videossa, jossa ei ole äänisisältöä, on saatavilla myös saavutettavassa vaihtoehtoisessa muodossa.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R32': {
      name: 'Videon näkyvälle sisällölle on saavutettava vaihtoehto',
      description: 'Tämä sääntö tarkastaa, että ääntä sisältävät videot sisältävät myös kuvailutulkkauksen.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R33': {
      name: 'ARIA:n vaatima rooli kontekstissa',
      description:
        'Tämä sääntö tarkastaa, että elementti, jolla on eksplisiittinen semanttinen rooli, sijaitsee tämän roolin edellyttämässä yhteydessä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen emoelementillä on kontekstin vaatima rooli.',
        F1: 'Kohteen emoelementillä ei ole kontekstin vaatimaa roolia.'
      }
    },
    'QW-ACT-R34': {
      name: 'ARIA-tilalla tai -ominaisuudella on sallittu arvo',
      description: 'Tämä sääntö tarkastaa, että jokaisella annetulla ARIA-tilalla ja -ominaisuudella on sallittu arvo.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen `{attr}`-attribuutilla on sallittu arvo.',
        F1: 'Kohteen `{attr}`-attribuutin arvo on virheellinen.'
      }
    },
    'QW-ACT-R35': {
      name: 'Otsikolla on saavutettava nimi',
      description:
        'Tämä sääntö pätee mihin tahansa semanttiselta merkitykseltään otsikoksi määriteltyyn HTML-elementtiin, joka sisältyy  saavutettavuuden sisältömalliin.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi, joka ei ole tyhjä.',
        F1: "Kohteella ei ole saavutettavaa nimeä tai se on tyhjä ('')."
      }
    },
    'QW-ACT-R36': {
      name: 'Solun `headers`-attribuutti viittaa soluun samassa taulukkoelementissä.',
      description:
        'Tämä sääntö tarkastaa, että solun `headers`-attribuutti viittaa samassa taulukossa olevaan soluun, jolla on sarakkeen tai rivin otsikon semanttinen merkitys.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kaikki `headers`-attribuutin arvot viittaavat samassa taulukossa oleviin sarakkeen ja rivin otsikkosoluihin.',
        F1: '`Headers`-attribuutin arvo `{attr}` viittaa elementin `id`-arvoon, jota ei esiinny samassa taulukossa.',
        F2: 'Headers-attribuutin arvo `{attr}` viittaa samassa taulukossa olevaan elementtiin, joka ei ole sarakkeen tai rivin otsikko.'
      }
    },
    'QW-ACT-R37': {
      name: 'Teksti täyttää kontrastin vähimmäisvaatimukset',
      description:
        'Tämä sääntö tarkastaa, että jokaisen tekstissä esiintyvän kirjoitusmerkin suurin mahdollinen kontrasti taustaansa vasten täyttää vähimmäisvaatimukset kontrastille.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Elementin kontrasti ylittää vähimmäisvaatimukset.',
        P2: 'Elementin merkeillä ei esitetä tekstiä luonnollisella kielellä.',
        P3: 'Elementin kontrasti taustan liukuvärin kanssa ylittää vähimmäisvaatimukset.',
        W1: 'Elementillä on tekstin varjostus, joka vaatii manuaalista tarkistusta.',
        W2: 'Elementin taustalla on kuva.',
        W3: 'Elementillä taustalla on liukuväri, jota emme pysty todentamaan.',
        F1: 'Elementin kontrasti ei täytä vähimmäisvaatimuksia.',
        F2: 'Elementin kontrasti taustan liukuvärin kanssa ei täytä vähimmäisvaatimuksia.'
      }
    },
    'QW-ACT-R38': {
      name: 'ARIA:n vaatimat omistetut elementit',
      description:
        'Tämä sääntö tarkastaa, että elementillä, jolla on eksplisiittinen semanttinen rooli, on vähintään yksi roolin vaatima omistettu elementti.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohde omistaa vain elementtejä, joilla on vaadittu rooli.',
        F1: 'Kohde omistaa elementtejä, joilla ei ole vaadittua roolia.'
      }
    },
    'QW-ACT-R39': {
      name: 'Kaikki taulukon otsikkosolut kohdistuvat sisältösoluihin',
      description:
        'Tämä sääntö tarkastaa, että taulukkoelementin jokainen otsikkosolu kohdistuu johonkin sisältösoluun.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sarakkeen otsikkoelementti kohdistuu ainakin yhteen soluun.',
        F1: 'Sarakkeen otsikkoelementti ei kohdistu yhteenkään soluun.'
      }
    },
    'QW-ACT-R40': {
      name: 'CSS:n `overflow`-määritys ei leikkaa zoomattua tekstiä.',
      description:
        'Tämä sääntö tarkastaa, että tekstit eivät tarkoituksetta leikkaudu `overflow`-määrityksellä, kun sivua zoomataan 200 %:lla 1280 x 1024 -kokoisessa näkymässä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, etteivät tekstit tai niitä kehystävät elementit leikkaudu `overflow`-määrityksellä.'
      }
    },
    'QW-ACT-R41': {
      name: 'Virheilmoitus selittää virheen lomakekentän syötteessä.',
      description:
        'Tämä sääntö tarkastaa, että kun käyttäjä on syöttänyt lomakkeen kenttään virheellisen arvon tai antanut sen virheellisessä muodossa, saatu virheilmoitus kertoo virheen syyn tai miten sen voi korjata.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, että saatu virheilmoitus kertoo virheen syyn tai, miten sen voi korjata.'
      }
    },
    'QW-ACT-R42': {
      name: '`Object`-elementillä on saavutettava nimi, joka ei ole tyhjä.',
      description:
        'Tämä sääntö tarkastaa, että jokaisella `object`-elementillä on saavutettava nimi, joka ei ole tyhjä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on saavutettava nimi, joka ei ole tyhjä.',
        F1: 'Kohteelta ei löydy saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R43': {
      name: 'Vieritettävä elementti on käytettävissä näppäimistöllä',
      description: 'Tämä sääntö tarkastaa, että vieritettäviä elementtejä voi vierittää pelkän näppäimistön avulla.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Tämä vieritettävä osio sisältyy järjestyksessä kohdistamisella navigoitaviin sisältöihin.',
        F1: 'Tämä vertikaalisesti tai horisontaalisesti vieritettävä osioelementti ei sisälly järjestyksessä kohdistamisella navigoitaviin sisältöihin eikä sisällä myöskään sellaisia alielementtejä.'
      }
    },
    'QW-ACT-R44': {
      name: 'Samassa yhteydessä sijaitsevilla linkeillä, joilla on sama saavutettava nimi, on sama  käyttötarkoitusta.',
      description:
        'Tämä sääntö tarkastaa, että samassa yhteydessä sijaitsevat linkit, joilla sama saavutettava nimi, palauttavat saman tai vastaavan sisällön.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Linkit, joilla on sama saavutettava nimi, viittaavaan samaan sisältöön.',
        W1: 'Linkit, joilla on sama saavutettava nimi, viittaavat eri sisältöihin. Varmista, että nämä sisällöt ovat yhteneviä.'
      }
    },
    'QW-ACT-R48': {
      name: 'Koristeelliset elementit eivät näy saavutettavuuspuussa',
      description:
        'Tämä sääntö tarkastaa, että koristeellisiksi merkittyjä elementtejä ei ole sisällytetty saavutettavuuden sisältömalliin tai niillä on ainoastaan visualisoiva rooli.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohde ei sisälly saavutettavuuden sisältömalliin.',
        F1: 'Kohde sisältyy saavutettavuuden sisältömalliin.'
      }
    },
    'QW-ACT-R49': {
      name: 'Ääni- tai videosisältö, joka käynnistyy automaattisesti, ei sisällä ääntä, joka kestää yli kolme (3) sekuntia',
      description:
        'Ääni- tai videosisältö, joka käynnistyy automaattisesti, ei tuota yli kolme (3) sekuntia kestävää ääntä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen toisto kestää kolme (3) sekuntia tai vähemmän.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että kohteella on näkyvät toiminnot sen hallitsemiseksi.'
      }
    },
    'QW-ACT-R50': {
      name: 'Ääni- tai videosisällöllä, joka käynnistyy automaattisesti, on ohjausvälineet.',
      description:
        'Ääni- tai videosisällölle, joka käynnistyy automaattisesti, täytyy olla tarjolla toiminnallisuudet sen hallitsemiseksi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on näkyvät ohjausvälineet.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että kohteella on näkyvät toiminnot sen hallitsemiseksi.'
      }
    },
    'QW-ACT-R51': {
      name: 'Videon näkyvä sisältö on tekstin mediavastine',
      description:
        'Tämä sääntö tarkastaa, että pelkkää kuvaa sisältävä videotallenne on sivulla olevan tekstin mediavastine.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että videotallenteen sisältö vastaa tekstiä.'
      }
    },
    'QW-ACT-R52': {
      name: 'Ääntä sisältämättömän videon videosisällölle on kuvailutulkkauksen tekstitysraita',
      description:
        'Tämä sääntö tarkastaa, että ääntä sisältämättömien videotallenteiden kuvailutulkkauksen tekstitysraidat kuvailevat näkyvän sisällön.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että näkyvälle sisällölle on tarjolla saavutettava vaihtoehto.'
      }
    },
    'QW-ACT-R53': {
      name: 'Vain kuvaa sisältävälle videolle on tarjolla transkripti',
      description: 'Ääntä sisältämättömän videotallenteen kaikki näkyvä tieto tulee löytyä transkriptista.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että näkyvälle sisällölle on tarjolla saavutettava vaihtoehto.'
      }
    },
    'QW-ACT-R54': {
      name: 'Vain kuvaa sisältävälle videotallenteelle on tarjolla vaihtoehto äänitallenteena',
      description: 'Ääntä sisältämättömälle videotallenteelle täytyy löytyä vaihtoehto äänitallenteen muodossa.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että näkyvälle sisällölle on tarjolla saavutettava vaihtoehto.'
      }
    },
    'QW-ACT-R55': {
      name: 'Videon näkyvälle sisällölle on tarjolla kuvailutulkkaus',
      description: 'Tämä sääntö tarkastaa, että videotallenteen kaikki näkyvä sisältö löytyy myös videon ääniraidalta.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Kohde-elementillä on ääniraita, mutta sen voimakkuuden todentaminen ei onnistunut. Tarkista, että kohteella on ääniraita, ja jos on, että se tarjoaa videon näkyvälle sisällölle saavutettavan vaihtoehdon.'
      }
    },
    'QW-ACT-R56': {
      name: 'Video on tekstin mediavastine',
      description: 'Tämä sääntö tarkastaa, että videotallenne on sivulla olevan tekstin mediavastine.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Tarkista, että videotallenteen sisältö vastaa tekstiä.'
      }
    },
    'QW-ACT-R57': {
      name: 'Videon näkyvälle sisällölle on kuvailutulkkauksen tekstitysraita',
      description:
        'Tämä sääntö tarkastaa, että videotallenteiden kuvailutulkkauksen tekstitysraidat kuvailevat näkyvän sisällön.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Kohde-elementillä on ääniraita, mutta sen voimakkuuden todentaminen ei onnistunut. Tarkista, että kohteella on ääniraita, ja jos on, että se tarjoaa videon visuaaliselle sisällölle saavutettavan vaihtoehdon.'
      }
    },
    'QW-ACT-R58': {
      name: 'Äänitallenteelle on transkripti',
      description: 'Äänitallenteille pitää olla tekstimuotoinen vaihtoehto, joka sisältää kaiken ääni-informaation.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, että kohteen ääniraidalle löytyy tekstimuotoinen vaihtoehto.'
      }
    },
    'QW-ACT-R59': {
      name: 'Äänitallenne on tekstin mediavastine',
      description: 'Tämä sääntö tarkastaa, että äänitallenne on sivulla olevan tekstin mediavastine.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, että äänitallenteen sisältö vastaa tekstiä.'
      }
    },
    'QW-ACT-R60': {
      name: 'Videon äänisisällölle on tekstitys',
      description: 'Tämä sääntö tarkastaa, että videotallenteen äänisisällölle on tarjolla tekstitys.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Kohde-elementillä on ääniraita, mutta sen voimakkuuden todentaminen ei onnistunut. Tarkista, että kohteella on ääniraita, ja jos on, että  äänisisällölle on sitä vastaava tekstitys.'
      }
    },
    'QW-ACT-R61': {
      name: 'Video elementin ääni- ja kuvasisällölle on olemassa transkripti',
      description:
        'Tämä sääntö tarkastaa, että tallennetulle videosisällölle on transkripti, joka kattaa sen kaiken ääni- ja kuvasisällön.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tiedon saanti kohde-elementistä ei onnistunut.',
        W2: 'Kohde-elementillä on ääniraita, mutta sen voimakkuuden todentaminen ei onnistunut. Tarkista, että kohteella on ääniraita ja transkripti. Jos on, tarkista, että transkripti kuvaa kaiken videolla olevan ääni- ja kuvasisällön.'
      }
    },
    'QW-ACT-R62': {
      name: 'Järjestyksessä kohdistettaviin sisältöihin kuuluvalla elementillä on näkyvä kohdistus',
      description:
        'Tämä sääntö tarkastaa, että jokaisella järjestyksessä kohdistettavalla elementillä on jokin näkyvä kohdistuksen osoitus.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, että elementillä on jokin näkyvä kohdistuksen osoitus.'
      }
    },
    'QW-ACT-R63': {
      name: 'Dokumentilla on maamerkki ei-toistuvalle sisällölle',
      description:
        'Tämä sääntö tarkastaa, että jokaisella sivulla on elementti, jonka semanttinen merkitys  on olla maamerkki ei-toistuvalle sisällölle.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sivulla ei ole toistuvaa sisältöä.',
        W1: 'Tarkista, että sivulla ei joko ole ei-toistuvaa sisältöä toistuvan sisällön jälkeen tai esiintyy elementti, joka täyttää seuraavat ehdot: elementillä on maamerkin semanttinen merkitys, elementin tulostusjärjestyksessä ensimmäinen havaittava alielementti  on toistuvaa sisältöä seuraavaa ei-toistuvaa sisältöä ja elementti sisältyy saavutettavuuden sisältömalliin.'
      }
    },
    'QW-ACT-R64': {
      name: 'Dokumentilla on otsikko ei-toistuvalle sisällölle',
      description: 'Tämä sääntö tarkastaa, että ei-toistuvalle sisällölle on otsikko.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sivulla ei ole toistuvaa sisältöä.',
        W1: 'Tarkista, että sivulla ei joko ole ei-toistuvaa sisältöä toistuvan sisällön jälkeen tai esiintyy elementti, joka täyttää seuraavat ehdot:  elementti on ei-toistuvaa sisältöä, joka sijaitsee toistuvan sisällön jälkeen; elementillä on otsikon semanttinen merkitys; elementti on näkyvissä ja elementti sisältyy saavutettavuuden sisältömalliin.'
      }
    },
    'QW-ACT-R65': {
      name: 'Elementeillä, jotka sisältävät vain visualisoivia  alielementtejä, ei ole kohdistettavia sisältöjä',
      description:
        'Tämä sääntö tarkastaa, että elementit, joiden rooli tekee niiden alielementeistä vain visualisoivia, eivät sisällä kohdistettavia elementtejä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Elementillä ei ole tulostushierarkiassa alielementtejä, jotka olisivat järjestyksessä kohdistettavia.',
        F1: 'Elementillä on tulostushierarkiassa alielementtejä, jotka ovat järjestyksessä kohdistettavia.'
      }
    },
    'QW-ACT-R66': {
      name: 'Valikon osalla on ei-tyhjä saavutettava nimi',
      description:
        'Tämä sääntö tarkastaa, että jokaisella elementillä, jolla on `menuitem`-rooli, on ei-tyhjä saavutettava nimi.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteella on ei-tyhjä saavutettava nimi.',
        F1: 'Kohteella ei ole saavutettavaa nimeä tai se on tyhjä.'
      }
    },
    'QW-ACT-R67': {
      name: 'Tyylimäärityksissä kirjainten välistystä ei ole määritetty `!important`-säännöllä',
      description:
        'Tämä sääntö tarkastaa, että tyylimäärityksissä ei ole estetty kirjainten välityksen muokkaamista `!important`-säännöllä, paitsi jos `letter-spacing`-määreen arvo on vähintään 0,12 kertaa kirjaisimen koko.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Letter-spacing`-ominaisuudella ei ole `!important`-määrettä.',
        P2: '`Letter-spacing`-arvo on vähintään 0,12 kertaa kirjaisimen koko.',
        P3: 'Elementille määräytynyt `letter-spacing`-arvo ei ole sama kuin elementille kirjattu arvo.',
        F1: 'CSS-säännöt estävät `letter-spacing`-arvoa täyttämästä minimivaatimusta.'
      }
    },
    'QW-ACT-R68': {
      name: 'Tyylimäärityksissä rivin korkeutta ei ole määritetty `!important`-säännöllä',
      description:
        'Tämä sääntö tarkastaa, että tyylimäärityksissä ei ole estetty rivin korkeuden muokkaamista `!important`-säännöllä, paitsi jos rivikorkeus on vähintään 1,5 kertaa kirjaisimen koko.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Line-height`-ominaisuudella ei ole `!important`-määrettä.',
        P2: '`Line-height`-arvo on vähintään 1,5 kertaa kirjaisimen koko.',
        P3: 'Elementille määräytynyt `line-height`-arvo ei ole sama kuin elementille kirjattu arvo.',
        F1: 'CSS-säännöt estävät `line-height`-arvoa täyttämästä minimivaatimusta.'
      }
    },
    'QW-ACT-R69': {
      name: 'Tyylimäärityksissä sanojen välistystä ei ole määritetty `!important`-säännöllä',
      description:
        'Tämä sääntö tarkastaa, että tyylimäärityksissä ei ole estetty sanojen välistyksen muokkaamista `!important`-säännöllä, paitsi jos `word-spacing`-arvo on vähintään 0,16 kertaa kirjaisimen koko.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: '`Word-spacing`-ominaisuudella ei ole `!important`-määrettä.',
        P2: '`Word-spacing`-arvo on vähintään 0,16 kertaa kirjaisimen koko.',
        P3: 'Elementille määräytynyt `word-spacing`-arvo ei ole sama kuin elementille kirjattu arvo.',
        F1: 'CSS-säännöt estävät `word-spacing`-arvoa täyttämästä minimivaatimusta.'
      }
    },
    'QW-ACT-R70': {
      name: '`Iframe`, jolla on negatiivinen `tabindex`-attribuutti, ei sisällä interaktiivisia elementtejä',
      description:
        'Tämä sääntö tarkastaa, että `iframe`-elementti, jonka `tabindex`-attribuutilla on negatiivinen arvo, ei sisällä interaktiivisia elementtejä.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sisällytetty konteksti ei sisällä elementtejä, jotka olisivat näkyviä ja  järjestyksessä kohdistettavia.',
        F1: 'Sisällytetty konteksti sisältää elementtejä, jotka ovat näkyviä ja järjestyksessä kohdistettavia.'
      }
    },
    'QW-ACT-R71': {
      name: '`Meta`-elementillä ei ole päivitysviivettä (ei poikkeusta)',
      description:
        'Tämä sääntö tarkastaa, että `meta`-elementtiä ei ole käytetty viivästettyyn uudelleenohjaukseen tai uudelleenlataukseen.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Kohteen uudelleen lataaminen tai uudelleenohjaus tehdään välittömästi.',
        F1: 'Kohde uudelleenladataan {seconds} sekunnin jälkeen.',
        F2: 'Kohde uudelleenohjataan {seconds} sekunnin jälkeen.'
      }
    },
    'QW-ACT-R72': {
      name: 'Ensimmäinen kohdistettava elementti on linkki ei-toistuvaan sisältöön',
      description:
        'Tämä sääntö tarkastaa, että ensimmäinen kohdistettava elementti on linkki ei-toistuvaan sisältöön sivulla.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        W1: 'Tarkista, että ensimmäisellä kohdistettavalla elementillä on saavutettava nimi, jonka antaa ymmärtää, että sen avulla ohitetaan sisältöjä.',
        W2: 'Tarkista, että ensimmäinen kohdistettava elementti hyppää sivun pääsisältöön ja että sen saavutettava nimi antaa niin myös ymmärtää.',
        F1: 'Ensimmäinen kohdistettava elementti ei ole näppäimistöltä käytettävissä.',
        F2: 'Ensimmäinen kohdistettava elementti ei sisälly saavutettavuuden sisältömalliin.',
        F3: 'Ensimmäinen kohdistettava elementti ei ole tyypiltään linkki.',
        F4: 'Ensimmäinen kohdistettava elementti ei hyppää sivun pääsisältöön.',
        F5: 'Sivulla ei ole kohdistettavia elementtejä.'
      }
    },
    'QW-ACT-R73': {
      name: 'Toistuvan sisällön lohko on kutistettava',
      description: 'Tämä sääntö tarkastaa, että toistuvien sisältöjen lohkot ovat kutistettavia.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Sivulla ei ole toistuvia sisältöjä.',
        W1: 'Tarkista jokaisen toistuvan sisällön lohkosta, joka sijaitsee elementissä, jota tulostusjärjestyksessä seuraa vähintään yksi toistuvan sisällön jälkeinen ei-toistuvan sisällön elementti, että seuraavat ehdot täyttyvät: on toiminnallisuus, jolla poistaa kaikkien tämän lohkon osioiden näkyvyys, ja on toiminnallisuus, jolla poistaa nämä osiot saavutettavuuden sisältömallista.'
      }
    },
    'QW-ACT-R74': {
      name: 'Dokumentilla on mekanismi kohdistuksen siirtämiseksi ei-toistuvaan sisältöön',
      description:
        'Tämä sääntö tarkastaa, että on olemassa mekanismi kohdistuksen siirtämiseksi ei-toistuvaan sisältöön sivulla.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Tällä sivulla ei ole toistuvaa sisältöä.',
        W1: 'Sivulta löytyy yksi tai useampi toiminnallisuus kohdistuksen siirtämiseksi. Tarkista, että jotain näistä käytetään ennen toistuvan sisällön lohkoa ja että kohdistus siirtyy kohtaan juuri ennen ei-toistuvan sisällön lohkoa.',
        W2: 'Tarkista, että sivulta löytyy vähintään yksi toiminnallisuus kohdistuksen siirtämiseksi. Tarkista, että jotain näistä käytetään ennen toistuvan sisällön lohkoa ja että kohdistus siirtyy kohtaan juuri ennen ei-toistuvan sisällön lohkoa.'
      }
    },
    'QW-ACT-R75': {
      name: 'Ohita toistuvan sisällön lohkot',
      description:
        'Tämä sääntö tarkastaa, että jokaisella sivulla on mekanismi toistuvan sisällön lohkojen ohittamiseen.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Ehto täyttyi johtuen säännöstä ',
        W1: 'Ehdon täyttymistä ei voida todentaa johtuen säännöstä ',
        F1: 'Ehto ei täyttynyt johtuen säännöstä '
      }
    },
    'QW-ACT-R76': {
      name: 'Teksti täyttää parannetun kontrastin vaatimukset',
      description:
        'Tämä sääntö tarkastaa, että jokaisen tekstissä esiintyvän kirjoitusmerkin suurin mahdollinen kontrasti taustaansa vasten täyttää parannetun kontrastin vaatimukset.',
      results: {
        I1: 'Kohteita ei löytynyt.',
        P1: 'Elementin kontrasti ylittää vähimmäisvaatimukset.',
        P2: 'Elementin merkeillä ei esitetä tekstiä luonnollisella kielellä.',
        P3: 'Elementin kontrasti taustan liukuvärin kanssa ylittää vähimmäisvaatimukset.',
        W1: 'Elementillä on tekstin varjostus, joka vaatii manuaalista tarkistusta.',
        W2: 'Elementin taustalla on kuva.',
        W3: 'Elementillä taustalla on liukuväri, jota emme pysty todentamaan.',
        F1: 'Elementin kontrasti ei täytä vähimmäisvaatimuksia.',
        F2: 'Elementin kontrasti taustan liukuvärin kanssa ei täytä vähimmäisvaatimuksia.'
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
