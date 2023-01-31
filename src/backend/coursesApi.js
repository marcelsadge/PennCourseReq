export async function getAllCourses() {
  try {
    const data = await fetch(
      "https://penncoursereview.com/api/base/2023A/search/courses/?attributes=EUMS",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        return result.data;
      });
  } catch (error) {
    return;
  }
}

// for (const element in data) {
//   const courseId = data[element]["id"];
//   data[element]["id"] = courseId.replace("-", "");
// }

// console.log(data);
// setCourseData(data);
