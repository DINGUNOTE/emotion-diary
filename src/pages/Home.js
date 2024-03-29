import { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import DiaryList from '../components/DiaryList';

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = '감정 일기장';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      // 해당 년도, 해당 월의 1일
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1,
      ).getTime();

      // 해당 년도, 해당 월의 마지막 날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59,
      ).getTime();
      setData(
        diaryList.filter(it => firstDay <= it.date && it.date <= lastDay),
      );
    }
  }, [diaryList, curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        curDate.getDate(),
      ),
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(
        curDate.getFullYear(),
        curDate.getMonth() - 1,
        curDate.getDate(),
      ),
    );
  };

  return (
    <div>
      <AppHeader
        headText={headText}
        leftElement={<AppButton text={'<'} onClick={decreaseMonth} />}
        rightElement={<AppButton text={'>'} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
