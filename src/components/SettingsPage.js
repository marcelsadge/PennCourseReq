import React, { useEffect, useState } from "react";
import JsonDataDisplay from "./CourseDataComponentDisplay";
//import { getAllCourses } from "../backend/coursesApi";

import "./SettingsPage.css";

function SettingsPage({ courseList }) {
    const [count, setCount] = useState(0);
    const [courseData, setCourseData] = useState(courseList);
    const [coursesTaken, setCoursesTaken] = useState("");
    const [major, setMajor] = useState("");
    const [difficulty, setDifficulty] = useState(4);
    const [insQuality, setInsQuality] = useState(0);
    const [workRequired, setWorkRequired] = useState(4);

    const refreshPage = () => {
        window.location.reload(false);
    }

    const getCourseRecommendation = () => {
        setCount(1);
        let courseArr = coursesTaken.split(",");
        let counter = 1;
        let recs = {};
        for (const element in courseData) {
            const courseId = courseData[element]["id"];
            let diff = courseData[element]["difficulty"];
            let insQual = courseData[element]["instructor_quality"];
            let workReq = courseData[element]["work_required"];
            if (diff == null) {
                diff = 5;
            }
            if (insQual == null) {
                insQual = 5;
            }
            if (workReq == null) {
                workReq = 5;
            }
            if (diff < difficulty && courseId.includes(major) && workReq <= workRequired && insQuality <= insQual) {
                if (!courseArr.includes(courseId)) {
                    recs[counter++] = courseData[element]; 
                }
            }
        }
        console.log(recs);
        setCourseData(Object.values(recs));
    };

    useEffect(() => {
        //getCourseData();
        for (const element in courseData) {
            const courseId = courseData[element]["id"];
            courseData[element]["id"] = courseId.replace("-", "");
        }
    }, [courseData]);

    return (
        <div className="RecContainer">
            <div className="NavBar">
                <div className="Title">
                <h1>PennCourseReq</h1>
                </div>
            </div>
            <div className="RecBox">
                Settings:
                <input
                class="form-field" 
                placeholder="Major (CIS, MEAM, etc)" 
                onChange={(event) => {
                    setMajor(event.target.value);
                }}/>
                <input 
                class="form-field"
                placeholder="Courses Taken (Comma Seperated - No Space)" 
                onChange={(event) => {
                    setCoursesTaken(event.target.value);
                }}/>
                <input 
                class="form-field"
                placeholder="Course Difficulty (Maximum Course Difficulty)" 
                onChange={(event) => {
                    setDifficulty(event.target.value);
                }}
                />
                <input 
                class="form-field"
                placeholder="Work Required (Maximum Work Required)" 
                onChange={(event) => {
                    setWorkRequired(event.target.value);
                }}
                />
                <input 
                class="form-field"
                placeholder="Instructor Quality (Minimum Instructor Quality)" 
                onChange={(event) => {
                    setInsQuality(event.target.value);
                }}
                />
                <button onClick={getCourseRecommendation}>
                    Get Course Recommendation
                </button>
                <button onClick={refreshPage}>
                    Reload
                </button>
            </div>
            <div>
                {count == 1 &&
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Course Description</th>
                        <th>Course Difficulty</th>
                        <th>Work Required</th>
                        <th>Instructor Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                    {courseData.map((info)=>{
                        return(
                            <tr>
                                <td>{info.id}</td>
                                <td>{info.title}</td>
                                <td>{info.description}</td>
                                <td>{info.difficulty}</td>
                                <td>{info.work_required}</td>
                                <td>{info.instructor_quality}</td>
                            </tr>
                        )})
                    }
                    </tbody>
                </table>
                }
            </div>
        </div>
    );
}

export default SettingsPage;