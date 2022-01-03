import { test, strictEqual, deepEqual } from "./testing.js";
import {
  getGroupsWithStudents,
  getStudentNamesAlphabetically,
  getStudentsWithNamesAndNotesAverage,
  getStudentsWithNamesAndTopNotes,
  getStudentTopNotes,
  totalOfPositives,
} from "./main.js";

test(
  "total of positive numbers",
  () => {
    strictEqual(totalOfPositives([-1, 1, 2, 3]), 6);
    strictEqual(totalOfPositives([]), 0);
    strictEqual(totalOfPositives([-1, -2]), 0);
  },
  "Funkcja `totalOfPositives` wywołana z 1 argumentem bedącym tablicą liczb powinna zwracać sumę tych liczb, które są większe od zera."
);

test(
  "getStudentNamesAlphabetically",
  () => {
    deepEqual(
      getStudentNamesAlphabetically([
        { name: "Steve" },
        { name: "Becky" },
        { name: "John" },
      ]),
      ["Becky", "John", "Steve"]
    );
    deepEqual(
      getStudentNamesAlphabetically([
        { name: "Mike" },
        { name: "Tom" },
        { name: "Anna" },
      ]),
      ["Anna", "Mike", "Tom"]
    );
  },
  "Funkcja `getStudentNamesAlphabetically` wywolana z tablicą obiektów, posiadających atrybuty `name`, powinna zwrócić tablicę ciągów znaków (imion) posortowaną alfabetycznie rosnąco."
);

test(
  "getStudentTopNotes",
  () => {
    deepEqual(
      getStudentTopNotes([
        {
          id: 1,
          name: "Jacek",
          notes: [5, 3, 4, 2, 5, 5],
        },
        {
          id: 2,
          name: "Ewa",
          notes: [2, 3, 3, 3, 2, 5],
        },
        {
          id: 3,
          name: "Zygmunt",
          notes: [2, 2, 4, 4, 3, 3],
        },
      ]),
      [5, 5, 4]
    );
  },
  "Funkcja `getStudentTopNotes` wywołana z tablicą obiektów studentów powinna zwracać tablicę najwyższych ocen każdego ze studentów"
);

test(
  "getStudentsWithNamesAndTopNotes",
  () => {
    deepEqual(
      getStudentsWithNamesAndTopNotes([
        { name: "John", notes: [3, 5, 4] },
        { name: "Max", notes: [1, 4, 6] },
        { name: "Zygmund", notes: [1, 2, 3] },
      ]),
      [
        { name: "John", topNote: 5 },
        { name: "Max", topNote: 6 },
        { name: "Zygmund", topNote: 3 },
      ]
    );
  },
  "Funkcja `getStudentsWithNamesAndTopNotes` wywołana z tablicą studentów powinna zwracać tablicę obiektów { name: imię studenta, topNote: najwyższa ocena studenta }"
);

test(
  "getStudentsWithNamesAndNotesAverage",
  () => {
    deepEqual(
      getStudentsWithNamesAndNotesAverage([{ name: "John", notes: [3, 5, 4] }]),
      [{ name: "John", avgNote: 4 }]
    );
  },
  "Funkcja `getStudentsWithNamesAndNotesAverage` wywołana z tablicą studentów powinna zwracać tablicę obiektów { name: imię studenta, avgNote: średnia ocen studenta }"
);

test(
  "getGroupsWithStudents",
  () => {
    deepEqual(
      getGroupsWithStudents(
        [
          {
            id: 1,
            name: "G1",
            studentIds: [2, 1],
          },
        ],
        [
          {
            id: 1,
            name: "John",
          },
          {
            id: 2,
            name: "Steve",
          },
        ]
      ),
      [
        {
          id: 1,
          name: "G1",
          students: [
            {
              id: 2,
              name: "Steve",
            },
            {
              id: 1,
              name: "John",
            },
          ],
        },
      ]
    );
  },
  "Funkcja `getGroupsWithStudents` wywołana z 2 argumentami: tablicą grup oraz tablicą studentów, powinna zwrócić tablicę grup, w której każda z grup atrybut `studentIds` ma zastąpiony atrubutem `students`, którego zawartością jest tablica studentów pasujących do id ze `studentIds`"
);
