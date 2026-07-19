## Zadanie: zaprojektowanie programu paper research rozwijającego kompetencje zespołu z obszaru AI i robotyki

### 1. Cel główny

Należy przygotować kompleksową, merytorycznie uzasadnioną mapę tematów i publikacji naukowych, które zespół techniczny powinien systematycznie analizować w ramach cyklicznych spotkań typu paper research lub paper club.

Celem nie jest rozwiązanie jednego konkretnego problemu projektowego ani dobranie publikacji wyłącznie pod aktualnie rozwijany system. Głównym celem jest długoterminowa budowa kompetencji zespołu wdrożeniowego w zakresie:

* współczesnej sztucznej inteligencji,
* uczenia maszynowego,
* reinforcement learningu,
* robotyki,
* systemów percepcyjnych,
* modeli świata,
* pracy z danymi,
* oraz metod, które obecnie lub potencjalnie w przyszłości mogą znaleźć zastosowanie w robotyce.

Po przejściu przez zaproponowany materiał członkowie zespołu powinni rozumieć nie tylko sposób używania istniejących modeli i bibliotek, ale także podstawy działania metod, decyzje architektoniczne, założenia matematyczne, ograniczenia, ewolucję poszczególnych podejść oraz możliwe kierunki ich dalszego rozwoju.

---

### 2. Charakter problemu

Problem polega na zaprojektowaniu programu rozwoju wiedzy, a nie planu realizacji konkretnego projektu.

Nie należy podporządkowywać całej listy publikacji jednemu zastosowaniu, jednemu produktowi, jednej architekturze ani aktualnym potrzebom implementacyjnym zespołu.

Program powinien budować szerokie, ale spójne kompetencje w obszarach istotnych dla AI stosowanej w robotyce. Tematy powinny być dobierane na podstawie ich:

1. fundamentalnego znaczenia dla dziedziny,
2. wpływu historycznego,
3. aktualnej istotności badawczej,
4. praktycznego zastosowania,
5. potencjalnego przyszłego zastosowania w robotyce,
6. wartości edukacyjnej dla zespołu inżynieryjnego,
7. zdolności do wyjaśniania współczesnych metod i trendów.

---

### 3. Oczekiwany rezultat

Należy przygotować rozbudowaną listę potencjalnych:

* obszarów badawczych,
* tematów spotkań,
* pytań badawczych,
* problemów technicznych,
* kluczowych koncepcji,
* oraz konkretnych publikacji naukowych.

Lista nie musi być ograniczona do określonej liczby tygodni ani spotkań. Powinna stanowić bazę, z której można później zbudować wielomiesięczny lub wieloletni program paper clubu.

Dla każdego obszaru należy wskazać:

1. **Dlaczego temat jest istotny** dla AI, robotyki lub przyszłych systemów autonomicznych.
2. **Jakie kompetencje rozwija** analiza danego obszaru.
3. **Jakie pytania zespół powinien umieć po nim rozstrzygać.**
4. **Które publikacje są fundamentalne historycznie.**
5. **Które publikacje reprezentują współczesny stan wiedzy lub aktualne kierunki rozwoju.**
6. **W jakiej kolejności warto czytać publikacje.**
7. **Jak poszczególne tematy łączą się z innymi obszarami programu.**
8. **Jakie zastosowania w robotyce są bezpośrednie, pośrednie lub dopiero potencjalne.**
9. **Jakie są ograniczenia, otwarte problemy i kontrowersje w danym obszarze.**

Nie wystarczy wymienić nazw publikacji. Konieczna jest selekcja, hierarchizacja i uzasadnienie wyboru.

---

### 4. Główne obszary, które powinny zostać uwzględnione

#### Reinforcement learning

Reinforcement learning powinien mieć wyraźnie większą reprezentację niż w standardowym, ogólnym programie machine learningu.

Program powinien uwzględniać między innymi:

