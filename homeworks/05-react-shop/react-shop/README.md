# React Shop

Celem tego zadania jest zbudowanie sklepu internetowego, w którym będzie można zakupić emotikony.

Asortyment sklepu znajduje się w pliku `products.json`.

Po każdym kroku wykonaj commit. Decyzje o aplikacji stylów pozostawiam Waszemu poczuciu estetyki ;)

## Krok 1

Przygotuj szkielet aplikacji z użyciem `create-react-app`.

## Krok 2

Spraw, żeby Twoja aplikacja wyświetlała tylko nagłówek "React Emoji Shop".
Zadbaj też o to, żeby tytuł zakładki w przeglądarce zawierał ten sam tekst.

## Krok 3

Spraw, żeby na stronie pojawiła się lista produktów z pliku `products.json`. W tym celu:

- umieść ten plik w katalogu `public` (tam, gdzie znajduje się plik `index.html` aplikacji)
  - dzięki temu będzie można pobrać ten plik za pomocą funkcji `fetch` odwołując się do
    niego po adresie `http://localhost:3000/products.json` (zakładając oczywiście, że Twój
    dev server chodzi na porcie 3000)
- pobierz dane korzystając z hooka `useEffect` i zapisz je w stanie korzystając z settera
  zwróconego z `useState`
- użyj wartości stanu zwróconego z `useState`, żeby przemapować go na listę nazw produktów,
  które pobraliśmy

## Krok 4

Pod nazwą każdego z produktów wyświetl przycisk "pokaż szczegóły".
Nie po kliknięciu w ten przycisk po prawej stronie listy pojawi się karta ze wszystkimi
informacjami o danym produkcie:

- nazwą
- emotikonką (niech będzie wyraźnie większa od nazwy)
- ceną (UWAGA: ceny są podane w groszach w PLN)

## Krok 5

Niech pod nagłówkiem na stronie pojawi się ikona koszyka (🛒) i napis: "liczba produktów w koszyku: 0"

## Krok 6

Niech przycisk na kracie produktu po kliknięciu zwiększy licznik produktów w koszyku.

## Krok 7

Niech kliknięcie w ikonę koszyka sprawi, że pojawi się pod nią lista produktów, które dodano do koszyka.
Zwróć uwagę, że dane emoji można dodać do koszyka wiele razy.
Niech elementy na tej liście wyświetlają się dokładnie w takiej kolejności jak zostały dodane do koszyka.
Nie grupuj ich po rodzaju emoji.

## Krok 8

Pod i nad listą produktów wyświetl informację o tym, jaka jest łączna cena całego koszyka.

## Krok 9

Pod listą produktów Wyświetl przycisk "przejdź do podsumowania".
Niech po jego kliknięciu lista produktów zostanie zgrupowana po rodzaju emoji - żeby na ekranie nie pojawiały się duplikaty.
Naturalnie przycisk "przejdź do podsumowania" powinien zamienić się na przycisk "wróć do koszyka".

## Krok 10

Niech obok przycisku "wróć do koszyka" pojawi się przycisk "zamów".
Niech po jego kliknięciu zawartość koszyka zostanie usunięta.
Niech na ekranie wyświetli się komunikat: "Serio? Naprawdę liczyłeś, że pozwolimy Ci kupić nasze emoji? Weź je po prostu skopiuj."