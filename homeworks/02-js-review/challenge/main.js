/**
 * @param {number[]} numbers
 * @returns {number} sum of all positive numbers from `numbers` array
 */

export const totalOfPositives = (numbers) => {
  let arrayFiltered = numbers.filter((element) => element > 0);
  return arrayFiltered.reduce((x, y) => x + y, 0);
};

/**
 * @param {Array<{ name: string }>} students
 * @returns {string[]} names of students sorted alphabetically
 */
export const getStudentNamesAlphabetically = (students) => {
  let values = students.map(({ name }) => name);
  return values.sort();
};

/**
 * @param {Array<{ notes: number[] }>} students
 * @returns {number[]} array of numbers - each representing the biggest note from `notes` array
 */
export const getStudentTopNotes = (students) => {
  return students.map(({ notes }) => Math.max(...notes));
};

/**
 * @param {Array<{ name: string; notes: number[] }>} students
 * @returns {Array<{ name: string: topNote: number }} array of students but with `notes` array replaced by `topNote` - the single, biggest note for each student
 */
export const getStudentsWithNamesAndTopNotes = (students) => {
  return students.map((student) => {
    return {
      name: student.name,
      topNote: Math.max(...student.notes),
    };
  });
};

/**
 * @param {Array<{ name: string; notes: number[] }>} students
 * @returns {Array<{ name: string: avgNote: number }} array of students but with `notes` array replaced by `avgNote` - the average of given student notes
 */
export const getStudentsWithNamesAndNotesAverage = (students) => {
  return students.map((student) => {
    const sum = student.notes.reduce((a, b) => a + b, 0);
    const avg = (sum / student.notes.length)
    return {
      name: student.name,
      avgNote: avg,
    };
  });
};

/**
 *
 * @param {Array<{ id: number; name: string; studentIds: number[] }>} groups
 * @param {Array<{ id: number; name: string; notes: number[] }>} students
 *
 * @returns {Array<{ id: number; name: string; students: Array<{ id: number; name: string; notes: number[] }>}} array of groups but with `studentIds` replaced by `students` - array of student objects representing the students with given id
 */
export const getGroupsWithStudents = (groups, students) => {
  console.log(groups)
  console.log(students)
  return groups.map((group) => {
    return {
      id: group.id,
      name: group.name,
      students: group.studentIds.map((studentId) => {
        return students.find((student) => {
          return student.id === studentId;
        })
      }),
    };
  })
};
