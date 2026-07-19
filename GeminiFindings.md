# Kompleksowy Program Rozwoju Kompetencji Zespołu AI i Robotyki: Mapa Drogowa Badania Publikacji Naukowych

---

## Wprowadzenie i Identyfikacja Problemu Badawczego

Współczesna sztuczna inteligencja aplikowana w robotyce i systemach ucieleśnionych (embodied AI) przechodzi transformację paradygmatyczną. Klasyczne podejścia inżynieryjne, oparte na sztywnym modelowaniu kinematyki, ręcznie projektowanych cechach percepcyjnych oraz deterministycznym planowaniu ruchu, ustępują miejsca modelom fundacyjnym, zaawansowanym politykom uczenia ze wzmocnieniem (reinforcement learning) oraz architekturom działającym w trybie od końca do końca (end-to-end).

Poniższy raport przedstawia wyczerpujący, merytorycznie uzasadniony program badawczy, zaprojektowany w celu długoterminowej, systematycznej budowy zaawansowanych kompetencji technicznych zespołu inżynieryjnego za pośrednictwem ustrukturyzowanej analizy literatury naukowej.

Celem zaproponowanego programu nie jest rozwiązanie pojedynczego, izolowanego problemu wdrożeniowego, lecz wykształcenie zespołu zdolnego do rozumienia, implementowania, świadomego modyfikowania i krytycznego oceniania najnowocześniejszych metod sztucznej inteligencji. Sukces komercyjnego i badawczego wdrażania zaawansowanych modeli w fizycznym świecie rzadko opiera się na prostym imporcie architektur znanych z przetwarzania języka naturalnego. Systemy robotyczne muszą nieustannie radzić sobie z:

- asymetrią informacji,
- brakiem zróżnicowanych danych treningowych,
- błędami kumulującymi się w czasie (compounding errors),
- absolutnym wymogiem bezpieczeństwa sprzętowego i ludzkiego.

Dlatego niniejszy program przykłada szczególną wagę do metod, które stanowią pomost pomiędzy czystym uczeniem maszynowym a rygorystycznymi wymaganiami robotyki, selekcjonując literaturę o najwyższej wartości kognitywnej i inżynieryjnej.

---

## Docelowy Profil Kompetencyjny Zespołu

Realizacja przedstawionego programu ma na celu wykształcenie specjalistów, którzy nie traktują głębokich sieci neuronowych jako czarnych skrzynek, lecz precyzyjnie rozumieją mechaniki leżące u ich podstaw. Po ukończeniu pełnego cyklu analitycznego, członkowie zespołu osiągną zdolność do rozstrzygania złożonych dylematów architektonicznych. Będą potrafili ocenić, czy w danym problemie manipulacyjnym należy zastosować:

- deterministyczne uczenie naśladujące,
- probabilistyczną politykę dyfuzyjną uodpornioną na wielomodalność ludzkich demonstracji,
- uczenie ze wzmocnieniem z wykorzystaniem wyuczonego modelu świata.

Kolejną kluczową kompetencją będzie głębokie zrozumienie ograniczeń poszczególnych paradygmatów uczenia. Zespół nabędzie zdolność do identyfikacji sytuacji, w których przesunięcie rozkładu danych (distribution shift) pomiędzy środowiskiem treningowym a wdrożeniowym doprowadzi do drastycznego spadku skuteczności, a także nauczy się aplikować techniki przeciwdziałające zjawisku katastrofalnego zapominania w systemach uczących się przez całe życie.

Nabyta wiedza pozwoli na projektowanie rygorystycznych procedur ewaluacyjnych, wykraczających poza standardowe metryki błędu średniokwadratowego, uwzględniających odporność systemu na czynniki zakłócające, szum sensoryczny oraz kontaminację zbiorów testowych. Ostatecznie program ten przygotuje kadrę inżynierską do innowacji na styku dyscyplin, umożliwiając fuzję nowoczesnych, jawnych reprezentacji przestrzennych z wielomodalnymi modelami językowo-wizyjnymi w celu budowy zintegrowanych systemów pamięci semantycznej i operacyjnej dla systemów autonomicznych.

---

## Architektura Programu: Priorytety i Zależności

Zaprojektowany program dzieli się na pięć ściśle powiązanych ze sobą obszarów badawczych. Nie są one odizolowane; wiedza z każdego kolejnego poziomu inkapsuluje pojęcia opanowane wcześniej. Architektura ta gwarantuje płynne przejście od rygorystycznych podstaw matematycznych do współczesnych, wielkoskalowych modeli inżynieryjnych.

