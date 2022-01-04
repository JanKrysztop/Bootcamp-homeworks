/**
 * Pod nazwą `employees` znajduje się tablica pracowników.
 * Jest ich tam 10 sztuk - możesz podejrzeć plik `./employees.js`
 * jeżeli gryzie Cię ciekawość ;)
 */
import { employees } from "./employees.js";

/* Na konsoli możemy wyświetlić zawartość tej tablicy */
console.log(employees);

/**
 * Wygodniej jest jednak podglądać tablicę obiektów używając `console.table`.
 * Zwróć uwagę, że w konsoli pojawia się tabelka, w które można nawet sortować
 * dane po kolumnach.
 *
 * Niestety jeżeli pod danym atrybutem kryje się tablica lub inny obiekt
 * to w ten sposób nie podejrzymy zastanych tam wartości - trzeba użyć zwykłego `console.log`
 */
console.table(employees);

/**
 * Poniżej mamy wywołanie funkcji `getMales`, która ma za zadanie zrócić tablicę
 * tych pracowników, którzy mają w swoim atrybucie `gender` wartość `Male`.
 *
 * Możesz tworzyć dowolną liczbę funkcji pomocniczych. Te zadania nie są sprawdzane
 * automatycznie, więc obserwuj to, co dzieje się w konsoli w przeglądarce.
 *
 * Specjalnie poniżej dodaję wywołanie tej funkcji i wyświetlam dane na konsoli.
 */

const getMales = (people) => {
  const male = (people) => people.gender === "Male";
  return people.filter(male)
};

/**
 * Funkcja `console.group` tworzy specjalne grupy w konsoli, także wszystko to, co wypiszesz
 * za pomocą `console.log` pomiędzy linią z `console.group` oraz `console.groupEnd` będzie
 * łatwe do odnalezienia.
 */
console.group("Challenge 1: getMales (2pkt)");
console.log("Ten log na konsoli pojawi się w obrębie pierwszej grupy");
console.log(
  "Gdy uzupełnisz implementację funkcji `getMales` to poniżej",
  "zamiast `undefined` zobaczysz tabelę z odpowiednimi pracownikami"
);
console.table(getMales(employees));
console.groupEnd();

/**
 * Kolejna funkcja: `getNonSmokingMales` ma za zadanie zwrócić tablicę niepalących mężczyzn.
 *
 * hint: Możesz w niej skorzystać z funkcji `getMales` ;)
 */
const getNonSmokingMales = (people) => {
  const notSmoker = (people) => people.isSmoking === false;
  return getMales(employees).filter(notSmoker);
};

console.group("Challenge 2: getNonSmokingMales (2pkt)");
console.table(getNonSmokingMales(employees));
console.groupEnd();

/**
 * Kolejna funkcja: `getNumericSalaries` ma za zadanie zwrócić tablicę liczb odpowiadających wynagrodzeniom pracowników.
 *
 * Zwróć uwagę na to, że wynagrodzenia w tablicy pracowników nie są liczbami - są to ciągi znaków poprzedzone symbolem `$`.
 *
 * hint 1: Użyj `.map`
 * hint 2: Zastanów się jak pozbyć się pierwszego znaku z wynagrodzenia, a pozostałą część tego tesktu zamienić na liczbę.
 */
const getNumericSalaries = (people) => {
  const allSalary = (people) => Number(people.salary.slice(1));
  return people.map(allSalary);
};

console.group("Challenge 3: getNumericSalaries (2pkt)");
console.table(getNumericSalaries(employees));
console.groupEnd();

/**
 * Kolejna funkcja: `getTotalSalary` ma za zadanie zwrócić sumę wynagrodzeń wszystkich pracowników.
 *
 * hint 1: Użyj funkcji `getNumericSalaries`
 * hint 2: Użyj `.reduce`
 */
const getTotalSalary = (people) => {
  return getNumericSalaries(employees).reduce((a, b) => a + b)
};

console.group("Challenge 4: getTotalSalary (2pkt)");
console.table(getTotalSalary(employees));
console.groupEnd();

/**
 * Kolejna funkcja: `getTotalSalaryOfNonSmokingMales` ma za zadanie zwrócić sumę wynagrodzeń
 * wszystkich pracowników, którzy są mężczyznami i nie palą.
 *
 */
const getTotalSalaryOfNonSmokingMales = (people) => {
  return getNumericSalaries(getNonSmokingMales(employees)).reduce((a, b) => a + b)
};

console.group("Challenge 5: getTotalSalaryOfNonSmokingMales (2pkt)");
console.table(getTotalSalaryOfNonSmokingMales(employees));
console.groupEnd();

/**
 * Kolejna funkcja: `groupByCity` ma za zadanie zwrócić obiekt, w takim kształcie:
 *
 * {
 *   [nazwa miasta]: [tablica imion pracowników z tego miasta]
 * }
 *
 * Np.
 *
 * {
 *   'Gdańsk': ['Alizée', 'Dà', 'Åslög', 'Réservés'], // te imiona akurat pokrywają się z tym, co zobaczymy w konsoli (resztę zmyśliłem)
 *   'Sopot': ['Jacek', 'Placek', 'Ignacy'],
 *   'Zamość': ['Jurek', 'Sznurek', 'Ogórek']
 * }
 *
 */
const groupByCity = (people) => {
  return people.reduce((a, b) => {
    console.log(b.name);
    const atributeName = b.city;
    if (a[atributeName] === undefined) {
     a[atributeName] = [b.name];
    } else {
     a[atributeName].push(b.name)
    }
    return a;
   }, {});
  };


console.group("Challenge 6: groupByCity (2pkt)");
console.table(groupByCity(employees));
console.groupEnd();
