import React, { useEffect, useState } from 'react'

 function JsonDataDisplay({ courseData, onCourseChange }){
    const [data, setData] = useState({});

    useEffect(() => {
        console.log(data);
        setData(courseData);
    }, [courseData]);

    const DisplayData=data.map(
        (info)=>{
            return(
                <tr>
                    <td>{info.id}</td>
                    <td>{info.title}</td>
                    <td>{info.description}</td>
                </tr>
            )
        }
    )
 
    return(
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th>Course ID</th>
                    <th>Course Name</th>
                    <th>Course Description</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
             
        </div>
    )
 }
 
 export default JsonDataDisplay;