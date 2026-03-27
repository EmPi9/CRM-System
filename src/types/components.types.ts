export type FetchDataProp = () => Promise<void>;

export type Variant = 'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link';

export type VariantInput = 'outlined' | 'borderless' | 'filled' | 'underlined';

export type PresetColors = 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';

export type Color = 'default' | 'primary' | 'danger' | PresetColors;

export type FilterProps = 'all' | 'inWork' | 'completed';

export type Size = 'large' | 'medium' | 'small';

export type Type = 'primary' | 'dashed' | 'link' | 'text' | 'default';


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


