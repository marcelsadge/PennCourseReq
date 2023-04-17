import React from "react";

import { CourseContainer } from "./styles";

function Course({ info }) {
    if (info.title != 'N/A') {
    return (
        <CourseContainer>
            <h1>
                {info.id}:{info.title}
            </h1>
            <h2>
                Description: 
                {info.description}
            </h2>
            <h3>
                Course Difficulty:
                {info.difficulty}
            </h3>
            <h3>
                Work Required:
                {info.work_required}
            </h3>
            <h3>
                Instructor Quality:
                {info.instructor_quality}
            </h3>
        </CourseContainer>
    );
    }
}

export default Course;