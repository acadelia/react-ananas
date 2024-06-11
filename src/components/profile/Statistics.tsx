import React, { useEffect, useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import PostService from '../../services/post-data';
import { useParams } from 'react-router-dom';

const Tableau10 = [
  '#ff8ec6',
  '#cc8eff',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
];

const chartsParams = {
  margin: { bottom: 50, left: 50, right: 50, top: 50 },
  height: 300,
};

const monthLabels = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

interface DatasetItem {
  x: number;
  y: number;
}

const generateDataset = (response: { monthlyLikes: Record<string, number>; totalLikesFromFriends: number; totalLikesFromOthers: number; }): { friendsLikes: DatasetItem[], othersLikes: DatasetItem[] } => {
  const { monthlyLikes, totalLikesFromFriends, totalLikesFromOthers } = response;

  const friendsLikes = monthLabels.map((label, index) => {
    const key = `${label} 2024`;
    return {
      x: index,
      y: monthlyLikes[key] ? totalLikesFromFriends : 0,
    };
  });

  const othersLikes = monthLabels.map((label, index) => {
    const key = `${label} 2024`;
    return {
      x: index,
      y: monthlyLikes[key] ? totalLikesFromOthers : 0,
    };
  });

  return { friendsLikes, othersLikes };
};

export default function Statistics() {
  const { id } = useParams<{ id: string }>();
  const [friendsLikesDataset, setFriendsLikesDataset] = useState<DatasetItem[]>([]);
  const [othersLikesDataset, setOthersLikesDataset] = useState<DatasetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostService.getPostsStatistic(id!);
        const { friendsLikes, othersLikes } = generateDataset(response.data);
        setFriendsLikesDataset(friendsLikes);
        setOthersLikesDataset(othersLikes);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const xAxisData = monthLabels.map((label, index) => index);

  return (
    <Stack direction="column" spacing={2} alignItems="center" sx={{ width: '80%' }}>
      <LineChart
        {...chartsParams}
        xAxis={[
          {
            scaleType: 'linear',
            data: xAxisData,
            valueFormatter: (month) => monthLabels[month] ? `${monthLabels[month].slice(0, 3)} \n2024` : '',
          },
        ]}
        series={[
          {
            data: friendsLikesDataset.map(item => item.y),
            label: 'Likes from Friends',
            color: Tableau10[0],
          },
          {
            data: othersLikesDataset.map(item => item.y),
            label: 'Likes from Others',
            color: Tableau10[1],
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
      />
    </Stack>
  );
}
