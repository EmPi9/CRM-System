export type FetchDataProp = () => Promise<void>;

export type Color = 'primary' | 'secondary' | 'danger';

export type FilterProps = 'all' | 'inWork' | 'completed';

export type Size = 'large' | 'small';

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

export type Todos<T, N> = {
	data: T[]
	info: N
	meta: {
		totalAmount: number
	}
};


