import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

interface Operation {
    id: number;
    status: 'processing' | 'completed' | 'approved' | 'pending' | 'failed';
}

ChartJS.register(ArcElement, Tooltip, Legend);

export function OperationChart() {
    const [dataOperation, setDataOperation] = useState<Map<number, Operation>>(new Map())
    
    useEffect(() => {
        const eventSource = new EventSource('/mock/sse')

        eventSource.addEventListener('operation-status', (event) => {
          const data = JSON.parse(event.data) as Operation;
          setDataOperation(prev => {
            const mapData = new Map(prev)
            mapData.set(data.id, data)
            return mapData;
          });
          
          console.log(data);
        })

        
        return () => eventSource.close();
    }, [])

    const operations = [...dataOperation.values()];

    const doughnutData = {
        labels: ['Processing', 'Completed', 'Approved', 'Pending', 'Failed'],
        datasets: [
            {
                data: [
                    operations.filter(i => i.status === 'processing').length,
                    operations.filter(i => i.status === 'completed').length,
                    operations.filter(i => i.status === 'approved').length,
                    operations.filter(i => i.status === 'pending').length,
                    operations.filter(i => i.status === 'failed').length,
                ],
                backgroundColor: [
                    '#FFA500', 
                    '#00FF00', 
                    '#0000FF',
                    '#808080', 
                    '#FF0000', 
                ],
            }
        ]
    }

    return (    
            <div>
                <Doughnut data={doughnutData} options={{  responsive: true  }} />
            </div>
        )

}