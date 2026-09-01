import React, { useEffect, useState } from 'react'
import { viewStudentAPI, deleteStudentAPI, addStudentAPI } from '../service/apiService'

function Home() {

    const [student, setStudent] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        course: "",
        email: ""
    })

    const getStudents = async () => {
        try {
            const response = await viewStudentAPI()
            console.log(response.data)
            setStudent(response.data)
        } catch (error) {
            console.log(error)
            alert("Error fetching students")
        }
    }

    useEffect(() => {
        getStudents()
    }, [])

    const addStudent = async (e) => {
        e.preventDefault()
        if (formData.name == "" || formData.age == "" || formData.course == "" || formData.email == "") {
            alert("Please fill all fields")
        }
        else {
            try {
                console.log(formData)
                const newStudent = {
                    name: formData.name,
                    age: formData.age,
                    course: formData.course,
                    email: formData.email
                }
                await addStudentAPI(newStudent)
                alert("Student added successfully!")
                setFormData({
                    name: "",
                    age: "",
                    course: "",
                    email: ""
                })
                getStudents()

            } catch (error) {
                console.log(error)
                alert("Error adding student")
            }
        }
    }
    const deleteStudent = async (id) => {
        window.confirm("Are you sure you want to delete this student?")
        try {
            await deleteStudentAPI(id)
            alert("Student deleted successfully!")
            getStudents()

        } catch (error) {
            console.log(error)
            alert("Error deleting student")
        }
    }
    const handleChange = (e) => {
        console(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="container py-5">
            <div className="mb-5">
                <h2 className="mb-0 fs-4 text-center">Add New Student</h2>
                <div className="container p-4">
                    <form onSubmit={addStudent}>
                        <div className="row g-2">
                            <div className="col-md-6">
                                <input type="text" name="name" placeholder="Enter Name"
                                    value={formData.name} autoComplete="off"
                                    onChange={handleChange} className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <input type="number" name="age" placeholder="Enter Age"
                                    value={formData.age} autoComplete="off"
                                    onChange={handleChange} className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <input type="text" name="course" placeholder="Enter Course"
                                    value={formData.course} autoComplete="off"
                                    onChange={handleChange} className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <input type="email" name="email" placeholder="Enter Email"
                                    value={formData.email} autoComplete="off"
                                    onChange={handleChange} className="form-control"
                                />
                            </div>

                            <div className="col-12 text-center mt-4">
                                <button type="submit" className="btn btn-primary px-4">
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container">
                <div className="text-success">
                    <h2 className="text-center">Student List</h2>
                </div>
                <div className="conatiner">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student?.length > 0 ? (
                                    student?.map((student) => (
                                        <tr key={student?.id}>
                                            <td>{student?.id}</td>
                                            <td>{student?.name}</td>
                                            <td>{student?.age}</td>
                                            <td>{student?.course}</td>
                                            <td>{student?.email}</td>
                                            <td>
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={() => deleteStudent(student?.id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                    <tr>
                                        <td className="text-center p-4">
                                            No students found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home