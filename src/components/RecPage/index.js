import React, { useEffect, useState } from "react";
//import { getAllCourses } from "../backend/coursesApi";
import { Grid, Slider, Container } from  '@mui/material';

import { requiredCourses, collegeMajors, collegeRequirements, chooseOne, chooseTwo, chooseThree, chooseFour, chooseFive, chooseSix,
        chooseSeven, chooseEight, chooseNine, chooseTen, courseCodes, getIndexOfMajor } from '../RequiredCourses';

import Course from "../Course";

import "./index.css";

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
    const [reqMajCourses, setReqMajCourses] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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

    const getRequiredCourses = (() => {
        let reqCourses = requiredCourses.at(getIndexOfMajor(majorNew.toUpperCase(), requiredCourses)).at(1);
        let takenCourses = [];
        //setTest(reqCourses);

        const checkboxesContainer = document.getElementById("myCheckboxes");

        for (let i = 0; i < reqCourses.length; i++) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = reqCourses[i];
            checkbox.name = reqCourses[i];
            const label = document.createElement("label");
            label.setAttribute("for", "checkbox" + i);
            label.innerHTML = reqCourses[i];
            checkboxesContainer.appendChild(checkbox);
            checkboxesContainer.appendChild(label);
            checkboxesContainer.appendChild(document.createElement("br"));

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    takenCourses.push(reqCourses[i]);
                }
            });

        } 

    });

    const submitTakenCourses = (() => {

        let reqCourses = requiredCourses.at(getIndexOfMajor(majorNew.toUpperCase(), requiredCourses)).at(1);
        let takenCourses = [];

        for (let i = 0; i < reqCourses.length; i++) {
            const checkbox = document.getElementById(reqCourses[i]);

            if (checkbox.checked) {
                takenCourses.push(reqCourses[i]);
            }

        }

        setCoursesTaken(takenCourses);
        setSuccessMessage("Success!");

    });

    const getCourseRecommendation = () => {

        const select = document.getElementById("TopicsOfInterest");
        const selectedTopics = [];

        for (let i = 0; i < select.options.length; i++) {

            if (select.options[i].selected) {
                selectedTopics.push(courseCodes[select.options[i].value]);
            }

        }

        setCount(1);
        let courseArr = coursesTaken;
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

        //setTest(reqCourses.length);

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

            allCoursesDict[courseId] = courseData[element];

            if (!allCoursesList.includes(courseId)) {
                allCoursesList.push(courseId);
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
            
            /*
            
            */


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

        for (let i = 0; i < reqCourses.length; i++) {

            if (!Object.keys(allCoursesDict).includes(reqCourses[i]) && !courseArr.includes(reqCourses[i])) {
    
                let reqCourseJSON = {"id": reqCourses.at(i), "title": "N/A", "description": "No description available", "semester": "N/A", "num_sections": 0, "course_quality": null, instructor_quality: null, "difficulty": null, "work_required": null, "recommendation_score": null};
                recs[counter++] = reqCourseJSON;
                coursesChosen.push(reqCourses.at(i));

            }

        }
        
        function addToRecList(courseArray, numToChoose) {

            if (courseArray !== null) {
                for (let i = 1; i < courseArray.length; i++) {
    
                    let clust = courseArray.at(i);
                    let num_courses_chosen = 0;
    
                    if (clust.at(0).length > 4 && clust.at(0) !== "ELECTIVE") {
                        for (let j = 0; j < clust.length; j++) {
        
                            if (Object.keys(allCoursesDict).includes(clust.at(j))) {
                                //setTest(allCoursesDict[clust.at(j)]["difficulty"]);
                                let diff = allCoursesDict[clust.at(j)]["difficulty"];
                                let workReq = allCoursesDict[clust.at(j)]["work_required"];
                                let insQual = allCoursesDict[clust.at(j)]["instructor_quality"];
        
                                if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                                    insQual >= insQuality[0] && insQual <= insQuality[1] && !courseArr.includes(clust.at(j)) && !coursesChosen.includes(clust.at(j))) {
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
        
                            while (coursesChosen.includes(randCourse)  || courseArr.includes(randCourse)) {
                                randIndex = getRandomInt(clust.length);
                                randCourse = clust.at(randIndex);
                            }
        
                            coursesChosen.push(randCourse);
        
                            let randCourseJSON = {"id": randCourse, "title": "N/A", "description": "No description available", "semester": "N/A", "num_sections": 0, "course_quality": null, instructor_quality: null, "difficulty": null, "work_required": null, "recommendation_score": null};
                            recs[counter++] = randCourseJSON;
                        }

                    } else if (clust.at(0) !== "ELECTIVE") {

                        for (let j = 0; j < allCoursesList.length; j++) {

                            if (Object.keys(allCoursesDict).includes(allCoursesList.at(j)) && clust.includes(allCoursesList[j].replace('0','').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', ''))) {

                                let diff = allCoursesDict[allCoursesList.at(j)]["difficulty"];
                                let workReq = allCoursesDict[allCoursesList.at(j)]["work_required"];
                                let insQual = allCoursesDict[allCoursesList.at(j)]["instructor_quality"];

                                if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                                    insQual >= insQuality[0] && insQual <= insQuality[1] && !courseArr.includes(allCoursesList.at(j)) && !coursesChosen.includes(allCoursesList.at(j))
                                    && selectedTopics.includes(allCoursesList[j].replace('0','').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', ''))) {
                                        courses=courses+1;
                                        coursesChosen.push(allCoursesList.at(j));
                                        num_courses_chosen=num_courses_chosen+1;
                                        overallDifficulty = overallDifficulty + diff;
                                        overallWork = overallWork + workReq;
                                        overallInsQual = overallInsQual + insQual;
                                        recs[counter++] = allCoursesDict[allCoursesList.at(j)];
                                        if (num_courses_chosen == numToChoose) { break; }
                                }

                            }

                        }

                        for (let j = 0; j < allCoursesList.length; j++) {

                            if (Object.keys(allCoursesDict).includes(allCoursesList.at(j)) && clust.includes(allCoursesList[j].replace('0','').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', ''))) {

                                let diff = allCoursesDict[allCoursesList.at(j)]["difficulty"];
                                let workReq = allCoursesDict[allCoursesList.at(j)]["work_required"];
                                let insQual = allCoursesDict[allCoursesList.at(j)]["instructor_quality"];

                                if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                                    insQual >= insQuality[0] && insQual <= insQuality[1] && !courseArr.includes(allCoursesList.at(j)) && !coursesChosen.includes(allCoursesList.at(j))) {
                                        courses=courses+1;
                                        coursesChosen.push(allCoursesList.at(j));
                                        num_courses_chosen=num_courses_chosen+1;
                                        overallDifficulty = overallDifficulty + diff;
                                        overallWork = overallWork + workReq;
                                        overallInsQual = overallInsQual + insQual;
                                        recs[counter++] = allCoursesDict[allCoursesList.at(j)];
                                        if (num_courses_chosen == numToChoose) { break; }
                                }

                            }

                        }

                    } else {

                        for (let j = 0; j < allCoursesList.length; j++) {

                            if (Object.keys(allCoursesDict).includes(allCoursesList.at(j))) {

                                let diff = allCoursesDict[allCoursesList.at(j)]["difficulty"];
                                let workReq = allCoursesDict[allCoursesList.at(j)]["work_required"];
                                let insQual = allCoursesDict[allCoursesList.at(j)]["instructor_quality"];

                                if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                                    insQual >= insQuality[0] && insQual <= insQuality[1] && !courseArr.includes(allCoursesList.at(j)) && !coursesChosen.includes(allCoursesList.at(j))
                                    && selectedTopics.includes(allCoursesList[j].replace('0','').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', ''))) {
                                        courses=courses+1;
                                        coursesChosen.push(allCoursesList.at(j));
                                        num_courses_chosen=num_courses_chosen+1;
                                        overallDifficulty = overallDifficulty + diff;
                                        overallWork = overallWork + workReq;
                                        overallInsQual = overallInsQual + insQual;
                                        recs[counter++] = allCoursesDict[allCoursesList.at(j)];
                                        if (num_courses_chosen == numToChoose) { break; }
                                }

                            }

                        }
                        /*
                        for (let j = 0; j < allCoursesList.length; j++) {

                            if (Object.keys(allCoursesDict).includes(allCoursesList.at(j))) {

                                let diff = allCoursesDict[allCoursesList.at(j)]["difficulty"];
                                let workReq = allCoursesDict[allCoursesList.at(j)]["work_required"];
                                let insQual = allCoursesDict[allCoursesList.at(j)]["instructor_quality"];

                                if (diff >= difficulty[0] && diff <= difficulty[1] && workReq >= workRequired[0] && workReq <= workRequired[1] &&
                                    insQual >= insQuality[0] && insQual <= insQuality[1] && !courseArr.includes(allCoursesList.at(j)) && !coursesChosen.includes(allCoursesList.at(j))) {
                                        courses=courses+1;
                                        coursesChosen.push(allCoursesList.at(j));
                                        num_courses_chosen=num_courses_chosen+1;
                                        overallDifficulty = overallDifficulty + diff;
                                        overallWork = overallWork + workReq;
                                        overallInsQual = overallInsQual + insQual;
                                        recs[counter++] = allCoursesDict[allCoursesList.at(j)];
                                        if (num_courses_chosen == numToChoose) { break; }
                                }

                            }

                        }
                        */

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
        for (const el in reqMajCourses) {
            const corsId = reqMajCourses[el]["id"];
            reqMajCourses[el]["id"] = corsId.replace("-", "");
        }
        for (const element in courseData) {
            const courseId = courseData[element]["id"];
            courseData[element]["id"] = courseId.replace("-", "");
        }
    }, [courseData, reqMajCourses]);

    return (
        <div>
            <p style={{"marginLeft": 10, "marginTop": 100}}>Welcome to PennCourseRec! To start, please input your major and any preferences below. Then click 'Get Required Courses' to see the courses that are required for your major. For your convenience, you can
                check the box of any course you have taken already. Be sure to click 'Submit Courses Taken', then click the 'Get Course Recommnedation' button to see the courses still required to complete your major. Before starting a new search,
                be sure to click the 'Refresh' button.</p>
            <p>{test}</p>
            <div style={{"display": "flex"}}>
                <div style={{"background-color": "#dbeaff", "width": 100, "margin": 10, "flex": 1}}>
                    <p style={{"marginLeft": 10}}>Major</p>
                    <select style={{"marginLeft": 20}} value={majorNew} onChange={(event) => {
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
                    <div>
                    <div style={{"marginLeft": 30}}>
                        <Grid container spacing={6}>
                            <Grid item xs={4}>
                                <p style={{"marginLeft": -18}}>Course Difficulty</p>
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
                                <p style={{"marginLeft": -18}}>Work Required</p>
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
                                <p style={{"marginLeft": -18}}>Instructor Quality</p>
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
                    </div>
                    <p style={{"marginLeft": 10}}>Topics of Interest (ctrl + click to select multiple)</p>
                    <select id="TopicsOfInterest" style={{"marginLeft": 20}} multiple>
                        <option value="Accounting">Accounting</option>
                        <option value="Africana Studies">Africana Studies</option>
                        <option value="Ancient History">Ancient History</option>
                        <option value="Anthropology">Anthropology</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Art History">Art History</option>
                        <option value="Asian American Studies">Asian American Studies</option>
                        <option value="Astronomy">Astronomy</option>
                        <option value="Biochemistry">Biochemistry</option>
                        <option value="Bioengineering">Bioengineering</option>
                        <option value="Biology">Biology</option>
                        <option value="Business Economics & Public Policy">Business Economics & Public Policy</option>
                        <option value="Chemical & Biomolecular Engineering">Chemical & Biomolecular Engineering</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Cinema and Media Studies">Cinema and Media Studies</option>
                        <option value="Classical Studies">Classical Studies</option>
                        <option value="Cognitive Science">Cognitive Science</option>
                        <option value="Communications">Communications</option>
                        <option value="Comparative Literature">Comparative Literature</option>
                        <option value="Criminology">Criminology</option>
                        <option value="Design">Design</option>
                        <option value="Earth and Environmental Science">Earth and Environmental Science</option>
                        <option value="East Asian Language & Civilization">East Asian Language & Civilization</option>
                        <option value="Economics">Economics</option>
                        <option value="Education">Education</option>
                        <option value="Electrical & Systems Engineering">Electrical & Systems Engineering</option>
                        <option value="Engineering & Applied Science">Engineering & Applied Science</option>
                        <option value="Engineering Mathematics">Engineering Mathematics</option>
                        <option value="English">English</option>
                        <option value="Environmental Studies">Environmental Studies</option>
                        <option value="Finance">Finance</option>
                        <option value="Fine Arts">Fine Arts</option>
                        <option value="French">French</option>
                        <option value="Gender, Sexuality, & Women's Studies">Gender, Sexuality, & Women's Studies</option>
                        <option value="German">German</option>
                        <option value="Health & Societies">Health & Societies</option>
                        <option value="Healthcare Management">Healthcare Management</option>
                        <option value="History">History</option>
                        <option value="International Relations">International Relations</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Jewish Studies">Jewish Studies</option>
                        <option value="Korean">Korean</option>
                        <option value="Latin">Latin</option>
                        <option value="Legal Studies & Business Ethics">Legal Studies & Business Ethics</option>
                        <option value="Linguistics">Linguistics</option>
                        <option value="Logic, Information, and Computation">Logic, Information, and Computation</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Materials Science and Engineering">Materials Science and Engineering</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Music">Music</option>
                        <option value="Networked and Social Systems Engineering">Networked and Social Systems Engineering</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Operations, Information, and Decisions">Operations, Information, and Decisions</option>
                        <option value="Philosopy">Philosophy</option>
                        <option value="Philosophy, Politics, and Economics">Philosophy, Politics, and Economics</option>
                        <option value="Physics">Physics</option>
                        <option value="Political Science">Political Science</option>
                        <option value="Psychology">Psychology</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Religious Studies">Religious Studies</option>
                        <option value="Russian">Russian</option>
                        <option value="Russian and East European Studies">Russian and East European Studies</option>
                        <option value="Science, Technology & Society">Science, Technology & Society</option>
                        <option value="Sociology">Sociology</option>
                        <option value="South Asia Studies">South Asia Studies</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Statistics">Statistics</option>
                        <option value="Theatre Arts">Theatre Arts</option>
                        <option value="Urban Studies">Urban Studies</option>
                        <option value="Visual Studies">Visual Studies</option>
                    </select>
                    <p></p>
                    <button style={{"margin": 20}} onClick={getRequiredCourses}>Get Required Courses</button>
                    </div>
                </div>
                <div style={{"background-color": "#dbeaff", "height": 520, "width": 100, "margin": 10, "flex": 1}}>
                    <p style={{"marginLeft": 10}}>Required Courses</p>
                    <div id="myCheckboxes" style={{"flex": 1, "marginLeft": 10, "height": 300, "overflow-y": "scroll"}}></div>
                    <div style={{"flex": 1}}>
                        <button style={{"marginLeft": 10, "marginTop": 25, "display": "inline-block"}} onClick={submitTakenCourses}>Submit Courses Taken</button>
                        <p style={{"color": "green", "marginLeft": 20, "display": "inline-block"}}>{successMessage}</p>
                    </div>
                </div>

            </div>

            <button onClick={getCourseRecommendation}>Get Course Recommendation</button>
            <button onClick={refreshPage}>
                    Reload
            </button>
                {count == 1 &&
                courseData.map((info) => {
                    return (<Course info={info} />);
                })
                }

        </div>
    );

}

export default RecPage;