* podstawy formalne reinforcement learningu,
* Markov Decision Processes,
* value-based learning,
* policy gradients,
* actor–critic,
* PPO i inne dominujące algorytmy policy optimization,
* off-policy learning,
* model-free i model-based RL,
* exploration,
* credit assignment,
* offline RL,
* imitation learning,
* inverse reinforcement learning,
* hierarchical RL,
* multi-agent RL,
* safe RL,
* constrained RL,
* reinforcement learning z informacją wizualną,
* RL dla sterowania robotami,
* sim-to-real,
* transfer learning w RL,
* domain randomization,
* reward design,
* reward learning,
* RL wykorzystujący modele świata,
* połączenie RL z modelami generatywnymi, transformerami i foundation models.

Należy objąć zarówno publikacje historyczne i fundamentalne, jak i współczesne metody stosowane w robotyce.

#### Modele świata

Program powinien zawierać osobny, istotny blok dotyczący world models.

Powinien obejmować:

* uczenie modeli dynamiki,
* latent dynamics,
* predictive representations,
* planning w przestrzeni latentnej,
* model-based reinforcement learning,
* uczenie reprezentacji umożliwiających planowanie,
* modele przewidujące przyszłe obserwacje i stany,
* połączenie modeli świata z kontrolą robotów,
* ograniczenia wynikające z błędów modelu,
* uncertainty i model exploitation,
* skalowanie modeli świata,
* współczesne generatywne i multimodalne modele świata.

#### Percepcja robotyczna i computer vision

Należy uwzględnić metody percepcyjne, które są przydatne zarówno bezpośrednio w robotyce, jak i podczas przygotowania, opisywania, filtrowania lub automatycznego etykietowania danych.

Zakres powinien obejmować między innymi:

* klasyfikację obrazów,
* detekcję obiektów,
* segmentację semantyczną,
* segmentację instancji,
* segmentację panoptyczną,
* śledzenie obiektów,
* estymację pozy,
* depth estimation,
* optical flow,
* reprezentacje 3D,
* point clouds,
* visual representation learning,
* self-supervised learning dla obrazów,
* vision transformers,
* modele multimodalne,
* vision-language models,
* vision-language-action models,
* open-vocabulary perception,
* grounding,
* używanie modeli percepcyjnych do automatycznego przygotowania i kategoryzacji danych.

#### Lokalizacja, mapowanie i reprezentacja przestrzeni

Należy uwzględnić wybrane publikacje dotyczące:

* SLAM,
* visual SLAM,
* visual-inertial odometry,
* localization,
* mapping,
* neural mapping,
* semantic mapping,
* occupancy representations,
* neural radiance fields,
* Gaussian splatting,
* implicit scene representations,
* spatial memory,
* reprezentacji scen wykorzystywanych przez agentów i roboty.

Nie chodzi o stworzenie pełnego kursu klasycznej robotyki mobilnej. Należy wybrać publikacje, które mają dużą wartość poznawczą lub łączą klasyczne metody robotyczne z nowoczesnym uczeniem maszynowym.

#### Robot learning

Należy objąć obszary bezpośrednio związane z uczeniem robotów, takie jak:

* learning from demonstration,
* behavioral cloning,
* imitation learning,
* diffusion policies,
* visuomotor policies,
* manipulation,
* locomotion,
* grasping,
* task and motion planning,
* language-conditioned control,
* generalist robot policies,
* robot foundation models,
* embodied AI,
* embodied reasoning,
* uczenie z dużych zbiorów danych robotycznych,
* cross-embodiment learning,
* generalizacja pomiędzy zadaniami, środowiskami i robotami.

#### Architektury i mechanizmy uczenia

Program powinien zawierać publikacje dotyczące architektur, które istotnie wpłynęły na AI i mogą mieć znaczenie dla robotyki, między innymi:

* attention,
* transformery,
* mechanizmy pamięci,
* recurrent neural networks i LSTM jako kontekst historyczny,
* convolutional neural networks,
* mixture-of-experts,
* state-space models,
* modele sekwencyjne,
* architektury do przetwarzania długiego kontekstu,
* modele multimodalne,
* modele generatywne,
* diffusion models,
* autoregressive models,
* representation learning.

