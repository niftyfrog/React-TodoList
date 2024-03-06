import { useState } from "react";

const Create = () => {
  const [todoName, setTodoName] = useState<string>("");
  const [author, setAuthor] = useState<string>("樋尾");
  const [date, setDate] = useState<string>("");
  const [filterTodoList, setFilterTodoList] = useState<
    { todoName: string; author: string; date: string }[]
  >([]);
  const [radio, setRadio] = useState("all");
  const [todos, setTodos] = useState<{ todoName: string; author: string; date: string }[]>([]);

  //クリエイトハンドル
  const createHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = { todoName, author, date };
    setTodos([...todos, newTodo]);
    setTodoName("");
  };

  //削除ハンドル
  const deleteHandle = (index: number) => {
    const deletetodolist = [...todos];
    deletetodolist.splice(index, 1);
    setTodos(deletetodolist);
  };

  //チェック済み全て削除
  const deleteAllCheckTodo = () => {
    const listtable = document.getElementById("todolist-table");
    console.log(listtable);
  };

  //ビューフィルター
  const viewFilter = (event: any) => {
    const value = event.target.value;
    setRadio(value);
    setFilterTodoList((prevFilterTodoList) => {
      if (value === "all") {
        return [...todos];
      } else {
        return todos.filter((todo) => todo.author === value);
      }
    });
  };

  return (
    <div className="create">
      <form onSubmit={createHandle}>
        <label>Todo名</label>
        <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
        <label>担当者</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="樋尾">樋尾</option>
          <option value="米森">米森</option>
          <option value="進">進</option>
        </select>
        <label>期限</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit">作成</button>
      </form>
      <div>
        <div className="todolist">
          <div className="filter">
            <label>
              <input type="radio" value="all" onChange={viewFilter} checked={radio === "all"} />
              全て
            </label>
            <label>
              <input type="radio" value="樋尾" onChange={viewFilter} checked={radio === "樋尾"} />
              樋尾
            </label>
            <label>
              <input type="radio" value="米森" onChange={viewFilter} checked={radio === "米森"} />
              米森
            </label>
            <label>
              <input type="radio" value="進" onChange={viewFilter} checked={radio === "進"} />進
            </label>
          </div>
          <table id="todolist-table">
            <thead>
              <tr>
                <th>番号</th>
                <th>チェック</th>
                <th>todo名</th>
                <th>担当者</th>
                <th>期限</th>
              </tr>
            </thead>
            {radio === "all" ? (
              <tbody>
                {todos.map((todo, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{todo.todoName}</td>
                    <td>{todo.author}</td>
                    <td>{todo.date}</td>
                    <td>
                      <button onClick={() => deleteHandle(index)}>削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                {filterTodoList.map((todo, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{todo.todoName}</td>
                    <td>{todo.author}</td>
                    <td>{todo.date}</td>
                    <td>
                      <button onClick={() => deleteHandle(index)}>削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Create;
