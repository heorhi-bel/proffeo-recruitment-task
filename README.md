# Angular proffeo-recruitment-task

Nowoczesna aplikacja Angular 20 do przeglądania i zarządzania postami blogowymi z możliwością dodawania ich do ulubionych.

✨ **Funkcjonalności**

* **Lista postów**: przeglądanie wszystkich postów z filtrowaniem
* **Szczegóły posta**: podgląd pełnej treści posta z informacją o autorze i komentarzach
* **System ulubionych**: dodawanie/usuwanie postów z listy ulubionych
* **Zaawansowane filtrowanie**: wyszukiwanie po tekście, filtrowanie po użytkowniku, widok tylko ulubionych
* **Responsywny design**: podejście mobile-first z TailwindCSS v4
* **Płynne animacje**: animacje wejścia/wyjścia dla lepszego UX
* **Nowoczesna architektura**: standalone components, signals, zoneless change detection

---

🚀 **Stos technologiczny**

* Angular 20 z standalone components
* Signals do reaktywnego zarządzania stanem
* Zoneless Change Detection dla optymalnej wydajności
* TailwindCSS v4 do stylizacji
* Angular Animations z nowym API (`@angular/animations`)
* RxJS do operacji HTTP
* TypeScript w trybie strict

---

📦 **Instalacja**

```bash
# Klonowanie repozytorium
git clone <repository-url>
cd angular-posts-app

# Instalacja zależności
npm install

# Start serwera developerskiego
ng serve
```

Aplikacja dostępna pod adresem: `http://localhost:4200`

---

🏗️ **Architektura**

**Struktura katalogów**

```
src/app/
├── core/                    # Serwisy i konfiguracja
│   ├── services/            # Serwisy API i cache
│   └── interceptors/        # Interceptory HTTP
├── shared/                  # Komponenty wielokrotnego użytku
│   └── components/          # Loader, skeleton, przycisk ulubionych
├── features/                # Moduły funkcjonalne
│   ├── posts/               # Funkcjonalności postów
│   │   ├── components/      # Komponenty związane z postami
│   │   └── services/        # Zarządzanie stanem postów
│   └── favorites/           # Funkcjonalności ulubionych
└── styles/                  # Style globalne
```

**Kluczowe serwisy**

* `ApiService` – klient HTTP dla JSONPlaceholder API
* `CacheService` – cache w pamięci + obsługa stanów ładowania
* `PostsStateService` – zarządzanie stanem postów przy użyciu signals
* `FavoritesService` – zarządzanie ulubionymi

**Główne komponenty**

* `PostListComponent` – lista postów z filtrami
* `PostCardComponent` – podgląd pojedynczego posta
* `PostDetailComponent` – widok posta z komentarzami
* `PostFiltersComponent` – kontrolki wyszukiwania i filtrowania
* `FavoritesListComponent` – lista ulubionych

---

🎯 **Zarządzanie stanem** (signals)

* Reaktywne aktualizacje interfejsu
* `computed signals` do stanu pochodnego
* Cache w pamięci w singleton service
* Skeletony i spinnery przy ładowaniu

---

🔧 **Integracja z API** (JSONPlaceholder)

* `GET /posts` – lista postów
* `GET /posts/:id` – szczegóły posta
* `GET /users/:id` – dane autora
* `GET /posts/:id/comments` – komentarze

---

🎨 **UI/UX**

* Design responsywny (mobile-first)
* Skeletony i spinnery podczas ładowania
* Animacje `enter/leave`
* Hover effects, feedback przy kliknięciu
* Empty states z komunikatami
* Dostępność: ARIA, semantyczny HTML

---

🔍 **Filtrowanie**

* Wyszukiwanie tekstowe (tytuł + treść)
* Filtrowanie po użytkowniku (`?userId=...`)
* Widok tylko ulubionych
* Filtrowanie w czasie rzeczywistym

---

💾 **Strategia cache**

* Posty i użytkownicy przechowywani w singleton service
* API wywoływane tylko przy zmianie filtrów lub odświeżeniu
* Ulubione w pamięci w trakcie sesji

---

🚦 **Optymalizacje**

* Zoneless Change Detection
* Lazy loading feature modules
* Signals + computed dla stanu pochodnego
* Minimalne re-renderowanie komponentów

---

🎭 **Animacje**
Przykład użycia nowego API:

```typescript
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInScale = trigger('fadeInScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
]);
```

---

📱 **Wsparcie przeglądarek**

* Chrome 90+
* Firefox 88+
* Safari 14+
* Edge 90+

---

📄 **Licencja**
Projekt objęty licencją MIT.

---
