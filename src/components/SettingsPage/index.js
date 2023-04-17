import React, { useEffect, useState } from "react";
//import { getAllCourses } from "../backend/coursesApi";
import { Grid, Slider, Container } from  '@mui/material';

import "./index.css";

function SettingsPage({ courseList }) {
    const [count, setCount] = useState(0);
    const [courseData, setCourseData] = useState(courseList);
    const [coursesTaken, setCoursesTaken] = useState("");
    const [major, setMajor] = useState("");
    const [difficulty, setDifficulty] = useState([0,4]);
    const [insQuality, setInsQuality] = useState(0);
    const [workRequired, setWorkRequired] = useState(4);

    const [oldPassword, setOldPassword] = useState('');
    const[newPassword, setNewPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState('');

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

    // Checks if entered passwords match, and are unique from old password
    // TODO: Update logic for backend
    const checkNewPassword = () => {
        if (newPassword !== reenteredPassword) {
            console.log("Entered passwords do not match");
        }
        if (newPassword === oldPassword || reenteredPassword === oldPassword) {
            console.log("New password cannot be same as old one");
        }
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
                <h2>Settings</h2>
                <h1> </h1>
                <p>Change Password</p>
                <input
                class="form-field" 
                placeholder="Current Password" 
                onChange={(event) => {
                    setOldPassword(event.target.value);
                }}/>
                <input 
                class="form-field"
                placeholder="New Password" 
                onChange={(event) => {
                    setNewPassword(event.target.value);
                }}/>
                <input 
                class="form-field"
                placeholder="Re-enter New Password" 
                onChange={(event) => {
                    setReenteredPassword(event.target.value);
                }}/>
                <button onClick={checkNewPassword}>
                    Update
                </button>
                <h1> </h1>
                <a href="/rec">
                    <button>Return Home</button>
                </a>
                <Container>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <Slider
                            value={difficulty}
                            min={0}
                            max={4}
                            step={0.01}
                            onChange={(e, newValue) => setDifficulty(newValue)}
                            valueLabelDisplay='auto'
                            valueLabelFormat={value => <div>{value}</div>}
                        />
                    </Grid>
                </Grid>
                </Container>
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