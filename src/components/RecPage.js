import React, { useEffect, useState } from "react";
import JsonDataDisplay from "./CourseDataComponentDisplay";
//import { getAllCourses } from "../backend/coursesApi";
import { Grid, Slider, Container } from  '@mui/material';

import { requiredCourses, collegeMajors, collegeRequirements, chooseOne, chooseTwo, chooseThree, chooseFour, chooseFive, chooseSix,
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
        let choose1 = getIndexOfMajor(majorNew.toUpperCase(), chooseOne) >= 0 ? chooseOne.at(getIndexOfMajor(majorNew.toUpperCase(), chooseOne)) : null;
        let choose2 = getIndexOfMajor(majorNew.toUpperCase(), chooseTwo) >= 0 ? chooseTwo.at(getIndexOfMajor(majorNew.toUpperCase(), chooseTwo)) : null;
        let choose3 = getIndexOfMajor(majorNew.toUpperCase(), chooseThree) >= 0 ? chooseThree.at(getIndexOfMajor(majorNew.toUpperCase(), chooseThree)) : null;
        let choose4 = getIndexOfMajor(majorNew.toUpperCase(), chooseFour) >= 0 ? chooseFour.at(getIndexOfMajor(majorNew.toUpperCase(), chooseFour)) : null;
        let choose5 = getIndexOfMajor(majorNew.toUpperCase(), chooseFive) >= 0 ? chooseFive.at(getIndexOfMajor(majorNew.toUpperCase(), chooseFive)) : null;
        let choose6 = getIndexOfMajor(majorNew.toUpperCase(), chooseSix) >= 0 ? chooseSix.at(getIndexOfMajor(majorNew.toUpperCase(), chooseSix)) : null;
        let choose7 = getIndexOfMajor(majorNew.toUpperCase(), chooseSeven) >= 0 ? chooseSeven.at(getIndexOfMajor(majorNew.toUpperCase(), chooseSeven)) : null;
        let choose8 = getIndexOfMajor(majorNew.toUpperCase(), chooseEight) >= 0 ? chooseEight.at(getIndexOfMajor(majorNew.toUpperCase(), chooseEight)) : null;
        let choose9 = getIndexOfMajor(majorNew.toUpperCase(), chooseNine) >= 0 ? chooseNine.at(getIndexOfMajor(majorNew.toUpperCase(), chooseNine)) : null;
        let choose10 = getIndexOfMajor(majorNew.toUpperCase(), chooseTen) >= 0 ? chooseTen.at(getIndexOfMajor(majorNew.toUpperCase(), chooseTen)) : null;

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
        
        function addToRecList(courseArray, numToChoose) {

            if (courseArray !== null) {
                for (let i = 1; i < courseArray.length; i++) {
    
                    let clust = courseArray.at(i);
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
                                    if (num_courses_chosen == numToChoose) { break; }
                                }
                        }
                    }
                    
                    if (num_courses_chosen < numToChoose) {
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
            }

        }

        addToRecList(choose1, 1);
        addToRecList(choose2, 2);
        addToRecList(choose3, 3);
        addToRecList(choose4, 4);
        addToRecList(choose5, 5);
        addToRecList(choose6, 6);
        addToRecList(choose7, 7);
        addToRecList(choose8, 8);
        addToRecList(choose9, 9);
        addToRecList(choose10, 10);

        if (collegeMajors.includes(majorNew.toUpperCase())) {
            addToRecList(collegeRequirements.at(0), 1);
            addToRecList(collegeRequirements.at(1), 1);
            addToRecList(collegeRequirements.at(2), 1);
            addToRecList(collegeRequirements.at(3), 1);
            addToRecList(collegeRequirements.at(4), 1);
            addToRecList(collegeRequirements.at(5), 1);
            addToRecList(collegeRequirements.at(6), 1);
            addToRecList(collegeRequirements.at(7), 1);
            addToRecList(collegeRequirements.at(8), 1);
            addToRecList(collegeRequirements.at(9), 1);
            addToRecList(collegeRequirements.at(10), 1);
            addToRecList(collegeRequirements.at(11), 1);
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
                    <option value="Accounting">Accounting</option>
                    <option value="Africana Studies">Africana Studies</option>
                    <option value="Ancient History">Ancient History</option>
                    <option value="Anthropology">Anthropology</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Behavioral Economics">Behavioral Economics</option>
                    <option value="Biochemistry">Biochemistry</option>
                    <option value="Bioengineering">Bioengineering</option>
                    <option value="Biology">Biology</option>
                    <option value="Biomedical Science">Biomedical Science</option>
                    <option value="Biophysics">Biophysics</option>
                    <option value="Business Analytics">Business Analytics</option>
                    <option value="Business Economics And Public Policy">Business Economics And Public Policy</option>
                    <option value="Business, Energy, Environment, And Sustainability">Business, Energy, Environment, And Sustainability</option>
                    <option value="Chemical And Biomolecular Engineering">Chemical And Biomolecular Engineering</option>
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
                    <option value="Computer Engineering">Computer Engineering</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Criminology">Criminology</option>
                    <option value="Design">Design</option>
                    <option value="Digital Media Design">Digital Media Design</option>
                    <option value="Earth Sciences: Environmental Science">Earth Sciences: Environmental Science</option>
                    <option value="Earth Sciences: Geology">Earth Sciences: Geology</option>
                    <option value="Earth Sciences: Paleobiology">Earth Sciences: Paleobiology</option>
                    <option value="East Asian Languages And Civilizations">East Asian Languages And Civilizations</option>
                    <option value="Economics">Economics</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="English">English</option>
                    <option value="Entrepreneurship And Innovation">Entrepreneurship And Innovation</option>
                    <option value="Environmental Studies">Environmental Studies</option>
                    <option value="Finance">Finance</option>
                    <option value="Fine Arts">Fine Arts</option>
                    <option value="French And Francophone Studies">French And Francophone Studies</option>
                    <option value="Gender, Sexuality, And Women'S Studies">Gender, Sexuality, And Women'S Studies</option>
                    <option value="German">German</option>
                    <option value="Health And Societies">Health And Societies</option>
                    <option value="Health Care Management And Policy">Health Care Management And Policy</option>
                    <option value="Hispanic Studies">Hispanic Studies</option>
                    <option value="History">History</option>
                    <option value="History Of Art">History Of Art</option>
                    <option value="International Relations">International Relations</option>
                    <option value="Italian Studies: Italian Culture">Italian Studies: Italian Culture</option>
                    <option value="Italian Studies: Italian Literature">Italian Studies: Italian Literature</option>
                    <option value="Jewish Studies">Jewish Studies</option>
                    <option value="Latin American And Latinx Studies">Latin American And Latinx Studies</option>
                    <option value="Legal Studies And Business Ethics">Legal Studies And Business Ethics</option>
                    <option value="Linguistics">Linguistics</option>
                    <option value="Logic, Information, And Computation">Logic, Information, And Computation</option>
                    <option value="Management">Management</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Marketing And Communications">Marketing And Communications</option>
                    <option value="Marketing And Operations Management">Marketing And Operations Management</option>
                    <option value="Materials Science And Engineering">Materials Science And Engineering</option>
                    <option value="Mathematical Economics">Mathematical Economics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Music">Music</option>
                    <option value="Networked And Social Systems Engineering">Networked And Social Systems Engineering</option>
                    <option value="Neuroscience">Neuroscience</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Nutritional Science">Nutritional Science</option>
                    <option value="Operations, Information, And Decisions">Operations, Information, And Decisions</option>
                    <option value="Philosophy">Philosophy</option>
                    <option value="Philosophy, Politics, And Economics: Choice And Behavior">Philosophy, Politics, And Economics: Choice And Behavior</option>
                    <option value="Philosophy, Politics, And Economics: Distributive Justice">Philosophy, Politics, And Economics: Distributive Justice</option>
                    <option value="Philosophy, Politics, And Economics: Globalization">Philosophy, Politics, And Economics: Globalization</option>
                    <option value="Philosophy, Politics, And Economics: Public Policy And Governance">Philosophy, Politics, And Economics: Public Policy And Governance</option>
                    <option value="Physics: Astrophysics">Physics: Astrophysics</option>
                    <option value="Physics: Biological Science">Physics: Biological Science</option>
                    <option value="Physics: Business And Technology">Physics: Business And Technology</option>
                    <option value="Physics: Chemical Principles">Physics: Chemical Principles</option>
                    <option value="Physics: Computer Techniques">Physics: Computer Techniques</option>
                    <option value="Physics: Physical Theory And Experimental Technique">Physics: Physical Theory And Experimental Technique</option>
                    <option value="Political Science">Political Science</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Religious Studies">Religious Studies</option>
                    <option value="Retailing">Retailing</option>
                    <option value="Romance Languages: French And Italian">Romance Languages: French And Italian</option>
                    <option value="Romance Languages: French And Spanish">Romance Languages: French And Spanish</option>
                    <option value="Romance Languages: Italian And Spanish">Romance Languages: Italian And Spanish</option>
                    <option value="Russian And East European Studies">Russian And East European Studies</option>
                    <option value="Science, Technology, And Society: Biotechnology And Biomedicine">Science, Technology, And Society: Biotechnology And Biomedicine</option>
                    <option value="Science, Technology, And Society: Energy And Environment">Science, Technology, And Society: Energy And Environment</option>
                    <option value="Science, Technology, And Society: Global Science And Technology">Science, Technology, And Society: Global Science And Technology</option>
                    <option value="Science, Technology, And Society: Information And Organizations">Science, Technology, And Society: Information And Organizations</option>
                    <option value="Science, Technology, And Society: Science/Nature/Culture">Science, Technology, And Society: Science/Nature/Culture</option>
                    <option value="Social Impact And Responsibility">Social Impact And Responsibility</option>
                    <option value="Sociology: Applied Research And Data Analysis">Sociology: Applied Research And Data Analysis</option>
                    <option value="Sociology: Cities, Markets, And The Global Economy">Sociology: Cities, Markets, And The Global Economy</option>
                    <option value="Sociology: Culture And Diversity">Sociology: Culture And Diversity</option>
                    <option value="Sociology: Family, Gender, And Society">Sociology: Family, Gender, And Society</option>
                    <option value="Sociology: Law And Society">Sociology: Law And Society</option>
                    <option value="Sociology: Medical Sociology">Sociology: Medical Sociology</option>
                    <option value="Sociology: Population And Immigration">Sociology: Population And Immigration</option>
                    <option value="Sociology: Structure Of Opportunity And Inequality">Sociology: Structure Of Opportunity And Inequality</option>
                    <option value="South Asia Studies">South Asia Studies</option>
                    <option value="Statistics">Statistics</option>
                    <option value="Systems Science And Engineering">Systems Science And Engineering</option>
                    <option value="Theatre Arts">Theatre Arts</option>
                    <option value="Urban Studies">Urban Studies</option>
                    <option value="Visual Studies">Visual Studies</option>
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
