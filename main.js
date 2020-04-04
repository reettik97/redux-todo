let input = document.querySelector("#input_todo");
let ul = document.querySelector("ul");

const initialState = (localStorage.todos) ? [...JSON.parse(localStorage.todos)] : [];

function reducer(state = initialState , action) {
	switch (action.type) {
		case "addTodo": {
			const newTodo = {
				id: Date.now(),
				text: action.text,
				isDone: false
			};
			return [...state, newTodo];
		}
		case "deleteTodo": {
			return [...state.filter(todo => !(todo.id == action.id))];
		}
		case "todoDone": {
			return state.map(todo =>
				todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
			);
		}
	}
}

function display() {
  console.log("display");

	ul.innerHTML = "";
	
  const todos = (store.getState())? store.getState() : localStorage.getItem("todos") ?  JSON.parse(localStorage.getItem("todos")) : [];

	console.log(todos);

  localStorage.setItem("todos" ,JSON.stringify(todos));
	
	todos.forEach(todo => {
		let li = document.createElement("li");
		let p = document.createElement("p");
		let spanX = document.createElement("span");
		let checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		checkInput.checked = todo.isDone;
	
		spanX.className = "remove_items";
		spanX.innerHTML = "&#x2716;";

		spanX.addEventListener("click", () => {
			store.dispatch({
				type: "deleteTodo",
				id: todo.id
			});
		});

		checkInput.addEventListener("click", () => {
		
			store.dispatch({
				type: "todoDone",
				id: todo.id,
				isDone: todo.isDone
			});
		});
		p.innerHTML = todo.text;
		li.append(checkInput, p, spanX);
		ul.append(li);
	});
	
}

let store = Redux.createStore(reducer ) ;
store.subscribe(display);

display();

input.addEventListener("keyup", event => {
	if (event.keyCode === 13 && event.target.value.trim() !== "") {
		const text = event.target.value;
		store.dispatch({
			type: "addTodo",
			text
		});
		event.target.value = "";
	}
});