Wspomniane przez użytkownika przykłady, takie jak konkretne mechanizmy attention lub popularne architektury reinforcement learningu, należy potraktować jako wskazówki, a nie jako sztywne ograniczenia programu. Agent powinien samodzielnie ustalić, które publikacje i architektury są rzeczywiście najważniejsze.

#### Dane

Należy uwzględnić kompetencje związane z pracą z danymi, szczególnie tam, gdzie jakość danych bezpośrednio wpływa na działanie systemów AI i robotycznych.

Zakres powinien obejmować:

* pozyskiwanie danych,
* jakość danych,
* dataset design,
* selekcję i filtrowanie danych,
* deduplikację,
* etykietowanie,
* automatyczne etykietowanie,
* data augmentation,
* synthetic data,
* active learning,
* curriculum learning,
* dataset bias,
* data leakage,
* class imbalance,
* long-tail distributions,
* domain shift,
* dataset shift,
* data-centric AI,
* skalowanie danych,
* mieszanie zbiorów danych,
* ocenę reprezentatywności danych,
* benchmark contamination,
* wykorzystanie segmentacji, klasyfikacji i innych modeli do przygotowania danych.

Tematy związane z danymi powinny być oparte na publikacjach naukowych, a nie jedynie na ogólnych poradach dotyczących MLOps.

#### Ewaluacja, generalizacja i niezawodność

Program powinien również uwzględnić:

* projektowanie benchmarków,
* generalizację poza rozkład treningowy,
* robustness,
* uncertainty estimation,
* calibration,
* interpretability,
* explainability,
* failure analysis,
* adversarial robustness,
* safety,
* alignment w kontekście agentów i robotów,
* reproducibility,
* statistical significance,
* problemy z porównywaniem metod,
* zależność wyników od środowiska, danych i procedury ewaluacyjnej.

---

### 5. Kryteria doboru publikacji

Publikacje powinny należeć do co najmniej jednej z następujących kategorii:

* prace fundamentalne, które wprowadziły ważną metodę lub pojęcie,
* prace historyczne konieczne do zrozumienia rozwoju dziedziny,
* publikacje o dużym wpływie na późniejsze badania,
* prace reprezentujące obecny stan wiedzy,
* publikacje wskazujące nowe lub szybko rozwijające się kierunki,
* prace szczególnie istotne dla robotyki,
* publikacje pokazujące negatywne wyniki, ograniczenia lub problemy dominujących podejść,
* dobre przeglądy systematyzujące większy obszar.

Nie należy dobierać publikacji wyłącznie na podstawie liczby cytowań, popularności medialnej ani zgodności z aktualną modą badawczą.

Program powinien łączyć:

* klasyczne fundamenty,
* prace przełomowe,
* współczesne rozwinięcia,
* oraz publikacje krytyczne, pokazujące ograniczenia poszczególnych metod.

---

### 6. Oczekiwany poziom samodzielności agenta

Agent nie powinien jedynie przekształcać wymienionych przez użytkownika haseł w listę tematów.

Powinien samodzielnie:

* zidentyfikować brakujące obszary,
* zaproponować istotne tematy, których użytkownik nie wymienił,
* odrzucić obszary słabo związane z celem programu,
* ocenić znaczenie poszczególnych kierunków,
* ustalić priorytety,
* zaprojektować zależności pomiędzy tematami,
* rozdzielić wiedzę fundamentalną od specjalistycznej,
* wskazać ślepe uliczki, ograniczenia i otwarte problemy,
* uzasadnić, dlaczego dany temat powinien albo nie powinien znaleźć się w programie.

Wymagana jest rzeczywista selekcja merytoryczna, a nie automatyczne wygenerowanie szerokiej listy popularnych publikacji.

---

