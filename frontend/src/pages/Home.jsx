import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Fetch todos on page load
  const fetchTodos = async () => {
    try {
      const res = await fetch(`https://todo-full-stack-app-api.vercel.app/todo`, {
        method: "GET",
        headers: {
          token: token,
        },
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  useEffect(() => {
    if (token) fetchTodos();
  }, [token]);

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();
    if (!task) return;

    try {
      const res = await fetch(`https://todo-full-stack-app-api.vercel.app/todo/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ description: task }),
      });

      const data = await res.json();
      setTask("");
      fetchTodos();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  };

  // Toggle task complete
  const toggleTodo = async (id) => {
    try {
      await fetch(`https://todo-full-stack-app-api.vercel.app/todo/${id}`, {
        method: "PUT",
        headers: {
          token: token,
        },
      });
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete task
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://todo-full-stack-app-api.vercel.app/todo/${id}`, {
        method: "DELETE",
        headers: {
          token: token,
        },
      });
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
    
        {token && <span id="username">👤 {name}</span>}
        {token ? (
          <button className="logout-btn" id= "logout" onClick={logout}>Logout</button>
        ) : (
          <button id="signuphome" onClick={() => navigate("/signup")}>Signup</button>
        )}
     

      {/* Main Section */}
      <div id="todo">
        {token ? (
          <>   <div id="h1">Todo App</div>
                <hr id="underline"/>
        
            {/* Input */}
            <div  >
              <form onSubmit={addTask} id="inputdiv">
                <input
                 id="inputspace"
                  type="text"
                  placeholder="Add task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <button id="addbtn" type="submit">Add</button>
              </form>
            </div>
             <div id="work">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <div id="newtodo"  key={todo._id} className={todo.isDone ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => toggleTodo(todo._id)}
                  />
                  <span>{todo.description}</span>
                  <button className="delete" onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h3>No Todos Yet</h3>
                <p>Start by adding a task above.</p>
              </div>
            )}
             </div>
          
          </>
        ) : (
          <><div id="homecom" class="landing-page">
  <div class="container">
    <main class="hero">
      <div class="hero-content">
        <h1>Master Your Productivity</h1>
        <p class="subtitle">The beautiful, intuitive todo app that helps you focus on what matters</p>
        
        <div class="cta-group">
          <button  onClick={() => navigate("/signup")} class="cta-primary">
            <span class="icon">🚀</span>
            GET STARTED - IT'S FREE
          </button>
          <button class="cta-secondary">
            <span class="icon">ℹ️</span>
            LEARN MORE
          </button>
        </div>
      </div>
      
      <div class="hero-image">
        <div class="app-mockup">
          {/* <!-- This would be your app screenshot or illustration --> */}
          <div class="mockup-content">
            <div class="task completed">✓ Buy groceries</div>
            <div class="task">● Finish project</div>
            <div class="task">● Call mom</div>
          </div>
        </div>
      </div>
    </main>
    
  
    
    <div class="final-cta">
      <h2>Ready to transform your productivity?</h2>
      <button onClick={() => navigate("/signup")} class="cta-primary large">
        <span class="icon">✏️</span>
        SIGN UP NOW
      </button>
    </div>
  </div>
</div>
           
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
