import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useMutation } from '@apollo/client';
import { ADD_TASK_MUTATION } from '../client/src/graphql/mutations'; // Adjust the path if needed

const Todo = () => {
    // State setup
    const [userInput, setUserInput] = useState("");
    const [list, setList] = useState([]);

    // Apollo useMutation hook
    const [addTask, { loading, error }] = useMutation(ADD_TASK_MUTATION);

    // Handle user input update
    const updateInput = (value) => {
        setUserInput(value);
    };

    // Add a new item
    const addItem = async () => {
        if (userInput.trim() !== "") {
            const taskData = {
                id: Math.random().toString(36).substr(2, 9),
                description: userInput,
                email: localStorage.getItem('userEmail'),
            };

            console.log("Prepared task data:", taskData);
            localStorage.setItem('taskId', taskData.id);
            console.log("Task ID stored in localStorage:", taskData.id);

            try {
                console.log("Attempting to send data to server:", JSON.stringify(taskData));
                const response = await fetch("http://localhost:4000/Task", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(taskData),
                });

                console.log("Server response status:", response.status);

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('Id', data.task.id);
                    console.log("Task ID saved in local storage:", data.task.id);

                    setList([...list, taskData]);
                    setUserInput("");

                    alert("Task added successfully!");

                    // Task addition in Apollo server
                    await addTask({
                        variables: {
                            id: taskData.id,
                            description: taskData.description,
                            email: taskData.email,
                        },
                    });
                    console.log("Task added successfully to Apollo server");
                } else {
                    console.error("Failed to add task. Server responded with:", response.statusText);
                    const errorData = await response.json();
                    console.error("Server error details:", errorData);
                }
            } catch (error) {
                console.error("Error sending request to server:", error.message);
            }
        } else {
            console.warn("No user input provided. Task not added.");
        }
    };

    // Delete an item
    const deleteItem = async (index) => {
        const taskId = localStorage.getItem('Id');
        try {
            const response = await fetch(`http://localhost:4000/Todo/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log("Task deleted successfully.");
                const updatedList = list.filter(item => item.id !== taskId);
                setList(updatedList);
            } else {
                console.error("Failed to delete task on the server.");
            }
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Edit an item
    const editItem = async (index) => {
        const editedTodo = prompt('Edit the todo:', list[index].description);
        const taskId = localStorage.getItem('Id');
        console.log("task id from local storage:", taskId);

        if (editedTodo !== null && editedTodo.trim() !== '') {
            const updatedTodos = [...list];
            updatedTodos[index].description = editedTodo;
            setList(updatedTodos);

            const updatedData = {
                description: editedTodo
            };

            try {
                const response = await fetch(`http://localhost:4000/Todo/${taskId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedData)
                });

                if (response.ok) {
                    console.log("Task updated successfully on the server.");
                } else {
                    console.error("Failed to update task on the server.");
                }
            } catch (error) {
                console.error("Error updating task on the server:", error);
            }
        }
    };

    return (
        <Container>
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "3rem",
                    fontWeight: "bolder",
                }}
            >
                TODO LIST
            </Row>

            <hr />
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <div>
                        {/* Add task input and button */}
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => updateInput(e.target.value)}
                            placeholder="Add a task..."
                        />
                        <button onClick={addItem}>
                            {loading ? 'Adding...' : 'Add Task'}
                        </button>
                        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

                        {/* Task list display */}
                        <ul>
                            {list.map((task, index) => (
                                <li key={index}>{task.description}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <ListGroup>
                        {list.map((item, index) => (
                            <div key={index}>
                                <ListGroup.Item
                                    variant="dark"
                                    action
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    {item.description}
                                    <span>
                                        <Button
                                            style={{ marginRight: "10px" }}
                                            variant="light"
                                            onClick={() => deleteItem(index)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="light"
                                            onClick={() => editItem(index)}
                                        >
                                            Edit
                                        </Button>
                                    </span>
                                </ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Todo;