| Etap | Obszar Badawczy | Priorytet | Zależności Wstępne | Cel Edukacyjny i Kognitywny |
|------|-----------------|-----------|--------------------|-----------------------------|
| **I** | Reinforcement Learning i Teoria Sterowania | Krytyczny | Optymalizacja matematyczna, rachunek prawdopodobieństwa | Opanowanie procesów decyzyjnych Markowa, algorytmów off-policy/on-policy, bezpiecznego RL z ograniczeniami oraz estymacji wartości. |
| **II** | Modele Świata (World Models) | Bardzo Wysoki | Obszar I, Podstawy konwolucyjnych i rekurencyjnych sieci | Separacja dynamiki środowiska od polityki, planowanie w ukrytej przestrzeni (latent imagination), zwiększanie wydajności próbkowania. |
| **III** | Uczenie Robotów i Modele Fundacyjne (VLAs) | Krytyczny | Obszar I, Obszar II, Architektury NLP (Transformers) | Integracja percepcji, języka i akcji (end-to-end). Zrozumienie polityk generatywnych (dyfuzja, flow matching) i generalizacji cross-embodiment. |
| **IV** | Percepcja, Lokalizacja i Neuronowe Reprezentacje | Wysoki | Algebra liniowa, Systemy wizyjne | Łączenie uczenia głębokiego ze SLAM, przejście od reprezentacji niejawnych (NeRF) do jawnych reprezentacji punktowych i anizotropowych. |
| **V** | Inżynieria Danych, Ewaluacja i Niezawodność | Wysoki | Statystyka, Obszar III | Przeciwdziałanie iluzjom ewaluacyjnym, ocena kontaminacji zbiorów, rygorystyczne projektowanie eksperymentów in-the-wild. |

### Ścieżki dydaktyczne

Wychodząc naprzeciw zróżnicowanym poziomom doświadczenia członków zespołu, materiał można realizować poprzez wyznaczone ścieżki dydaktyczne:

| Ścieżka | Opis |
|---------|------|
| **Fundamentów** | Dla inżynierów oprogramowania adaptujących się do domeny sztucznej inteligencji; skupia się na pracach historycznych i podręcznikowych budujących słownik pojęciowy. |
| **Wdrożeniowa** | Omija ciężkie dowody analityczne z zakresu teorii zbieżności na rzecz głębokiej analizy współczesnych modeli fundacyjnych, ewaluacji sim-to-real oraz technik optymalizacji inference'u. |
| **Pełna Ekspercka** | Dedykowana zaawansowanym pracownikom działów badawczo-rozwojowych; wymaga bezwzględnego przejścia przez cały zaproponowany materiał, ze szczególnym uwzględnieniem publikacji krytykujących obecne paradygmaty. |

---

## Obszar I: Reinforcement Learning – Od Fundamentów po Optymalizację z Ograniczeniami

Uczenie ze wzmocnieniem stanowi teoretyczny rdzeń systemów decyzyjnych. Przyswojenie tego obszaru jest warunkiem *sine qua non* dla jakichkolwiek dalszych prac w ucieleśnionej sztucznej inteligencji. Agent funkcjonujący w świecie fizycznym mierzy się z odroczoną gratyfikacją, problemem eksploracji w wysoce wymiarowych przestrzeniach stanów oraz z trudnością precyzyjnego modelowania funkcji nagrody. Ze względu na koszt pomyłki w środowisku rzeczywistym, szczególny nacisk w tym programie położono na uczenie offline oraz metody bezpieczne (Safe RL).

Analiza tego obszaru rozwija zdolność zespołu do wyboru odpowiednich algorytmów on-policy (np. PPO) charakteryzujących się wysoką stabilnością uczenia, w opozycji do metod off-policy (np. SAC), które maksymalizują wykorzystanie historycznych próbek danych, co w robotyce jest czynnikiem krytycznym. Inżynierowie nauczą się rozstrzygać problemy związane z przeszacowywaniem wartości w uczeniu offline oraz matematycznie gwarantować nienaruszalność ograniczeń bezpieczeństwa podczas eksploracji.

### Wyselekcjonowane Publikacje i Ich Rola w Programie

| Publikacja | Kategoria | Uzasadnienie i Kontekst Badawczy | Zastosowanie w Robotyce |
|------------|-----------|----------------------------------|-------------------------|
| *Reinforcement Learning: An Introduction* (Sutton & Barto) | Fundamentalna | Definiuje aparat matematyczny Procesów Decyzyjnych Markowa, równań Bellmana i metod Monte Carlo. | Absolutna baza pojęciowa do definiowania stanów, akcji i horyzontów czasowych. |
| *Proximal Policy Optimization Algorithms* (Schulman et al.) | Historycznie Ważna | Wprowadza technikę obcinania funkcji celu, rozwiązując problem katastrofalnych zmian polityki. | Stabilne trenowanie robotów kroczących i manipulatorów w symulacji (sim-to-real). |
| *Conservative Q-Learning for Offline Reinforcement Learning* (Kumar et al.) | Współczesna | Rozwiązuje problem błędnej ekstrapolacji dla akcji spoza zbioru danych (OOD) w uczeniu offline. | Wykorzystanie ogromnych, nielabelowanych historycznych logów ze sterowania maszyną. |
| *Implicit Q-Learning* (Kostrikov et al.) | Stan Wiedzy (SOTA) | Zastępuje jawną karę za akcje OOD regresją expectyli, ucząc się na najlepszych ścieżkach w danych. | Niezawodne uczenie polityki w oparciu wyłącznie o suboptymalne demonstracje operatorów. |
| *Constrained Policy Optimization* (Achiam et al.) | Opcjonalna / Specjalistyczna | Formalizuje problem Constrained MDP, gwarantując optymalizację przy zachowaniu twardych limitów kosztu. | Gwarancja, że ramię robota nie przekroczy określonej siły docisku podczas uczenia się chwytu. |
| *The Option-Critic Architecture* (Bacon et al.) | Fundamentalna | Wprowadza pojęcie „opcji" jako makroakcji, ucząc funkcji terminacji i wewnętrznej polityki równocześnie. | Rozwiązywanie problemów długohoryzontowych poprzez tworzenie podzadań bez nadzoru człowieka. |

