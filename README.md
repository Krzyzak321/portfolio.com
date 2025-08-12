# Portfolio 3D (React + Three.js, JavaScript)

Podstawowy szkielet projektu portfolio z użyciem **React** i **Three.js** (przez `@react-three/fiber`) — WERSJA JAVASCRIPT.

## Co zawiera:

- Komponent interaktywnych kafelków z responsywnym ułożeniem (grid, mobile friendly).
- Miejsce na obiekt 3D (przykładowy plik do rozbudowy).
- Cała struktura gotowa do rozwijania — możesz dodawać kolejne sekcje, obiekty, animacje itp.

## Uruchomienie

1. Zainstaluj zależności:

   ```bash
   npm install
   ```

2. Uruchom lokalny serwer developerski:

   ```bash
   npm run dev
   ```

3. Otwórz w przeglądarce `http://localhost:5173`

## Rozwój

- Dodawaj własne kafelki przez edycję tablicy `dummyTiles` w `src/components/RoundedTiles.jsx`.
- Plik `src/components/My3DObject.jsx` służy jako miejsce na własny mesh/model/scenę 3D.
- Stylowanie kafelków oraz layout można łatwo zmieniać w `src/components/RoundedTile.css` oraz `src/index.css`.

## Stack

- [React](https://react.dev/)
- [Three.js](https://threejs.org/) przez [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [Vite](https://vitejs.dev/) (szybki dev build)

---

W razie pytań lub chęci rozbudowy — po prostu dodaj nowe komponenty i rozwijaj dalej!