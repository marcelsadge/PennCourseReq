import React, { useEffect, useState } from "react";
import { getAllCourses } from "../backend/coursesApi";

function RecPage({ courseList }) {
    const [courseData, setCourseData] = useState(courseList);
    const [coursesTaken, setCoursesTaken] = useState("");
    const [major, setMajor] = useState("");
    const [difficulty, setDifficulty] = useState(0);

    const refreshPage = () => {
        window.location.reload(false);
    }

    const getCourseData = async () => {
        /*
        const data = await fetch("https://penncoursereview.com/api/base/2023A/search/courses/?attributes=EUMS", {
            method: "GET",
        }).then(response => response.json())
        .then((result) => {
            return result.data;
        });

        for (const element in data) {
            const courseId = data[element]["id"];
            data[element]["id"] = courseId.replace("-", "");
        }

        console.log(data);
        setCourseData(data);
        */
    };

    const getCourseRecommendation = () => {
        let courseArr = coursesTaken.split(",");
        console.log(courseArr);
        let counter = 1;
        let recs = {};
        for (const element in courseData) {
            const courseId = courseData[element]["id"];
            const diff = courseData[element]["difficulty"];
            if (diff > difficulty && courseId.includes(major)) {
                if (!courseArr.includes(courseId)) {
                    recs[counter++] = courseData[element]; 
                }
            }
        }
        setCourseData(recs);
    };

    useEffect(() => {
        //getCourseData();
        for (const element in courseData) {
            const courseId = courseData[element]["id"];
            courseData[element]["id"] = courseId.replace("-", "");
        }

        console.log(courseData);
    }, []);

    return (
        <div>
            <div className="RecPage">
                Enter Major, Previous Courses Taken, and Difficulty:
                <input 
                placeholder="Major" 
                onChange={(event) => {
                    setMajor(event.target.value);
                }}/>
                <input 
                placeholder="Courses" 
                onChange={(event) => {
                    setCoursesTaken(event.target.value);
                }}/>
                <input 
                placeholder="Difficulty" 
                onChange={(event) => {
                    setDifficulty(event.target.value);
                }}
                />
                <button onClick={getCourseRecommendation}>
                    Get Course Recommendation
                </button>
                <button onClick={refreshPage}>
                    Reload
                </button>
                <button onClick={getAllCourses}>
                    Test
                </button>
            </div>
            <pre>
                {JSON.stringify(courseData, null, 2)}
            </pre>
        </div>
    );
}

export default RecPage;