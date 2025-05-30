import Todo from "../model/todo.model.js";

const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user:req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in creating", error });
  }
};
const getTodos = async (req, res)=>{
  try {
    const todos = await Todo.find({user:req.user._id});
    res.status(201).json({ message: "Todo fetched successfully", todos });
  } catch (error) {
     console.log(error);
    res.status(400).json({ message: "error in fetching", error });
  }
}

const updateTodo = async (req, res)=>{
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
    })
    res.status(201).json({ message: "Todo updated successfully", todo });

  } catch (error) {
         console.log(error);
    res.status(400).json({ message: "error in updating", error });
  }
}

const deleteTodo = async (req,res)=>{
  try {
 const todo = await Todo.findByIdAndDelete(req.params.id)
 if(!todo){
  res.status(404).json({message:"Todo not found"})
 }
    res.status(201).json({ message: "Todo deleted successfully"});

  } catch (error) {
      console.log(error);
    res.status(400).json({ message: "error in deleting", error });
  }
}
export {createTodo, getTodos, updateTodo, deleteTodo}