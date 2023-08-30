export interface ITaskParams {
  title?: string;
  description?: string;
  plannedDate?: string;
  done?: boolean;
  urgent?: boolean;
}

export interface ITask extends ITaskParams {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}
