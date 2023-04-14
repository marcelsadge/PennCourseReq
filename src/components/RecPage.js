import React, { useEffect, useState } from "react";
import JsonDataDisplay from "./CourseDataComponentDisplay";
//import { getAllCourses } from "../backend/coursesApi";
import { Grid, Slider, Container } from  '@mui/material';

import { requiredCourses, chooseOne, chooseTwo, chooseThree, chooseFour, chooseFive, chooseSix,
        chooseSeven, chooseEight, chooseNine, chooseTen, getIndexOfMajor } from './RequiredCourses.js';

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
    const [courseCount, setCourseCount] = useState(0);
    const [schedDiff, setSchedDiff] = useState(0.0);
    const [schedWork, setSchedWork] = useState(0.0);
    const [schedQual, setSchedQual] = useState(0.0);
    const [test, setTest] = useState("");

    const refreshPage = () => {
        window.location.reload(false);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    const addToList = (inArray, outList) => {
        for (let i = 0; i < inArray.length; i++) {
            let maj = inArray.at(i);
            for (let j = 1; j < maj.length; j++) {
                let clust = maj.at(j);
                for (let k = 0; k < clust.length; k++) {
                    if (!outList.includes(clust.at(k)) && clust.at(k).length > 4) {
                        outList.push(clust.at(k));
                    }
                }
            }
        }
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
        let courses = 0;
        let overallDifficulty = 0;
        let overallWork = 0;
        let overallInsQual = 0;

        let reqCourses = requiredCourses.at(getIndexOfMajor(majorNew.toUpperCase(), requiredCourses)).at(1);
        let choose1 = chooseOne.at(getIndexOfMajor(majorNew.toUpperCase(), chooseOne));
        let choose2 = chooseTwo.at(getIndexOfMajor(majorNew.toUpperCase(), chooseTwo));
        let choose3 = chooseThree.at(getIndexOfMajor(majorNew.toUpperCase(), chooseThree));
        let choose4 = chooseFour.at(getIndexOfMajor(majorNew.toUpperCase(), chooseFour));
        let choose5 = chooseFive.at(getIndexOfMajor(majorNew.toUpperCase(), chooseFive));
        let choose6 = chooseSix.at(getIndexOfMajor(majorNew.toUpperCase(), chooseSix));
        let choose7 = chooseSeven.at(getIndexOfMajor(majorNew.toUpperCase(), chooseSeven));
        let choose8 = chooseEight.at(getIndexOfMajor(majorNew.toUpperCase(), chooseEight));
        let choose9 = chooseNine.at(getIndexOfMajor(majorNew.toUpperCase(), chooseNine));
        let choose10 = chooseTen.at(getIndexOfMajor(majorNew.toUpperCase(), chooseTen));

        let allCoursesList = [];
        let allCoursesDict = {};

        let coursesChosen = [];

        addToList(requiredCourses, allCoursesList);
        addToList(chooseOne, allCoursesList);
        addToList(chooseTwo, allCoursesList);
        addToList(chooseThree, allCoursesList);
        addToList(chooseFour, allCoursesList);
        addToList(chooseFive, allCoursesList);
        addToList(chooseSix, allCoursesList);
        addToList(chooseSeven, allCoursesList);
        addToList(chooseEight, allCoursesList);
        addToList(chooseNine, allCoursesList);
        addToList(chooseTen, allCoursesList);

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

            if (allCoursesList.includes(courseId)) {
                allCoursesDict[courseId] = courseData[element];
            }

            // required courses, difficulty and other attributes do not matter
            if (reqCourses.includes(courseId)) {
                if (!courseArr.includes(courseId)) {
                    recs[counter++] = courseData[element];
                    courses=courses+1;
                    coursesChosen.push(courseId);
                    overallDifficulty = overallDifficulty + courseData[element]["difficulty"];
                    overallWork = overallWork + courseData[element]["work_required"];
                    overallInsQual = overallInsQual + courseData[element]["instructor_quality"];
                }
            }


            // 

            /*
            //if (diff <= difficulty[1] && diff >= difficulty[0] && courseId.includes(major) && 
            if (diff <= difficulty[1] && diff >= difficulty[0] && reqCourses.includes(courseId) && 
                workReq <= workRequired[1] && workReq >= workRequired[0] && insQual >= insQuality[0] && insQual <= insQuality[1]) {
                if (!courseArr.includes(courseId)) {
                    recs[counter++] = courseData[element]; 
                    courses=courses+1;
                }
            }
            */
        }
        
        for (let i = 1; i < choose1.length; i++) {

            let clust = choose1.at(i);
            let num_courses_chosen = 0;

            for (let j = 0; j < clust.length; j++) {


                if (Object.keys(allCoursesDict).includes(clust.at(j))) {
                    //setTest(allCoursesDict[clust.at(j)]["difficulty"]);
                    let diff = allCoursesDict[clust.at(j)]["difficulty"];
                    let workReq = allCoursesDict[clust.at(j)]["work_required"];
                    let insQual = allCoursesDict[clust.at(j)]["instructor_quality"];

                    if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                        insQual >= insQuality[0] && insQual <= insQuality[1]) {
                            courses=courses+1;
                            coursesChosen.push(clust.at(j));
                            num_courses_chosen=num_courses_chosen+1;
                            overallDifficulty = overallDifficulty + allCoursesDict[clust.at(j)]["difficulty"];
                            overallWork = overallWork + allCoursesDict[clust.at(j)]["work_required"];
                            overallInsQual = overallInsQual + allCoursesDict[clust.at(j)]["instructor_qualtiy"];
                            recs[counter++] = allCoursesDict[clust.at(j)];
                            break;
                        }
                }
            }
            
            if (num_courses_chosen < 1) {
                let randIndex = getRandomInt(clust.length);
                let randCourse = clust.at(randIndex);

                while (coursesChosen.includes(randCourse)) {
                    randIndex = getRandomInt(clust.length);
                    randCourse = clust.at(randIndex);
                }

                coursesChosen.push(randCourse);

                let randCourseJSON = {"id": randCourse, "title": "N/A", "description": "No description available", "semester": "N/A", "num_sections": 0, "course_quality": null, instructor_quality: null, "difficulty": null, "work_required": null, "recommendation_score": null};
                recs[counter++] = randCourseJSON;
            }
        
        }

        setCourseData(Object.values(recs));
        setCourseCount(courses); 
        setSchedDiff(Math.round(overallDifficulty / courses * 1000) / 1000);
        setSchedWork(Math.round(overallWork / courses * 1000) / 1000);
        setSchedQual(Math.round(overallInsQual / courses * 1000) / 1000);
        //setTest(choose1.length);

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
                Fields: {schedDiff} {schedWork} {schedQual} {test}
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
