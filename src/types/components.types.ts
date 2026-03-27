export type FetchDataProp = () => Promise<void>;

export type FilterProps = 'all' | 'inWork' | 'completed';
export interface Todo { 
  id: number;
  title: string;
  isDone: boolean;
  created: string;
}

export interface TodoInfo { 
  all: number;
  completed: number;
  inWork: number;
}

export type MetaResponse<T, N> = {
	data: T[]
	info: N
	meta: {
		totalAmount: number
	}
};


