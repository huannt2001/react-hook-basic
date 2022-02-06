
const Todo = (props) => {
    // const todos = props.todos;
    const { todos, title, deleteDataTodo } = props;

    const handleDelete = (id) => {
        console.log('>>> check id delete: ', id)
        deleteDataTodo(id);
    }
    return (
        <div className="todo-container">
            <div className="todo-title">
                {title}
            </div>
            {todos.map((todo, index) => {
                return (
                    <ul key={todo.id}>
                        <li className="todo-child" >
                            {todo.title} &nbsp; &nbsp;
                            <span onClick={() => handleDelete(todo.id)}>x</span>
                        </li>
                    </ul>
                )
            })}
            <hr />
        </div>

    )
}

export default Todo;