### 7. Czego nie należy robić

Nie należy:

* projektować programu wyłącznie pod jeden aktualny projekt,
* ograniczać się do bezpośrednich potrzeb implementacyjnych,
* tworzyć ogólnej pogadanki o AI bez wskazywania publikacji,
* przedstawiać wyłącznie współczesnych prac bez kontekstu historycznego,
* przedstawiać wyłącznie klasycznych prac bez odniesienia do aktualnego stanu wiedzy,
* marginalizować reinforcement learningu,
* ograniczać programu do vision-language models lub vision-language-action models,
* skupiać się wyłącznie na używaniu gotowych modeli,
* tworzyć sztywnego planu na arbitralną liczbę tygodni,
* uwzględniać obszarów tylko dlatego, że należą do szeroko rozumianego AI,
* przeznaczać dużo miejsca na kierunki o małym prawdopodobieństwie zastosowania w robotyce,
* zastępować publikacji naukowych tutorialami, wpisami blogowymi lub dokumentacją bibliotek,
* podawać listy paperów bez wyjaśnienia ich znaczenia i wzajemnych relacji.

Przykładowo grafowe sieci neuronowe mogą zostać uwzględnione tylko wtedy, gdy agent wykaże ich rzeczywistą wartość dla rozpatrywanych problemów robotycznych. Nie powinny znaleźć się w programie wyłącznie dlatego, że są uznanym obszarem machine learningu.

---

### 8. Docelowy profil kompetencyjny zespołu

Program powinien prowadzić do powstania zespołu, który:

* rozumie fundamenty współczesnego machine learningu i robot learningu,
* potrafi czytać i krytycznie analizować publikacje,
* rozumie matematyczne i algorytmiczne podstawy metod,
* potrafi rozpoznać, kiedy dana metoda może działać, a kiedy prawdopodobnie zawiedzie,
* potrafi porównywać architektury i paradygmaty uczenia,
* rozumie zależności pomiędzy danymi, modelem, środowiskiem i procedurą ewaluacji,
* zna rozwój historyczny najważniejszych idei,
* orientuje się we współczesnych kierunkach badań,
* potrafi przejść od implementacji istniejących metod do ich świadomego modyfikowania,
* potrafi proponować własne rozwiązania modelowe,
* rozumie specyfikę wdrażania AI w systemach fizycznych,
* jest przygotowany na przyszły rozwój robotycznych foundation models, agentów ucieleśnionych i modeli świata.

---

### 9. Główne pytanie, na które ma odpowiedzieć agent

Jak zaprojektować kompletną, uporządkowaną i merytorycznie uzasadnioną bazę tematów oraz publikacji naukowych, dzięki której zespół wdrożeniowy rozwinie szerokie i trwałe kompetencje w zakresie sztucznej inteligencji i robotyki — ze szczególnym naciskiem na reinforcement learning, robot learning, modele świata, percepcję, dane i systemy autonomiczne — bez ograniczania programu do jednego projektu, jednego typu modeli lub chwilowo popularnego kierunku?

---

### 10. Preferowany format odpowiedzi agenta

Odpowiedź powinna być uporządkowana hierarchicznie:

1. Mapa głównych obszarów kompetencyjnych.
2. Priorytety obszarów.
3. Zależności i sugerowane kolejności nauki.
4. Lista tematów lub pytań na spotkania.
5. Konkretne publikacje dla każdego tematu.
6. Podział publikacji na:

   * fundamentalne,
   * historycznie ważne,
   * współczesne,
   * opcjonalne lub specjalistyczne.
7. Krótkie uzasadnienie każdej publikacji.
8. Wskazanie zastosowań w robotyce.
9. Otwarte problemy i kierunki dalszego researchu.
10. Propozycja kilku możliwych ścieżek przechodzenia przez materiał, zależnie od poziomu zespołu.

Liczba tematów i publikacji powinna wynikać z ich wartości merytorycznej, a nie z arbitralnego limitu tygodni.
