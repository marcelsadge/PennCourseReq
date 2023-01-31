const BASE_URL = "https://penncoursereview.com"

export async function getAllCourses() {
  const url = BASE_URL + "/api/base/2023A/search/courses/"
  try {
    const data = await fetch(url,
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

export async function searchForCourse(searchQuery) {
  const url = searchQuery === "" ? BASE_URL + "/api/base/current/search/courses/" :
   BASE_URL + "/api/base/current/search/courses/?" + new URLSearchParams({search: searchQuery})

  try {
    const data = await fetch(url,
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

export async function getCourseByCode(courseCode) {
  
  if (courseCode == null) {
    return;
  }

  const url = BASE_URL + `/api/base/current/courses/${courseCode}/`

 try {
   const data = await fetch(url,
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