### Analiza merytoryczna

Nauka w tym obszarze powinna rozpocząć się od zrozumienia klasycznych podejść, a następnie szybko przejść do zagadnień determinujących sukces w fizycznym świecie.

**Conservative Q-Learning (CQL)** — praca Kumara i współpracowników adresuje fundamentalną słabość klasycznego RL. W tradycyjnym ujęciu agenci optymistycznie oceniają nieznane stany, co w scenariuszach offline skutkuje tragicznymi w skutkach błędami ekstrapolacji. Model wybiera akcje, których nigdy nie widział, ponieważ sieć neuronowa błędnie przypisuje im wysoką wartość. CQL rozwiązuje to poprzez wprowadzenie modyfikacji do równania Bellmana, zmuszając architekturę do celowego zaniżania wartości akcji znajdujących się poza rozkładem treningowym.

**Implicit Q-Learning (IQL)** — rozwinięcie i udoskonalenie tego nurtu. Kostrikov wykazał, że zmuszanie sieci do oceny nieznanych akcji, nawet po to by je ukarać, bywa suboptymalne. IQL całkowicie unika kwerend do akcji OOD poprzez implementację asymetrycznej regresji kwantyli (expectile regression). System wyciąga z danych to, co najlepsze, traktując suboptymalne demonstracje w zbiorze jako bazę do osiągnięcia nadludzkiej precyzji, co z punktu widzenia praktyki inżynierskiej w robotyce ułatwia strojenie hiperparametrów.

**Constrained Policy Optimization (CPO)** — kwestia rygorystycznego bezpieczeństwa eksploracji. Autorzy definiują środowisko jako Constrained Markov Decision Process (CMDP), w którym agent maksymalizuje funkcję nagrody, ale jednocześnie musi utrzymać oczekiwaną wartość zdefiniowanych „kosztów" poniżej ścisłego progu. Wykorzystując przybliżenia drugiego rzędu dla ograniczeń na dywergencję Kullbacka-Leiblera (rozszerzając tym samym logikę znaną z algorytmu TRPO), CPO pozwala na bezpieczne aktualizacje w przestrzeni polityk.

