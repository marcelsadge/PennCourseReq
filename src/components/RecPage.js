import React, { useEffect, useState } from "react";
import JsonDataDisplay from "./CourseDataComponentDisplay";
//import { getAllCourses } from "../backend/coursesApi";
import { Grid, Slider, Container } from  '@mui/material';

import { requiredCourses, getIndexOfMajor } from './RequiredCourses.js';

import "./RecPage.css";

function RecPage({ courseList }) {
    const getInitialState = () => {
        const value = "Major";
        return value;
      };    

    const [count, setCount] = useState(0);
    const [courseData, setCourseData] = useState(courseList);
    const [coursesTaken, setCoursesTaken] = useState("");
    const [major, setMajor] = useState("");
    const [difficulty, setDifficulty] = useState([0,4]);
    const [insQuality, setInsQuality] = useState([0,4]);
    const [workRequired, setWorkRequired] = useState([0,4]);
    const [majorNew, setMajorNew] = useState(getInitialState);
    const [test, setTest] = useState("here");

    let overallDifficulty = 0;
    let overallWork = 0;
    let overallInsQual = 0;
    let courseCount = 0;

    const refreshPage = () => {
        window.location.reload(false);
    }

    const getCourseData = async () => {
        const data = await fetch("https://penncoursereview.com/api/base/2023A/search/courses/?attributes=EUMS", {
            method: "GET",
        }).then(response => {
            return response.text()
        })
        .then((result) => {
            return result.data;
        });

        for (const element in data) {
            const courseId = data[element]["id"];
            data[element]["id"] = courseId.replace("-", "");
        }
        setCourseData(data);
    };

    const getCourseRecommendation = () => {
        setCount(1);
        let courseArr = coursesTaken.split(",");
        let counter = 1;
        let recs = {};

        let reqCourses = requiredCourses.at(getIndexOfMajor(majorNew.toUpperCase(), requiredCourses)).at(1);

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
            //if (diff <= difficulty[1] && diff >= difficulty[0] && courseId.includes(major) && 
            if (diff <= difficulty[1] && diff >= difficulty[0] && reqCourses.includes(courseId) && 
                workReq <= workRequired[1] && workReq >= workRequired[0] && insQual >= insQuality[0] && insQual <= insQuality[1]) {
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
        <div>
        <div className="NavBar">
                <div className="Title">
                <h1>PennCourseReq</h1>
                </div>
            </div>
        <div className="RecContainer">
            <div className="RecBox">
                <a href="/settings">
                    <button>Settings</button>
                </a>
                <h1></h1>
                Fields: {test}
                <input
                class="form-field" 
                placeholder="Major (CIS, MEAM, etc)" 
                onChange={(event) => {
                    setMajor(event.target.value);
                }}/>
                <select value={majorNew} onChange={(event) => {
                    setMajorNew(event.target.value);
                }}>
                    <option value="Africana Studies">Africana Studies</option>
                    <option value="Ancient History">Ancient History</option>
                    <option value="Anthropology">Anthropology</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Biophysics">Biophysics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Cinema And Media Studies">Cinema And Media Studies</option>
                    <option value="Classical Studies: Classical Civilizations">Classical Studies: Classical Civilizations</option>
                    <option value="Classical Studies: Classical Languages And Literature">Classical Studies: Classical Languages And Literature</option>
                    <option value="Classical Studies: Mediterranean Archaeology">Classical Studies: Mediterranean Archaeology</option>
                    <option value="Cognitive Science: Cognitive Neuroscience">Cognitive Science: Cognitive Neuroscience</option>
                    <option value="Cognitive Science: Computation And Cognition">Cognitive Science: Computation And Cognition</option>
                    <option value="Cognitive Science: Language And Mind">Cognitive Science: Language And Mind</option>
                    <option value="Communication">Communication</option>
                    <option value="Comparative Literature: (Trans)National Literatures">Comparative Literature: (Trans)National Literatures</option>
                    <option value="Comparative Literature: Globalization">Comparative Literature: Globalization</option>
                    <option value="Comparative Literature: Theory">Comparative Literature: Theory</option>
                    <option value="Criminology">Criminology</option>
                    <option value="Design">Design</option>
                    <option value="Earth Sciences: Environmental Science">Earth Sciences: Environmental Science</option>
                    <option value="Earth Sciences: Geology">Earth Sciences: Geology</option>
                    <option value="Earth Sciences: Paleobiology">Earth Sciences: Paleobiology</option>
                    <option value="East Asian Languages And Civilizations">East Asian Languages And Civilizations</option>
                    <option value="Economics">Economics</option>
                    <option value="English">English</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Fine Arts">Fine Arts</option>
                    <option value="French And Francophone Studies">French And Francophone Studies</option>
                    <option value="Gender, Sexuality, And Women'S Studies">Gender, Sexuality, And Women'S Studies</option>
                    <option value="German">German</option>
                    <option value="Health And Societies">Health And Societies</option>
                    <option value="Hispanic Studies">Hispanic Studies</option>
                    <option value="History Of Art">History Of Art</option>
                    <option value="History">History</option>
                </select>
                <input 
                class="form-field"
                placeholder="Courses Taken (Comma Seperated - No Space)" 
                onChange={(event) => {
                    setCoursesTaken(event.target.value);
                }}/>
                <Container>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <p>Course Difficulty</p>
                        <Slider
                            value={difficulty}
                            min={0}
                            max={4}
                            step={0.01}
                            onChange={(e, newValue) => setDifficulty(newValue)}
                            valueLabelDisplay='auto'
                            valueLabelFormat={value => <div>{value}</div>}
                            sx={{color: '#BBBBBB'}}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <p>Work Required</p>
                        <Slider
                            value={workRequired}
                            min={0}
                            max={4}
                            step={0.01}
                            onChange={(e, newValue) => setWorkRequired(newValue)}
                            valueLabelDisplay='auto'
                            valueLabelFormat={value => <div>{value}</div>}
                            sx={{color: '#BBBBBB'}}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item xs={4}>
                        <p>Instructor Quality</p>
                        <Slider
                            value={insQuality}
                            min={0}
                            max={4}
                            step={0.01}
                            onChange={(e, newValue) => setInsQuality(newValue)}
                            valueLabelDisplay='auto'
                            valueLabelFormat={value => <div>{value}</div>}
                            sx={{color: '#BBBBBB'}}
                        />
                    </Grid>
                </Grid>
                </Container>
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
        </div>
    );
}

export default RecPage;
