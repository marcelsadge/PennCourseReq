//semesterString: on the format of "Spring 2022"
//return: semester+year formatted based on the API "2022A"
export function formatSemesterString(semesterString) {
    const array = semesterString.toLowerCase().split(" ")
    var semesterCode = ""
    switch (array[0]) {
        case "spring":
            semesterCode = "A"
            break;
        case "summer":
            semesterCode = "B"
            break;
        case "fall":
            semesterCode = "C"
            break;
        default:
            semesterCode = ""
            break;
    }
    return array[1] + semesterCode
}