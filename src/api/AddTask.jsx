
    export default function AddTask (taskTitle) {
        fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({
            title: taskTitle,
            isDone: false,
          }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }