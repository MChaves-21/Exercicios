import { Handler, Request, Response } from "express";
import { Task } from "../models/task";
import { HttpError } from "../errors/httpError";
import { z } from "zod";

// req.body { title, description, status, priority }
const StoreRequestSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "doing", "done"]),
  priority: z.enum(["low", "medium", "high"])
});

const UpdateRequestSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["todo", "doing", "done"]).optional(),
  priority: z.enum(["low", "medium", "high"]).optional()
});


export class TaskController {
  // GET /api/tasks
  index: Handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await Task.findAll(); // Espera pela resposta de findAll()
      res.json(tasks); // Retorna os dados em formato JSON
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar as tarefas" });
    }
  };

  // POST /api/tasks
  store = (req: Request, res: Response) => {
    const parsedBody = StoreRequestSchema.parse(req.body);
    const newTask = Task.create(parsedBody);
    res.status(201).json(newTask);
  }

  // GET /api/tasks/:id
  show: Handler = (req, res) => {
    const { id } = req.params;
    const task = Task.findById(+id);
    if (!task) throw new HttpError(404, "task not found");
    res.json(task);
  }

  // PUT /api/tasks/:id
  update: Handler = (req, res) => {
    const { id } = req.params;
    const parsedBody = UpdateRequestSchema.parse(req.body);
    const updatedTask = Task.update(+id, parsedBody);
    if (!updatedTask) throw new HttpError(404, "task not found");
    res.json(updatedTask);
  }

  // DELETE /api/tasks/:id
  delete: Handler = (req, res) => {
    const { id } = req.params;
    const deletedTask = Task.delete(+id);
    if (!deletedTask) throw new HttpError(404, "task not found");
    res.json(deletedTask);
  }
}