**Option-Critic Architecture** — ostatnim kluczowym aspektem tego bloku jest radzenie sobie z długimi horyzontami czasowymi poprzez temporalną abstrakcję. Architektura ta pozwala modelowi na generowanie wewnętrznych struktur („opcji"), przypominających podprogramy z własną polityką działania i elastyczną funkcją terminacji, co naturalnie redukuje złożoność przeszukiwania przestrzeni stanów podczas nawigacji czy skomplikowanej manipulacji.

> **Otwarty problem:** Skalowalność metod bezpiecznego RL w środowiskach o wysokiej stochastyczności oraz trudność w formułowaniu funkcji kosztu dla CPO, które nie prowadziłyby do całkowitego „zamrożenia" eksploracji przez agenta.

---

## Obszar II: Modele Świata (World Models) i Planowanie w Wyobraźni

Paradygmat oparty na modelach świata wprowadza fundamentalną zmianę perspektywy w stosunku do model-free RL. Zamiast uczyć się bezpośredniego, niejawnego mapowania pomiędzy aktualnym stanem a optymalną akcją, system uczy się w pierwszej kolejności modelu dynamiki otaczającego środowiska. Dysponując takim modelem, agent może przewidywać ewolucję środowiska i „planować w wyobraźni", co drastycznie zwiększa oszczędność próbek (sample efficiency) i pozwala uniknąć niszczycielskich kolizji w świecie fizycznym.

Analiza tego obszaru zbuduje w zespole zrozumienie faktu, iż w fizycznym ucieleśnieniu przewidywanie dokładnych, fotorealistycznych pikseli kolejnej klatki wizyjnej jest często bezproduktywną stratą parametrów modelu. Zrozumienie, w jaki sposób przejść od rekonstrukcji generatywnej do predykcji ukrytej reprezentacji (latent space) jest kluczowe dla współczesnej autonomii. Pytania, które inżynierowie będą umieli rozstrzygać, obejmują:

- dobór strategii eksploracji napędzanej niepewnością modelu dynamiki,
- ocenę wpływu kumulujących się błędów halucynacji (model exploitation) na długohoryzontowe planowanie.

### Wyselekcjonowane Publikacje i Ich Rola w Programie

| Publikacja | Kategoria | Uzasadnienie i Kontekst Badawczy | Zastosowanie w Robotyce |
|------------|-----------|----------------------------------|-------------------------|
| *World Models* (Ha & Schmidhuber) | Historycznie Ważna | Kładzie podwaliny pod separację modelu wzrokowego (VAE) oraz rekurencyjnego modelu dynamiki przewidującego przyszłość. | Zmniejszenie wymagań obliczeniowych poprzez naukę niskowymiarowych wektorów stanu zamiast analizy pikseli w czasie sterowania. |
| *Mastering Diverse Domains through World Models* (DreamerV3) | Fundamentalna / SOTA | Pokazuje, jak jedna zunifikowana architektura (RSSM) z dyskretnymi autoenkoderami osiąga stan wiedzy bez dostrajania hiperparametrów per zadanie. | Wirtualne trenowanie polityk sterowania na wewnętrznym symulatorze stworzonym z zebranych danych czujnikowych. |
| *A Path Towards Autonomous Machine Intelligence* (LeCun, prace o V-JEPA) | Opcjonalna / Przyszłościowa | Krytykuje przewidywanie na poziomie pikseli na rzecz Joint-Embedding Predictive Architecture (JEPA), uczącej abstrakcyjnych relacji. | Filtrowanie nieistotnych fizycznie dystraktorów (np. cieni) na korzyść przewidywania faktycznych właściwości kinematycznych środowiska. |

### Analiza merytoryczna

**DreamerV3** — przełom w stosowaniu modeli świata do złożonych zadań. Publikacja ta dowodzi, że integracja modelu świata zbudowanego za pomocą Recurrent State Space Model (RSSM) z algorytmem Actor-Critic na przestrzeniach ukrytych pozwala na generalizację pośród drastycznie różnych środowisk. RSSM izoluje deterministyczne zależności sekwencyjne od stochastycznych zmian stanu, a zastosowanie dyskretnych reprezentacji zapobiega zapadaniu się modelu. Inżynierowie muszą zrozumieć, że Dreamer propaguje gradienty wartości oczekiwanej wstecz przez zamodelowane w wyobraźni trajektorie, optymalizując zachowanie agenta bez wielokrotnego odpytywania bazowego symulatora czy prawdziwego robota.

**JEPA (Joint-Embedding Predictive Architecture)** — dla zrozumienia otwartych problemów w tej dziedzinie niezbędna jest analiza filozofii stojącej za architekturami typu JEPA, promującymi odejście od modeli ściśle generatywnych. Podczas gdy modele dyfuzyjne wideo zyskują na popularności, w sterowaniu w czasie rzeczywistym rekonstrukcja szumu tła jest marnotrawstwem. Przewidywanie relacji wewnątrz przestrzeni osadzeń (embeddings) kieruje strumień badań w stronę modeli, które „rozumieją" abstrakcyjne zasady działania fizyki środowiska.

> **Otwarty problem:** Długotrwała pamięć oraz fakt, że niedoskonałości wyuczonego symulatora są natychmiast wychwytywane i „wykorzystywane" (exploited) przez politykę optymalizacyjną, co prowadzi do drastycznych pomyłek na prawdziwym sprzęcie.

---

## Obszar III: Uczenie Robotów (Robot Learning) i Modele Fundacyjne (VLAs)

Sama teoria RL i planowania w modelach świata jest dzisiaj niewystarczająca; nowa epoka ucieleśnionej sztucznej inteligencji opiera się na bezpośrednim transferze wiedzy semantycznej zgromadzonej w Internecie (poprzez duże modele językowe i wizyjne) na trajektorie ruchu. Modele Vision-Language-Action (VLA) stały się centralnym punktem badawczym ze względu na ich obietnicę „rozumienia" złożonych, niestandardowych instrukcji w otwartym świecie.

Dogłębne przestudiowanie tego obszaru rozwinie u zespołu inżynieryjnego wiedzę pozwalającą na łączenie bogatej semantyki („co to jest kubek i dlaczego woda się wylewa") z ultra-precyzyjnym sterowaniem ciągłym w pętli zamkniętej („jak ułożyć stawy manipulatora o 6 stopniach swobody"). Analiza tych prac nauczy rozstrzygania dylematów dotyczących tokenizacji ciągłej przestrzeni akcji oraz implementacji nowatorskich modeli dyfuzyjnych tam, gdzie standardowe klonowanie behawioralne oparte na błędzie średniokwadratowym zawodzi.

### Wyselekcjonowane Publikacje i Ich Rola w Programie

| Publikacja | Kategoria | Uzasadnienie i Kontekst Badawczy | Zastosowanie w Robotyce |
|------------|-----------|----------------------------------|-------------------------|
| *Do As I Can, Not As I Say: Grounding Language in Robotic Affordances* (SayCan) | Historycznie Ważna | Wprowadza ugruntowanie logiczne; LLM podaje prawdopodobieństwo sensu akcji, a system RL ocenia fizyczną możliwość jej wykonania. | Podejmowanie wysokopoziomowych decyzji zgodnych z ograniczeniami kinematycznymi maszyny. |
| *Diffusion Policy: Visuomotor Policy Learning via Action Diffusion* (Chi et al.) | SOTA / Fundamentalna | Modele dyfuzyjne rozwiązują problem uśredniania trajektorii przy wielomodalnych ludzkich demonstracjach, operując na ciągłych akcjach. | Niezawodna realizacja zadań kontaktowych (np. wkładanie klucza do zamka) i radzenie sobie z zakłóceniami w czasie rzeczywistym. |
| *Open X-Embodiment: Robotic Learning Datasets and RT-X Models* | Fundamentalna dla skalowania | Pokazuje pozytywny transfer wiedzy po połączeniu danych z kilkudziesięciu różnych ramion robotycznych w jednym modelu. | Budowanie robotów generalistów niewymagających uczenia od zera dla nowego typu chwytaka. |
| *OpenVLA: An Open-Source Vision-Language-Action Model* (Kim et al.) | Współczesna | Praktyczne zastosowanie parameter-efficient fine-tuning (LoRA) na gigantycznym (7B parametrów) modelu VLA. | Ekonomiczne dostosowywanie modeli fundacyjnych do lokalnych środowisk przy niskim zużyciu VRAM. |
| *π0 (Pi-Zero): A Vision-Language-Action Flow Model for General Robot Control* | SOTA | Separuje gigantyczny model językowy od małego „eksperta akcji" wykorzystującego Flow Matching dla wysokiej częstotliwości sterowania. | Aplikacje wymagające sterowania >50 Hz bez opóźnień charakterystycznych dla auteregresyjnych LLMów. |
| *RoboMamba: Multimodal State Space Model...* (Liu et al.) | Opcjonalna / Specjalistyczna | Zastosowanie modeli przestrzeni stanów (SSM) pozwala na liniową złożoność obliczeniową zamiast kwadratowej (jak w Transformerach). | Rozwiązywanie problemów planowania w niezwykle długich horyzontach czasowych. |

### Analiza merytoryczna

**SayCan** — historyczny fundament ugruntowania modeli językowych w fizyczności. Udowodniła ona, że wyabstrahowana wiedza semantyczna LLM-a pozbawionego ucieleśnienia jest bezużyteczna, jeśli nie koresponduje z prawami fizyki. SayCan rozwiązuje ten problem poprzez punkt przecięcia: mnoży prawdopodobieństwo tego, że dana akcja jest poprawna językowo dla osiągnięcia celu, przez prawdopodobieństwo wynikające z wyuczonej funkcji „affordancji" (często zrealizowanej poprzez wartość z offline RL), określającej, czy sprzęt jest fizycznie w stanie wykonać dany manewr z obecnego ułożenia. Uczy to inżynierów projektowania modułowych systemów łączących wnioskowanie poznawcze na wysokim poziomie ze ścisłą mechaniką niskiego poziomu.

**Diffusion Policy** — kluczowy problem w klasycznym klonowaniu behawioralnym to „uśrednianie". Kiedy dwóch ludzkich operatorów omija filar – jeden z lewej, drugi z prawej – model minimalizujący błąd średniokwadratowy wyprowadzi uśrednioną trajektorię, uderzając centralnie w przeszkodę. Publikacja Diffusion Policy elegancko radzi sobie z wysoce wielomodalnymi dystrybucjami z ludzkich demonstracji. Zamiast deterministycznego wyjścia, model polityki dyfuzyjnej przeprowadza wieloetapowy proces odszumiania oparty na dynamice Langevina w celu oszacowania gradientu funkcji gęstości prawdopodobieństwa akcji. System oparty na tej publikacji naturalnie skupia się na precyzyjnych trybach wykonania zadanego celu z dużą dozą stabilności.

**Open X-Embodiment i RT-X** — prawdziwy przewrót w ujednolicaniu robotyki. Przez lata każda platforma sprzętowa wymagała treningu dedykowanej polityki. Współpraca wielu laboratoriów dowiodła, że duże modele uogólniają się i wykorzystują wiedzę z różnych inkarnacji sprzętowych (cross-embodiment). Trening modelu RT-X poprawiał wydajność operacyjną poszczególnych ramion dzięki doświadczeniom zdobytym przez maszyny o całkowicie innych strukturach kinematycznych.

**OpenVLA** — przejaw demokratyzacji tego zjawiska; łączy wizyjne ekstrakty z DINOv2 oraz SigLIP ze strukturą językową LLaMa 2 w wariancie otwartego oprogramowania, umożliwiając stosowanie oszczędnych obliczeniowo metod strojenia (LoRA) przez lokalne zespoły bez superkomputerów.

**π0 (Pi-Zero)** — dalsze przesunięcie granicy stanu wiedzy, opracowane przez Physical Intelligence. Podczas gdy klasyczne VLA dyskretyzują ciągłe przestrzenie motoryczne do przestrzeni językowej tokenów, co bywa procesem stratnym, π0 wykorzystuje wyrafinowany podział ról. Ogromny rdzeń VLM (oparty na PaliGemma) procesuje wizję i semantykę, podczas gdy dedykowany mały ekspert przewiduje precyzyjne ścieżki ciągłe z wykorzystaniem matematyki Flow Matching (optymalnego transportu). Ten rozdział gwarantuje niespotykaną prędkość (do 50 Hz operacji na robocie), bez blokowania się w autoregresywnym wąskim gardle klasycznego LLM-a.

**RoboMamba** — by uporać się z ogromną pożernością pamięci i kwadratową złożonością Transformerów w ogóle, program powinien obejmować również przegląd podejść typu State-Space Models wniesionych do robotyki w publikacjach takich jak RoboMamba, które obiecują realizację polityk z niezwykle rozbudowaną pamięcią horyzontalną przy jednoczesnym zachowaniu liniowej zależności czasu obliczeń.

> **Otwarty problem:** Trudność przenoszenia wysokopoziomowego rozumienia geometrii przestrzennej do tak potężnych modeli.

---

## Obszar IV: Percepcja, Lokalizacja i Neuronowe Reprezentacje Przestrzeni

Autonomia mobilnych manipulatorów uzależniona jest od niezawodnego postrzegania środowiska 3D. Chociaż algorytmy detekcji bounding-boxów (np. YOLO) i wizyjnego SLAMu przez lata dominowały w branży, obecny rozwój ukierunkowany jest na systemy łączące fotorealistyczną reprezentację głębi i przestrzeni semantycznej, zdolną do różniczkowania i gradientowej optymalizacji w pętli end-to-end.

Zespoły badające ten obszar nauczą się jak integrować czujniki proprioceptywne z wielokamerową percepcją oraz zrozumieją wady klasycznych map gęstości w zderzeniu z nowoczesnymi, ciągłymi reprezentacjami neuronowymi (implicit scene representations). Pytaniem o najwyższym znaczeniu włożonym w ten blok jest to, w jaki sposób przejść od ciężkich wizualnie symulacji na wbudowane platformy brzegowe robotów bez utraty zdolności wnioskowania o kolizjach.

### Wyselekcjonowane Publikacje i Ich Rola w Programie

| Publikacja | Kategoria | Uzasadnienie i Kontekst Badawczy | Zastosowanie w Robotyce |
|------------|-----------|----------------------------------|-------------------------|
| *3D Gaussian Splatting for Real-Time Radiance Field Rendering* (Kerbl et al.) | Fundamentalna / SOTA | Zamiana powolnych wielowarstwowych perceptronów na jawną reprezentację chmury trójwymiarowych, anizotropowych obiektów rozkładu normalnego. | Ekstremalnie szybki Neural SLAM, w którym mapa przestrzenna jest renderowana i aktualizowana na bieżąco, z zachowaniem własności zderzeniowych (kolizji) prymitywów. |

### Analiza merytoryczna

**3D Gaussian Splatting (3DGS)** — śledzenie ewolucji reprezentacji sceny kończy się obecnie na gigantycznym wpływie, jaki ta technika wywarła na świat robotyki przestrzennej.

Podczas gdy architektury NeRF (Neural Radiance Fields) zrewolucjonizowały syntetyzowanie nowych punktów widzenia dzięki wykorzystaniu ciągłych funkcji ukrytych w wagach sieci neuronowej, były one tragicznie powolne ze względu na ogromną liczbę punktów próbkowanych wzdłuż wirtualnego promienia. W zastosowaniach robotycznych opóźnienie percepcyjne dyskwalifikuje algorytm.

3DGS stanowi przełom poprzez powrót do reprezentacji jawnych (explicit) – modelowania świata jako wielomilionowej chmury zorientowanych 3D Gaussów, posiadających własne macierze kowariancji, wektory położeń i charakterystyki sferyczne (Spherical Harmonics) na potrzeby renderowania koloru. Zespół musi zrozumieć, że dzięki rastryzacji kafelkowej 3DGS pozwala na fotorealistyczne odtwarzanie środowiska z prędkością kilkudziesięciu czy wręcz ponad stu klatek na sekundę. Posiadanie jawnych kowariancji oznacza, że można w matematycznie bezpośredni sposób włączać fizyczne detekcje kolizji pomiędzy ramieniem robota a geometryczną reprezentacją mapy – co było niemożliwe bez czasochłonnego odpytywania funkcji brzegowych w systemach NeRF.

> **Kontrowersja:** Ogromne zużycie pamięci VRAM podczas przechowywania modeli opartych na milionach gausowskich rozkładów.

---

## Obszar V: Inżynieria Danych, Ewaluacja i Niezawodność (Data-Centric AI)

Dziedzina uczenia głębokiego cierpi na silne zaburzenie uwagi, w którym inżynierowie fetyszyzują architektury i krzywe uczenia, ignorując wierność, różnorodność i dystrybucję danych stanowiących pożywkę dla modeli. W zastosowaniach robotycznych ten brak uwagi prowadzi do iluzorycznie wysokich osiągnięć ewaluacyjnych, które rozpadają się w pył na skutek trywialnego przesunięcia w środowisku (zmiana tła, delikatne przesunięcie obiektu). Przeanalizowanie poniższych zagadnień z zakresu Data-Centric AI diametralnie odmieni warsztat implementacyjny zespołu wdrożeniowego.

Analizując te prace, inżynierowie zdobędą kompetencje w:

- projektowaniu skomplikowanych zestawów danych dla robotów in-the-wild,
- przyswojeniu metodologii transferu zdobytych już w czasie istnienia agenta umiejętności na nowe obiekty bez zjawiska zapominania starych wzorców,
- opanowaniu detekcji groźnych przecieków informacji między etapem przed-treningowym a ostatecznym testem, które niszczą miarodajność eksperymentów.

Oczekuje się, że dyskusje te posłużą wypracowaniu ustrukturyzowanych metodyk pomiarowych pozbawionych tzw. „benchmark contamination".

### Wyselekcjonowane Publikacje i Ich Rola w Programie

| Publikacja | Kategoria | Uzasadnienie i Kontekst Badawczy | Zastosowanie w Robotyce |
|------------|-----------|----------------------------------|-------------------------|
| *DROID: A Large-Scale In-The-Wild Robot Manipulation Dataset* (Khazatsky et al.) | Baza dla inżynierii danych | Największy zbiór zróżnicowanych danych z teleoperacji wykonywanych w 564 rzeczywistych scenach ze zmieniającym się oświetleniem. | Dowód na to, że odporność polityki manipulacyjnej wynika z radykalnej wariancji środowiska w zbiorze demonstracyjnym. |
| *CALVIN: A Benchmark for Language-Conditioned Policy Learning...* (Mees et al.) | Współczesna metoda ewaluacyjna | Formalizuje sprawdziany złożone z wieloetapowych instrukcji wymuszających zachowanie długotrwałego kontekstu. | Ocenianie czy model ulega degradacji w miarę czasu i czy radzi sobie z nieszablonowymi sekwencjami poleceń. |
| *LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning* (Liu et al.) | Badanie Transferu i Zapominania | Ujawnia mechanikę utraty nabytej wiedzy w procesie ciągłego „do-uczania" (continual learning) systemów decyzyjnych. | Zarządzanie flotą robotów w fabryce, tak aby po nauczeniu operacji montażowych silnika nie zapomniały operacji lakierniczych. |
| *LLM Benchmark Datasets Should Be Contamination-Resistant / Prace o mierzeniu przecieków (KDS)* | Opcjonalna specjalistyczna | Analizuje metody detekcji przypadków, w których zestaw do ewaluacji był de facto włączony w zbiór treningowy fundamentów modeli. | Ochrona przed fałszywym poczuciem sukcesu podczas doboru modeli VLM do wspierania logiki maszyny. |

### Analiza merytoryczna

**DROID** — zjawisko kruchości modeli poza rozkładem treningowym. Podczas gdy wcześniejsze potężne datasety opierały się na stałych układach laboratoriów, zespół naukowy zdecydował się wysłać teleoperatorów do ponad 50 budynków na świecie i rejestrować codzienne manipulacje w kuchniach i korytarzach, wprowadzając radykalne zmiany widoków kamer i ułożenia przedmiotów z użyciem sprzętu gogli wirtualnej rzeczywistości dla akwizycji 6-DoF. Praca wyraźnie konkluduje: to nie nowa architektura, lecz drastyczne poszerzenie bazy zakłóceń tła wizualnego (distractors) stanowi o zdolności modelu do niezałamującego się działania na nowym stanowisku testowym. Uczy to inżynierów ogromnej dyscypliny podczas archiwizacji i kategoryzacji danych u klienta, kładąc nacisk na tzw. „domain randomization" obecną u podstaw gromadzenia zbiorów.

**CALVIN i LIBERO** — ważność prawidłowej konstrukcji procesu weryfikacji.

- **CALVIN** demaskuje polityki, które potrafią wyciągnąć blok z szuflady, ale kompletnie gubią sens sekwencyjny i orientację przestrzenną, gdy polecenie jest złożone i połączone z kolejnymi fazami (long-horizon).
- **LIBERO** nakazuje zespołowi spojrzenie na uczenie robotów przez pryzmat cyklu życia produktu (Lifelong learning). Praca rozdziela transfer na kompetencje deklaratywne („co to jest chleb") i proceduralne („jak manewrować rzemieniem przez otoczenie"). Częstym błędem inżynierskim jest tzw. naiwne do-uczanie modeli z nowym zbiorem zadań na bazie pre-trenowanych fundamentów wizyjno-językowych, co paradoksalnie może całkowicie zniszczyć proceduralne mechanizmy transferu agenta nabyte we wcześniejszych procesach wdrożeniowych (katastrofalne zapominanie uwypuklone ujemnym „Backward Transfer").

**Kernel Divergence Score (KDS)** — finalne wyzwanie to zjawisko ewaluacyjnej ułudy wywołanej wyciekiem danych. Współcześnie systemy sztucznej inteligencji powszechnie buduje się, sięgając po ogromne modele z otwartym dostępem i adaptując je przy użyciu ułamka wiedzy (np. w systemach typu OpenVLA). Jeżeli korpus danych ewaluacyjnych pokrywał się w stopniu znacznym ze ściągniętym na początku terabajtowym korpusem tekstów z internetu i zdjęć środowiska, system de facto odpowiada posiłkując się trywialną pamięcią absolutną, a nie zdolnością do zgeneralizowanego rozwiązywania zagadek fizycznych w ucieleśnieniu. Stosując analizę wariancji i dywergencji wektorów cech osadzeń (embeddings kernel similarity) po krótkim procesie dopasowania testowego, inżynier weryfikuje czystość zestawów porównawczych robota, weryfikując, czy wskaźniki uodparniają nas rzeczywiście na niekontrolowane zjawiska w czasie docelowych wdrożeń, czy tylko pompują statystyki zespołu.

---

## Organizacja Cyklu Dydaktycznego i Ślepe Uliczki (Wnioski Architektoniczne)

Aby ten zestaw literatury przeniósł się na skuteczną akumulację „twardych" umiejętności w firmie, rekomendowane jest zorganizowanie ustrukturyzowanych spotkań przyjmujących model pogłębionych grup roboczych.

### Propozycja Wdrażania (Ścieżka dla Zespołu Ekspertów)

Zaleca się organizację **„Miesięcznych Tematów Przewodnich"**:

1. **Kamień milowy I — Fundamenty RL**
   - Na początku inżynierowie powinni przebrnąć przez formalny paradygmat RL oparty na równaniach Bellmana, co buduje rygor matematyczny.
   - Równolegle z lekturą prac takich jak CQL czy PPO, inżynierowie powinni wdrażać te algorytmy w lekkich środowiskach symulacyjnych (np. MuJoCo, PyBullet), aby w pełni uchwycić znaczenie terminów takich jak *overestimation bias*.

2. **Kamień milowy II — Polityki generatywne i integracja**
   - Polityki generatywne (Diffusion Policy oraz Flow Matching z π0), wymuszając na zespole zestawienie ich przewagi w radzeniu sobie ze stochastycznym szumem demonstracji ludzkich w porównaniu do klasycznego błędu MSE.
   - Płynne skierowanie w stronę wyzwań integracyjnych polegających na wdrażaniu reprezentacji jawnych za pomocą narzędzi do wielowidokowej rekonstrukcji 3D (Gaussian Splatting) i problemu zapominania w ciągłym uczeniu się.

### Kluczowe Przestrogi i Ślepe Uliczki

Wdrażanie zaawansowanej AI fizycznej wymaga jawnego konfrontowania się ze zjawiskami, na które popularne tutoriale kładą zasłonę milczenia:

#### 1. Złudzenie pełnego RL „Od Zera" w rzeczywistości

Choć nagłówki publikacji opisują spektakularne sukcesy samodzielnego opanowania złożonych ruchów asynchronicznych przez wirtualnych agentów, wdrażanie naiwnych, losowo inicjalizowanych algorytmów on-line w celu kontrolowania twardego środowiska doprowadzi do niszczycielskich wibracji i zniszczenia infrastruktury. Inżynierowie muszą zrozumieć nierozerwalność koncepcji trenowania w bezpiecznych warunkach symulatorów (sim-to-real gap) oraz konieczność posiłkowania się potężnymi zbiorami danych w trybie Offline RL (CQL, IQL) lub bezpiecznych ograniczeń matematycznych CPO, zamiast zmuszania maszyn do brutalnej, fizycznej nauki metodą prób i błędów w czasie wdrożenia.

#### 2. Kult Pustego Skalowania i Złudzenie Foundation Models

Nowoczesne iteracje potężnych sieci takich jak RT-X lub LLaMa obiecują uniwersalny interfejs, ale praca w warunkach OOD demaskuje ich kruchość na minimalne dystraktory w warstwie wizualnej. Naiwna wiara w to, że miliardy pre-trenowanych parametrów na naturalnych tekstach samodzielnie wyłonią skomplikowaną procedurę układania kabli we wtyczce to błąd implementacyjny. Skuteczność wielkich modeli w przestrzeni kinematycznej pozostaje mrzonką bez weryfikacji i integracji modeli fizycznego rygoru – wypracowanej na zajęciach dedykowanych inżynierii danych w oparciu o prace nad DROID. Oczekuje się bezwarunkowej weryfikacji agentów przy pomocy formalnych metryk (jak w benchmarku CALVIN), udowadniając ich umiejętność sekwencjonowania wyabstrahowanych zadań z wykorzystaniem mechanizmów w stylu SayCan.

#### 3. Marginalizacja Metod State-Space (jak Mamba) i Utrzymanie Przestarzałych Pętli

Zespół musi odrzucić popularne w NLP przekonanie, że sieci Transformer są niepodważalnie dominującym ostatecznym etapem ewolucji uczenia maszynowego w robotyce. Z uwagi na restrykcyjnie wysoką częstotliwość pracy pętli sterowania zamykających sprzężenie fizyczne (często rzędu 50–500 Hz), kwadratowa złożoność czasowa mechanizmu Attention tworzy dramatyczny zator dla wydajności operacyjnej ucieleśnionego agenta. Prace nad architekturami sekwencyjnymi typu SSM i RoboMamba udowadniają przewagę struktur liniowych przy wnioskowaniu z wyjątkowo długich horyzontów obserwacyjnych czujników i układów kamer napływających strumieniowo przez całe życie fizycznej maszyny. Program wymaga krytycznego kwestionowania utartych schematów projektowych budowanych wokół wielkich modeli autoregresyjnych, które dla sterowania w ułamku sekund okazują się nieekonomiczne i ślepe.
