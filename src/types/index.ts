export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface PropsListItem {
  item: Task;
  handleToggle: (item: Task) => void;
  handleEditTemporaryTask: (item: Task) => void;
  handleDeleteTask: (id: number) => void;
}
