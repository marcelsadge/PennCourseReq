const BASE_URL = "https://penncoursereview.com"

export async function getAllCourses() {
  const url = BASE_URL + "/api/base/current/courses/"
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

export async function getCourseByCodeAndSemester(semester, courseCode) {
  
  if (courseCode == null) {
    return;
  }

  const url = BASE_URL + `/api/base/${semester}/courses/${courseCode}/`

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

export async function getSectionByCode(sectionCode) {
  
  if (courseCode == null) {
    return;
  }

  const url = BASE_URL + `/api/base/current/sections/${sectionCode}/`

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

export async function getSectionByCodeAndSemester(semester, sectionCode) {
  
  if (courseCode == null) {
    return;
  }

  const url = BASE_URL + `/api/base/'${semester}'/sections/${sectionCode}/`

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

