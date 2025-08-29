//os 2 pontos apos uma funçao no ts se refere ao tipo que aquela função ira retornar
interface TaskAttributes {
  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high"
  createdAt: Date;
  updatedAt: Date;
}

export class Task {
  private static tasks: Task[] = [];
  private static sequence: number = 1;

  id: number;
  title: string;
  description: string;
  status: "todo" | "doing" | "done";
  priority: "low" | "medium" | "high"
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: TaskAttributes) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description
    this.status = attributes.status;
    this.priority = attributes.priority;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static findAll(): Task[] {
    return [...this.tasks];// Retorna uma cópia do array de tarefas.
  }

  static findById(id: number): Task | null {
    return this.tasks.find((task) => task.id === id) ?? null; // Retorna a tarefa com o ID fornecido ou null se não encontrar.
  }

  static create(attributes: Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">): Task {
  //Usamos Omit<TaskAttributes, "id" | "createdAt" | "updatedAt"> para dizer que o parâmetro attributes deve conter todos os atributos da classe TaskAttributes, exceto id, createdAt e updatedAt, porque esses campos serão definidos automaticamente dentro da função.
    const { title, description, status, priority } = attributes;

    const newTask = new Task({
      id: this.sequence++,
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    this.tasks.push(newTask);
    return newTask;
  }

  static update(
    id: number,
    attributes: Partial<Omit<TaskAttributes, "id" | "createdAt" | "updatedAt">>
  ): Task | null {
    const { title, description, status, priority } = attributes;

    const task = this.findById(id);

    if (!task) return null

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    task.updatedAt = new Date();

    return task;
  }

  static delete(id: number): Task | null {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;
    return this.tasks.splice(index, 1)[0];
  }
}
